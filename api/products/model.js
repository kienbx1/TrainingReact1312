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
    brand: {
      type: String,
      required: [true, 'Nhập tên thương hiệu']
    },
    priceInput: {
      type: String,
      required: [true, 'Nhập giá sản phẩm nhập vào']
    },

    priceSell: {
      type: String,
      required: [true, 'Nhập giá sản phẩm bán ra']
    },
    discount: {
      type: Number,
      required: [true, 'Nhập phần trăm giảm giá']
    },
    quantity: {
      type: Number,
      required: [true, 'Nhập số lượng sản phẩm']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Products', productsSchema)
