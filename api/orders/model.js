const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'products'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    userName: {
      type: String,
      required: [true, 'Vui lòng cung cấp tên']
    },
    email: {
      type: String,
      required: [true, 'Vui lòng cung cấp email'],
      unique: false
    },
    phone: {
      type: String,
      required: [true, 'Vui lòng cung cấp số điện thoại'],
      match: [
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
      ]
    },
    totalPrice: {
      type: Number,
      required: true
    },
    isCancel: {
      type: Boolean,
      default: false
    },
    checking: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Orders', ordersSchema)
