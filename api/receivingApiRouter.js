const express = require('express');
const router = express.Router();
const ContainerModel = require('../models/ContainerModel');

//localhost:3000/api/container
// add new container
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
    res.status(200).json({ message: 'Saved', product });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
