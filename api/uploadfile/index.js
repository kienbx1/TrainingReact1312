const express = require('express')
const router = express.Router()

const uploadFile = require('../../middleware/imageUpload')

// @route:  POST /api/upload/
// @desc:   Thêm mới upload
router.post('/', uploadFile.array('images', 10), async (req, res) => {
  try {
    const images = []
    if (req.files && req.files.length) {
      req.files.map((item) => {
        if (item.path) {
          images.push(item.path)
        }
        return item
      })
    }
    if (!images?.length) {
      res.status(400).json({ msg: 'Vui lòng nhập đầy đủ thông tin' })
    }
    return res.status(201).json({ images, msg: 'Upload thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
