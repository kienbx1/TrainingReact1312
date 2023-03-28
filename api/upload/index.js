const express = require('express')
const router = express.Router()

const upload = require('../../middleware/imageUpload')

// @route:  POST /api/products/
// @desc:   Thêm mới products
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    if (!images?.length) {
      res.status(400).json({ msg: 'Vui lòng nhập đầy đủ thông tin' })
    }
    const images = []
    if (req.files && req.files.length) {
      req.files.map((item) => {
        if (item.path) {
          images.push(item.path)
        }
        return item
      })
    }
    return res
      .status(201)
      .json({ images, msg: 'Upload thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})
