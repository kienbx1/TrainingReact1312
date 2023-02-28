const express = require('express')
const router = express.Router()

const upload = require('../../middleware/imageUpload')
const auth = require('../../middleware/auth')
const Products = require('./model')

// @route:  GET /api/products/
// @desc:   Lấy ra tất cả products trong hệ thống
router.get('/', async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 10)
    const skip = Number(req?.query?.skip || 0) * limit
    const products = await Products.find().sort({ createdAt: 1 }).skip(skip).limit(limit)
    const count = await Products.count()
    res.status(200).json({ products, count })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  POST /api/products/
// @desc:   Thêm mới products
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    const dataProduct = {
      ...req.body
    }
    const images = []
    if (req.files && req.files.length) {
      req.files.map(item => {
        if (item.path) {
          images.push(item.path)
        }
        return item
      })
    }
    dataProduct.images = images
    if (!dataProduct) {
      res.status(400).json({ msg: 'Vui lòng nhập đầy đủ thông tin' })
    }
    const newProducts = new Products(dataProduct)
    newProducts.save(function (error) {
      if (error) {
        const errors = []
        Object.keys(error?.errors).forEach(function (key) {
          errors.push(error?.errors[key].message)
        })
        return res.status(400).json({ errors })
      } else {
        res.status(201).json({ products: newProducts, msg: 'thêm mới thành công' })
      }
    })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/products/:id
// @desc:   Lấy thông tin chi tiết của products
router.get('/:id', async (req, res) => {
  try {
    const products = await Products.findById(req.params.id)
    if (!products) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    res.status(200).json({ products })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  put /api/products/:id
// @desc:   Cập nhật thông tin products
router.put('/:id', async (req, res) => {
  try {
    const products = await Products.findById(req.params.id)
    if (!products) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    const updateProducts = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({ products: updateProducts, msg: 'cập nhật thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  DELETE /api/products/:id
// @desc:   Xóa products
router.delete('/:id', async (req, res) => {
  try {
    const products = await Products.findById(req.params.id)
    if (!products) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    await Products.findByIdAndDelete(req.params.id)

    res.status(201).json({ msg: 'xóa Tour thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
