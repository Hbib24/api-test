const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
  type: { type: String, required: true, enum: ['file', 'folder'] },
  parentID: { type: Schema.Types.ObjectId, ref: 'File', required: true },
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  size: { type: Number },
  url: { type: String },
});

module.exports = mongoose.model('File', fileSchema);
