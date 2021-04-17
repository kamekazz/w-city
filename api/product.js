const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');
const { default: uploadPic } = require('../utils/uploadPicToCloudinary');

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
    // This is the information I need back from the website.
    // 1 The image URL of the palette
    // Use this function to upload the image to Cloudinary and then get back the URL uploadPic()
    // 2 n packages
    // 3 n layers
    // 4 Surface usage
    // 5 Volume usage
    // 6 Total weight
    // Please save all the information on a random object.
    let webInfo = {}; //<=
    // After you get me the information, I'll save it in my database at my liking.
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
