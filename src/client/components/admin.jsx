import React, { useState, useEffect } from 'react';
import { 
  MdEmail, 
  MdDelete, 
  MdMarkEmailRead, 
  MdMarkEmailUnread, 
  MdReply,
  MdReport,
  MdPerson,
  MdSubject,
  MdMessage,
  MdAccessTime,
  MdBlock,
  MdWarning,
  MdRefresh
} from 'react-icons/md';
import { FiFilter, FiSearch } from 'react-icons/fi';

export const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({
    status: 'all',
    includeSpam: false,
    search: ''
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  // Get backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [filters, pagination.current]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.current,
        limit: 20,
        ...(filters.status !== 'all' && { status: filters.status }),
        includeSpam: filters.includeSpam
      });

      const response = await fetch(`${backendUrl}/api/contact?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        let filteredMessages = data.messages;
        
        // Client-side search filter
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredMessages = filteredMessages.filter(msg =>
            msg.name.toLowerCase().includes(searchTerm) ||
            msg.email.toLowerCase().includes(searchTerm) ||
            msg.subject.toLowerCase().includes(searchTerm) ||
            msg.message.toLowerCase().includes(searchTerm)
          );
        }

        setMessages(filteredMessages);
        setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch messages');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/contact/stats`);
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const updateMessageStatus = async (messageId, status) => {
    try {
      setActionLoading(prev => ({ ...prev, [messageId]: 'status' }));
      
      const response = await fetch(`${backendUrl}/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setMessages(prev => prev.map(msg => 
          msg._id === messageId ? { ...msg, status } : msg
        ));
        fetchStats();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update message');
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [messageId]: null }));
    }
  };

  const toggleSpamStatus = async (messageId, isSpam) => {
    try {
      setActionLoading(prev => ({ ...prev, [messageId]: 'spam' }));
      
      const response = await fetch(`${backendUrl}/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isSpam: !isSpam }),
      });

      if (response.ok) {
        setMessages(prev => prev.map(msg => 
          msg._id === messageId ? { ...msg, isSpam: !isSpam } : msg
        ));
        fetchStats();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update spam status');
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [messageId]: null }));
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      setActionLoading(prev => ({ ...prev, [messageId]: 'delete' }));
      
      const response = await fetch(`${backendUrl}/api/contact/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg._id !== messageId));
        fetchStats();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete message');
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [messageId]: null }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'text-red-600 bg-red-50';
      case 'read': return 'text-blue-600 bg-blue-50';
      case 'replied': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading && messages.length === 0) {
    return (
      <div className="messages-admin">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-admin">
      <div className="admin-header">
        <h1 className="admin-title">
          <MdEmail className="title-icon" />
          Contact Messages
        </h1>
        <button 
          onClick={() => {
            fetchMessages();
            fetchStats();
          }}
          className="refresh-button"
          disabled={loading}
        >
          <MdRefresh className={loading ? 'spinning' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total || 0}</div>
          <div className="stat-label">Total Messages</div>
        </div>
        <div className="stat-card unread">
          <div className="stat-value">{stats.unread || 0}</div>
          <div className="stat-label">Unread</div>
        </div>
        <div className="stat-card read">
          <div className="stat-value">{stats.read || 0}</div>
          <div className="stat-label">Read</div>
        </div>
        <div className="stat-card replied">
          <div className="stat-value">{stats.replied || 0}</div>
          <div className="stat-label">Replied</div>
        </div>
        <div className="stat-card today">
          <div className="stat-value">{stats.today || 0}</div>
          <div className="stat-label">Today</div>
        </div>
        <div className="stat-card spam">
          <div className="stat-value">{stats.spam || 0}</div>
          <div className="stat-label">Spam</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <FiFilter className="filter-icon" />
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.includeSpam}
              onChange={(e) => setFilters(prev => ({ ...prev, includeSpam: e.target.checked }))}
            />
            Include Spam
          </label>
        </div>

        <div className="search-group">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search messages..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="search-input"
          />
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      {/* Messages List */}
      <div className="messages-list">
        {messages.length === 0 ? (
          <div className="empty-state">
            <MdEmail className="empty-icon" />
            <h3>No messages found</h3>
            <p>No messages match your current filters.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message._id} 
              className={`message-card ${message.isSpam ? 'spam' : ''} ${message.status}`}
            >
              <div className="message-header">
                <div className="message-info">
                  <div className="sender-info">
                    <MdPerson className="info-icon" />
                    <span className="sender-name">{message.name}</span>
                    <span className="sender-email">({message.email})</span>
                  </div>
                  <div className="message-meta">
                    <span className={`status-badge ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                    {message.isSpam && (
                      <span className="spam-badge">SPAM</span>
                    )}
                    <div className="timestamp">
                      <MdAccessTime className="time-icon" />
                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                </div>
                
                <div className="message-actions">
                  {message.status === 'unread' ? (
                    <button
                      onClick={() => updateMessageStatus(message._id, 'read')}
                      disabled={actionLoading[message._id] === 'status'}
                      className="action-button read"
                      title="Mark as read"
                    >
                      <MdMarkEmailRead />
                    </button>
                  ) : (
                    <button
                      onClick={() => updateMessageStatus(message._id, 'unread')}
                      disabled={actionLoading[message._id] === 'status'}
                      className="action-button unread"
                      title="Mark as unread"
                    >
                      <MdMarkEmailUnread />
                    </button>
                  )}
                  
                  <button
                    onClick={() => updateMessageStatus(message._id, 'replied')}
                    disabled={actionLoading[message._id] === 'status'}
                    className="action-button reply"
                    title="Mark as replied"
                  >
                    <MdReply />
                  </button>
                  
                  <button
                    onClick={() => toggleSpamStatus(message._id, message.isSpam)}
                    disabled={actionLoading[message._id] === 'spam'}
                    className={`action-button ${message.isSpam ? 'unspam' : 'spam'}`}
                    title={message.isSpam ? 'Mark as not spam' : 'Mark as spam'}
                  >
                    <MdReport />
                  </button>
                  
                  <button
                    onClick={() => deleteMessage(message._id)}
                    disabled={actionLoading[message._id] === 'delete'}
                    className="action-button delete"
                    title="Delete message"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>

              <div className="message-content">
                <div className="subject">
                  <MdSubject className="content-icon" />
                  <strong>{message.subject}</strong>
                </div>
                <div className="message-text">
                  <MdMessage className="content-icon" />
                  <p>{message.message}</p>
                </div>
              </div>

              {selectedMessage === message._id && (
                <div className="message-details">
                  <div className="detail-row">
                    <strong>IP Address:</strong> {message.ip}
                  </div>
                  <div className="detail-row">
                    <strong>User Agent:</strong> {message.userAgent}
                  </div>
                  <div className="detail-row">
                    <strong>Created:</strong> {formatDate(message.createdAt || message.timestamp)}
                  </div>
                  {message.updatedAt && message.updatedAt !== message.createdAt && (
                    <div className="detail-row">
                      <strong>Updated:</strong> {formatDate(message.updatedAt)}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setSelectedMessage(
                  selectedMessage === message._id ? null : message._id
                )}
                className="toggle-details"
              >
                {selectedMessage === message._id ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
            disabled={!pagination.hasPrev || loading}
            className="pagination-button"
          >
            Previous
          </button>
          
          <span className="pagination-info">
            Page {pagination.current} of {pagination.pages} ({pagination.total} total)
          </span>
          
          <button
            onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
            disabled={!pagination.hasNext || loading}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};