const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');
const scraper = require('./scraper.js');

//localhost:3000/api/product
// get  Product info
router.get('/:ibm', async (req, res) => {
  const { ibm } = req.params;

  try {
    const product = await ProductModel.findOne({ ibm });

    if (product) return res.status(200).json({ message: 'old', product });

    return res.status(200).json({ message: 'new' });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});
//localhost:3000/api/product
// add new Product
router.post('/', async (req, res) => {
  const { ibm } = req.body;
  try {
    const existingProduct = await ProductModel.findOne({ ibm });
    if (existingProduct) {
      return res
        .status(401)
        .json({ message: `Don't Product already registered` });
    }
    const product = new ProductModel({
      activeCount: 0,
      ...req.body,
      status: 'loading',
    });
    await product.save();
    res.status(200).send('save');
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});
//localhost:3000/api/product/get_pallet_config
// Make sure is in inches not millimeters and pallet to 40X48  on onpallet.com.
router.post('/get_pallet_config', async (req, res) => {
  const { ibm, msLength, msWidth, msHeight, loadingHeight } = req.body;
  try {
    palletLayOut = await scraper('sren.png', msWidth, msLength, msHeight, 51);
    console.log(`palletLayOut`, palletLayOut);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

router.post('/add_pallet_load', async (req, res) => {
  const { ibm, totalCount, alias } = req.body;
  try {
    const existingProduct = await ProductModel.findOne({ ibm });
    if (!existingProduct) {
      return res
        .status(200)
        .json({ message: `Don't Product exist registered` });
    }
    existingProduct.totalCount = totalCount;
    existingProduct.alias = alias;
    await existingProduct.save();
    res.status(200).send('loaded');
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

router.post('/update_product', async (req, res) => {
  const { ibm } = req.body;
  try {
    updatedProduct = await ProductModel.updateOne({ ibm }, { ...req.body });
    res.status(200).json({ message: 'Update Product', updatedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
