const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContainerSchema = new Schema(
  {
    containerId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max: 11,
    },
    door: { type: String, trim: true, max: 11 },
    forkliftDriver: { type: String, trim: true },
    uwa: { type: String, trim: true },
    isTransfer: { type: String, trim: true, default: 'no' },
    transfer: { type: String, trim: true },
    transferColor: [
      {
        location: { type: String },
        color: { type: String },
      },
    ],
    status: { type: String, trim: true, default: 'draft' },
    size: { type: String, trim: true, default: '24' },
    completion: { type: Number, default: 0 },
    items: [{ type: String, trim: true }],
    itemsQtyShip: [
      {
        ibm: { type: String },
        qtyS: { type: Number },
        qtyR: { type: Number },
        transfer: { type: String, trim: true, default: 'cranberry' },
        status: { type: String, trim: true, default: 'added' },
        itemId: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Container', ContainerSchema);
