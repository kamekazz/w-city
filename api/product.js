const express = require('express');
const router = express.Router();
const ProductModel = require('../models/UserModel');

router.get('/:product', async (req, res) => {
  const { ibm } = req.params;

  try {
    const product = await UserModel.findOne({ ibm });

    if (product) return res.status(401).send('product already taken');

    return res.status(200).send('Available');
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

router.post('/', async (req, res) => {
  const { ibm, alias } = req.body;
  const lowerCaseAlias = alias.toLowerCase();

  try {
    const existingProduct = await UserModel.findOne({ ibm });
    if (existingProduct) {
      return res.status(401).json({ message: 'Product already registered' });
    }
    const product = new ProductModel({
      ...req.body,
      alias: lowerCaseAlias,
      activeCount: 0,
      status: 'loading',
    });
    await product.save();
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
