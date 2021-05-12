const express = require('express');
const router = express.Router();
const ContainerModel = require('../models/ContainerModel');

//localhost:3000/api/receiving_container
// get all container
router.get('/', async (req, res) => {
  try {
    const existingContainerAllOpen = await ContainerModel.find({
      status: 'open',
    });
    const existingContainerAllDraft = await ContainerModel.find({
      status: 'draft',
    });
    if (existingContainerAllOpen || existingContainerAllDraft) {
    } else {
      return res.status(201).json({ message: `No Container  registered` });
    }
    res.status(200).json({
      message: 'List of Container',
      containers: [...existingContainerAllDraft, ...existingContainerAllOpen],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

//localhost:3000/api/receiving_container
// add new container
router.post('/', async (req, res) => {
  const { containerId } = req.body;
  try {
    const existingContainer = await ContainerModel.findOne({ containerId });
    if (existingContainer) {
      if (
        existingContainer.status === 'draft' ||
        existingContainer.status === 'open'
      ) {
        return res
          .status(201)
          .json({ message: `Container already registered` });
      }
    }
    const container = new ContainerModel({
      ...req.body,
    });
    await container.save();
    res.status(200).json({ message: 'Saved', container });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

//localhost:3000/api/receiving_container/:containerId
// get one container
router.get('/:containerId', async (req, res) => {
  try {
    const existingContainer = await ContainerModel.findOne({
      containerId: req.params.containerId,
    });
    if (!existingContainer) {
      return res.status(201).json({ message: `Container Does Not Exist` });
    }
    res.status(200).json({
      message: 'Container',
      container: existingContainer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});
//localhost:3000/api/receiving_container/ship_product_on_container
// get one container
router.post('/ship_product_on_container', async (req, res) => {
  let productIbm = req.body.ibm;
  try {
    const existingContainer = await ContainerModel.findOne({
      containerId: req.body.containerId,
    });
    console.log(`existingContainer`, existingContainer);
    if (!existingContainer) {
      return res.status(201).json({ message: `Container Does Not Exist` });
    }
    existingContainer.items.push(productIbm);
    existingContainer.itemsQtyShip.push({
      ibm: productIbm,
      qtyS: req.body.qtyS,
      transfer: req.body.transfer || 'cranberry',
      itemId: existingContainer.itemsQtyShip.length + 1,
    });
    const saveContainer = await existingContainer.save();
    res.status(200).json({
      message: 'added product to container',
      container: existingContainer,
      saveContainer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
