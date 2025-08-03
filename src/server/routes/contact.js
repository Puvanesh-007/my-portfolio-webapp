// api/contact.js (or routes/contact.js)
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const validator = require('validator');

const router = express.Router();

// Rate limiting for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions, please try again later.'
  }
});

// Contact Message Schema
const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [5, 'Subject must be at least 5 characters long'],
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread'
  },
  isSpam: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
contactMessageSchema.index({ timestamp: -1 });
contactMessageSchema.index({ status: 1 });
contactMessageSchema.index({ email: 1 });

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

// Basic spam detection
const isSpamMessage = (data) => {
  const spamKeywords = [
    'viagra', 'cialis', 'casino', 'lottery', 'winner', 'congratulations',
    'click here', 'free money', 'make money fast', 'work from home'
  ];
  
  const content = `${data.name} ${data.subject} ${data.message}`.toLowerCase();
  
  // Check for spam keywords
  const hasSpamKeywords = spamKeywords.some(keyword => content.includes(keyword));
  
  // Check for excessive links
  const linkCount = (content.match(/http/g) || []).length;
  
  // Check for repeated characters
  const hasRepeatedChars = /(.)\1{10,}/.test(content);
  
  return hasSpamKeywords || linkCount > 3 || hasRepeatedChars;
};

// Sanitize input data
const sanitizeInput = (data) => {
  return {
    name: validator.escape(data.name?.trim() || ''),
    email: validator.normalizeEmail(data.email?.trim() || ''),
    subject: validator.escape(data.subject?.trim() || ''),
    message: validator.escape(data.message?.trim() || '')
  };
};

// POST /api/contact - Submit contact form
router.post('/', contactLimiter, async (req, res) => {
  try {
    // Sanitize input data
    const sanitizedData = sanitizeInput(req.body);
    
    // Validate required fields
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.subject || !sanitizedData.message) {
      return res.status(400).json({
        error: 'All fields are required',
        details: {
          name: !sanitizedData.name ? 'Name is required' : null,
          email: !sanitizedData.email ? 'Email is required' : null,
          subject: !sanitizedData.subject ? 'Subject is required' : null,
          message: !sanitizedData.message ? 'Message is required' : null
        }
      });
    }

    // Additional validation
    if (!validator.isEmail(sanitizedData.email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address'
      });
    }

    if (sanitizedData.name.length < 2 || sanitizedData.name.length > 100) {
      return res.status(400).json({
        error: 'Name must be between 2 and 100 characters'
      });
    }

    if (sanitizedData.subject.length < 5 || sanitizedData.subject.length > 200) {
      return res.status(400).json({
        error: 'Subject must be between 5 and 200 characters'
      });
    }

    if (sanitizedData.message.length < 10 || sanitizedData.message.length > 2000) {
      return res.status(400).json({
        error: 'Message must be between 10 and 2000 characters'
      });
    }

    // Check for spam
    const isSpam = isSpamMessage(sanitizedData);

    // Create contact message
    const contactMessage = new ContactMessage({
      ...sanitizedData,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown',
      isSpam
    });

    await contactMessage.save();

    // Log the submission (you might want to integrate with your logging system)
    console.log(`New contact form submission from ${sanitizedData.email}${isSpam ? ' (flagged as spam)' : ''}`);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. Thank you for reaching out!'
    });

  } catch (error) {
    console.error('Error saving contact message:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors
      });
    }

    res.status(500).json({
      error: 'Internal server error. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contact messages (admin only)
router.get('/', async (req, res) => {
  try {
    // Add authentication middleware here to protect admin routes
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Access denied' });
    // }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const includeSpam = req.query.includeSpam === 'true';

    // Build query
    const query = {};
    if (status && ['unread', 'read', 'replied'].includes(status)) {
      query.status = status;
    }
    if (!includeSpam) {
      query.isSpam = false;
    }

    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      ContactMessage.find(query)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ContactMessage.countDocuments(query)
    ]);

    res.json({
      messages,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// PATCH /api/contact/:id - Update message status
router.patch('/:id', async (req, res) => {
  try {
    // Add authentication middleware here
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Access denied' });
    // }

    const { id } = req.params;
    const { status, isSpam } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    const updateData = {};
    if (status && ['unread', 'read', 'replied'].includes(status)) {
      updateData.status = status;
    }
    if (typeof isSpam === 'boolean') {
      updateData.isSpam = isSpam;
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({
      success: true,
      message: 'Message updated successfully',
      data: message
    });

  } catch (error) {
    console.error('Error updating contact message:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// DELETE /api/contact/:id - Delete a message
router.delete('/:id', async (req, res) => {
  try {
    // Add authentication middleware here
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Access denied' });
    // }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// GET /api/contact/stats - Get contact form statistics
router.get('/stats', async (req, res) => {
  try {
    // Add authentication middleware here
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Access denied' });
    // }

    const [total, unread, read, replied, spam, today] = await Promise.all([
      ContactMessage.countDocuments({ isSpam: false }),
      ContactMessage.countDocuments({ status: 'unread', isSpam: false }),
      ContactMessage.countDocuments({ status: 'read', isSpam: false }),
      ContactMessage.countDocuments({ status: 'replied', isSpam: false }),
      ContactMessage.countDocuments({ isSpam: true }),
      ContactMessage.countDocuments({
        timestamp: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0))
        },
        isSpam: false
      })
    ]);

    res.json({
      total,
      unread,
      read,
      replied,
      spam,
      today
    });

  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

module.exports = router;