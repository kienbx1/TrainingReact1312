const mongoose = require('mongoose')


const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nhập tên sản phẩm']
    },
    avatar: {
      type: String
    },
    date: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Nhập nội dung']
    },
    price: {
      type: String,
      required: [true, 'Nhập giá tour']
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Products', toursSchema)
