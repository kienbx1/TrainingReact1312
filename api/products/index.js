const express = require('express')
const router = express.Router()

const upload = require('../../middleware/imageUpload')
const Products = require('./model')

// @route:  GET /api/products/
// @desc:   Lấy ra tất cả products trong hệ thống
router.get('/', async (req, res) => {
  const products = await Products.aggregate([
    {
      $lookup: {
        from: 'brands',
        localField: 'brandId',
        foreignField: '_id',
        as: 'brand'
      }
    },
    {
      $project: {
        room: 1,
        images: 1,
        name: 1,
        priceInput: 1,
        price: 1,
        discount: 1,
        sizes: 1,
        quantity: 1,
        createdAt: 1,
        brand: { name: 1 }
      }
    }
  ])
  if (products.length > 0) {
    return res.status(200).json({ msg: 'Danh sách sản phẩm', products })
  }
})

router.get('/by-brand/:brandId', async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 100)
    const skip = Number(req?.query?.skip || 0) * limit
    const products = await Products.find({ brandId: req.params.brandId })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
    const count = await Products.find({ brandId: req.params.brandId }).count()

    res.status(200).json({ products, count })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  POST /api/products/
// @desc:   Thêm mới products
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const dataProduct = {
      ...req.body
    }
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
        res
          .status(201)
          .json({ products: newProducts, msg: 'Thêm mới thành công' })
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
      return res.status(404).json({ msg: 'Sản phẩm không tồn tại' })
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
      return res.status(404).json({ msg: 'Sản phẩm không tồn tại' })
    }
    const updateProducts = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res
      .status(201)
      .json({ products: updateProducts, msg: 'Cập nhật thành công' })
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
      return res.status(404).json({ msg: 'Sản phẩm không tồn tại' })
    }
    await Products.findByIdAndDelete(req.params.id)

    res.status(201).json({ msg: 'xóa sản phẩm thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
