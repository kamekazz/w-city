const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },

    password: { type: String, required: true, select: false },

    profilePicUrl: { type: String },

    role: { type: String, default: 'user', enum: ['user', 'root'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
