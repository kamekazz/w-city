const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    ibm: { type: String, required: true, unique: true, trim: true, max: 6 },
    alias: { type: String, trim: true },
    activeCount: { type: Number },
    totalCount: { type: Number },

    status: { type: String, trim: true },

    msUOM: { type: Number },
    plUOM: { type: Number },
    p1UOM: { type: Number },

    palletStatus: { type: String, trim: true, default: 'pl' },
    plTi: { type: Number },
    plHi: { type: Number },
    plMaxHeight: { type: Number, default: 51 }, //add to ui
    p1Ti: { type: Number },
    p1Hi: { type: Number },
    p1MaxHeight: { type: Number, default: 45 }, //add to ui

    msLength: { type: Number },
    msWidth: { type: Number },
    msHeight: { type: Number },
    palletImagesPl: [{ type: String, trim: true }],
    palletImagesP1: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
