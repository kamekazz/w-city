const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');

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
    const existingProduct = await ProductModel.findOne({ ibm });
    if (!existingProduct) {
      return res
        .status(401)
        .json({ message: `Don't exist Product already registered` });
    }
    const product = new ProductModel({
      activeCount: 0,
      ...req.body,
      alias: lowerCaseAlias,
      status: 'loading',
    });
    await product.save();
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});
//localhost:3000/api/product/get_pallet_config
http: router.post('/get_pallet_config', async (req, res) => {
  const { ibm, msLength, msWidth, msHeight, loadingHeight } = req.body;

  try {
    const existingProduct = await UserModel.findOne({ ibm });
    if (existingProduct) {
      return res.status(401).json({ message: 'Product already registered' });
    }
    const product = new ProductModel({
      activeCount: 0,
      ...req.body,
      alias: lowerCaseAlias,
      status: 'loading',
    });
    await product.save();
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
