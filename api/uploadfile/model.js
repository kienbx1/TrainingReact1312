const mongoose = require('mongoose')

const UploadSchema = new mongoose.Schema(
  {
    images: {
      type: Array,
      required: [true, 'Nhập hình ảnh']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Upload', UploadSchema)
