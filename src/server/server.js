require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from Vite build directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Asset Schema
const AssetSchema = new mongoose.Schema({
  assetType: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

const Asset = mongoose.model('Asset', AssetSchema);

// Get all assets
app.get('/api/assets', async (req, res) => {
  try {
    const assets = await Asset.find({});
    const assetsMap = {};

    assets.forEach(asset => {
      assetsMap[asset.assetType] = asset.data;
    });

    res.json({
      success: true,
      data: assetsMap
    });
  } catch (error) {
    console.error('Error fetching all assets:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get a specific asset by type
app.get('/api/assets/:assetType', async (req, res) => {
  try {
    const { assetType } = req.params;
    const asset = await Asset.findOne({ assetType });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: `Asset type '${assetType}' not found`
      });
    }

    res.json({
      success: true,
      data: asset.data
    });
  } catch (error) {
    console.error('Error fetching asset:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Serve frontend for all other routes (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api/assets`);
  });
};

startServer();
