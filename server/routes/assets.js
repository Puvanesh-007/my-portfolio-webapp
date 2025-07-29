const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// Get all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get asset by type
router.get('/:type', async (req, res) => {
  try {
    const asset = await Asset.findOne({ assetType: req.params.type });
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update asset
router.post('/', async (req, res) => {
  const { assetType, data } = req.body;
  
  try {
    let asset = await Asset.findOne({ assetType });
    
    if (asset) {
      // Update existing asset
      asset.data = data;
      await asset.save();
      res.json(asset);
    } else {
      // Create new asset
      asset = new Asset({ assetType, data });
      await asset.save();
      res.status(201).json(asset);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;