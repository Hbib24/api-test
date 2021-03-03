const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
    default: 'user',
  },
});

module.exports = mongoose.model('User', userSchema);
