const express = require('express')
const router = express.Router()

const Tours = require('./model')

// @route:  GET /api/tours/
// @desc:   Lấy ra tất cả tours trong hệ thống
router.get('/', async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 10)
    const skip = Number(req?.query?.skip || 0) * limit
    const tours = await Tours.find()
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
    const count = await Tours.count()
    res.status(200).json({ tours, count })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  POST /api/Tours/
// @desc:   Thêm mới tours
router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ msg: 'Vui lòng nhập đầy đủ thông tin' })
    }
    const newtours = new Tours(req.body)
    newtours.save(function (error) {
      if (error) {
        const errors = []
        Object.keys(error?.errors).forEach(function (key) {
          errors.push(error?.errors[key].message)
        })
        return res.status(400).json({ errors })
      } else {
        res.status(201).json({ tours: newtours, msg: 'thêm mới thành công' })
      }
    })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/Tours/:id
// @desc:   Lấy thông tin chi tiết của tours
router.get('/:id', async (req, res) => {
  try {
    const tours = await Tours.findById(req.params.id)
    if (!tours) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    res.status(200).json({ tours })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  put /api/Tours/:id
// @desc:   Cập nhật thông tin tours
router.put('/:id', async (req, res) => {
  try {
    const tours = await Tours.findById(req.params.id)
    if (!tours) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    const updateTours = await Tours.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(201).json({ tours: updateTours, msg: 'cập nhật thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  DELETE /api/tours/:id
// @desc:   Xóa tours
router.delete('/:id', async (req, res) => {
  try {
    const tours = await Tours.findById(req.params.id)
    if (!tours) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    await Tours.findByIdAndDelete(req.params.id)

    res.status(201).json({ msg: 'xóa Tour thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
