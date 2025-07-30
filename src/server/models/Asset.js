const mongoose = require('mongoose');

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

module.exports = mongoose.model('Asset', AssetSchema);