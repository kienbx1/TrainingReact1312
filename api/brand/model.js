const mongoose = require('mongoose')

const brandsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nhập brand']
    },
    slug: {
      type: String,
      required: [true, 'Nhập slug']
    }
  }
)

module.exports = mongoose.model('Brands', brandsSchema)
