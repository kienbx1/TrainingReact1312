const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nhập tên sản phẩm']
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Brands'
    },
    price: {
      type: Number,
      required: [true, 'Nhập giá tour']
    },
    new: {
      type: Boolean,
      default: false
    },
    discount: {
      type: Number
    },
    image: {
      type: Array
    },
    sizes: {
      type: Array,
      required: [true, 'Nhập size sản phẩm']
    },
    countInStock: {
      type: Number,
      required: [true, 'Nhập số lượng sản phẩm trong kho']
    },
    date: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Nhập nội dung']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Products', productsSchema)
