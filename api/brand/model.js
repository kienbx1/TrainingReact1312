const mongoose = require('mongoose')

const brandsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nhập ten thuong hieu']
    },
    slug: {
      type: String,
      required: [true, 'Nhập slug']
    },
    // logo: {
    //   type: String,
    //   required: [true, 'Nhập logo']
    // },
    banner: {
      type: String,
      required: [true, 'Nhập banner']
    }
  }
)

module.exports = mongoose.model('Brands', brandsSchema)
