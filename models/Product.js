const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    ibm: { type: String, required: true, unique: true, trim: true, max: 6 },
    alias: { type: String, required: true, unique: true, trim: true },
    activeCount: { type: Number },
    totalCount: { type: Number },

    status: { type: String, trim: true },

    msUOM: { type: Number },
    plUOM: { type: Number },
    p1UOM: { type: Number },

    palletStatus: { type: String, trim: true },
    plTi: { type: Number },
    plHi: { type: Number },
    p1Ti: { type: Number },
    p1Hi: { type: Number },

    msLength: { type: Number },
    msWidth: { type: Number },
    msHeight: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
