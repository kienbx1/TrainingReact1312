const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nhập tên sản phẩm']
    },
    images: {
      type: Array,
      required: [true, 'Nhập hình ảnh']
    },
    date: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Nhập nội dung']
    },
    price: {
      type: Number,
      required: [true, 'Nhập giá tour']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Products', productsSchema)
