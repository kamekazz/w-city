const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');
const { default: uploadPic } = require('../utils/uploadPicToCloudinary');

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
    if (existingProduct) {
      return res
        .status(401)
        .json({ message: `Don't Product already registered` });
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
    let webInfo = {};
    // After you get me the information, I'll save it in my database at my liking.
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;