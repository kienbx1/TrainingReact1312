const mongoose = require('mongoose')

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nhập tên tour']
    },
    avatar: {
      type: String,
      required: [true, 'Nhập hình ảnh tour']
    },
    date: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Nhập nội dung']
    },
    detail: {
      type: String,
      required: [true, 'Nhập trích dẫn']
    },
    price: {
      type: String,
      required: [true, 'Nhập giá tour']
    },
    information: {
      type: String,
      required: [true, 'Nhập thông tin tour']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Tours', toursSchema)
