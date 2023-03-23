const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router()
const auth = require('../../middleware/auth')
const Order = require('./model')
const Product = require('../products/model')

router.route('/').post(async (req, res, next) => {
  // @route:  POST /api/orders
  // @desc:   Tạo đơn hàng mới
  const { productId, quantityProduct, userName, email, phone, totalPrice, userId, city, district, address, status } = req.body
  const product = await Product.findOne({ _id: Mongoose.Types.ObjectId(productId) }).lean()
  if (!product) {
    return res.status(400).json({ msg: 'Không tìm thấy sản phầm' })
  }
  const ordered = await Order.find({ productId: Mongoose.Types.ObjectId(productId), isCancel: false }).lean()

  const available = product.amount - ordered.length
  if (available === 0) {
    return res.status(400).json({ msg: 'Sản phẩm hết hàng', available })
  }
  try {
    const order = new Order({
      productId,
      quantityProduct,
      userId,
      userName,
      email,
      phone,
      city,
      district,
      address,
      totalPrice,
      status,
      isCancel: false
    })
    await order.save()
    res.status(200).json({
      msg: 'Đặt hàng thành công',
      userId,
      order
    })
  } catch (e) {
    res.status(500).json({ msg: 'Lỗi hệ thống', e })
  }
}).put(auth, async (req, res) => {
// @route:  PUT /api/orders
// @desc:   Cập nhật đơn hàng
  const { orderId } = req.body
  const order = await Order.findByIdAndUpdate(Mongoose.Types.ObjectId(orderId), { checking: true }).lean()
  if (!order) {
    return res.status(404).json({ msg: 'Không tìm thấy đơn hàng' })
  }
  try {
    if (order.checking) {
      return res.status(200).json({ msg: 'Đã cập nhật hóa đơn' })
    }
  } catch (e) {
    return res.status(500).json({ msg: 'Lỗi hệ thống' })
  }
})
router.route('/check').post(async (req, res, next) => {
  // @route:  POST /api/orders/check
  // @desc:   Kiểm tra tình trạng đơn hàng
  const { productId } = req.body
  const product = await Product.findOne({
    _id: Mongoose.Types.ObjectId(productId)
  }).lean()
  const ordered = await Order.find({
    productId: Mongoose.Types.ObjectId(productId),
    isCancel: false
  }).lean()
  const available = product.amount - ordered.length
  if (available === 0) {
    return res.status(400).json({ msg: 'Sản phầm hết hàng', available })
  }
  return res
    .status(200)
    .json({ msg: 'Bạn có muốn tiến hành đặt hàng không?', available })
})

router.get('/', async (req, res) => {
  const order = await Order.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'products'
      }
    },
    {
      $project: {
        room: 1,
        quantityProduct: 1,
        userName: 1,
        email: 1,
        phone: 1,
        city: 1,
        district: 1,
        address: 1,
        totalPrice: 1,
        status: 1,
        createdAt: 1,
        products: { name: 1 }
      }
    }
  ])
  if (order.length > 0) {
    return res.status(200).json({ msg: 'Danh sách đơn hàng', order })
  }
})

router.route('/all-of-user').get(auth, async (req, res, next) => {
  // @route:  GET /api/orders/all-of-user
  // @desc:   Lấy thông tin các đơn đã đặt của người dùng
  const { userId } = req.body
  const order = await Order.aggregate([
    {
      $match: { userId: Mongoose.Types.ObjectId(userId) }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product'
      }
    },
    {
      $project: {
        room: 1,
        user: {
          profilePicUrl: 1,
          name: 1,
          phone: 1
        },
        checking: 1,
        createdAt: 1,
        totalPrice: 1
      }
    }
  ])
  if (order.length > 0) {
    return res
      .status(200)
      .json({ msg: 'Danh sách đơn hàng thành công', order })
  }
  return res.status(200).json({ msg: 'Chưa có đơn hàng nào được tạo' })
})

router.route('/:id').get(auth, async (req, res, next) => {
  // @route:  GET /api/orders/:id
  // @desc:   Lấy thông tin đơn hàng cụ thể
  const { id } = req.params
  const order = await Order.aggregate([
    {
      $match: { _id: Mongoose.Types.ObjectId(id) }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product'
      }
    },
    {
      $project: {
        room: 1,
        user: {
          profilePicUrl: 1,
          name: 1,
          phone: 1
        },
        checking: 1,
        createdAt: 1,
        totalPrice: 1
      }
    }
  ])
  if (order.length > 0) {
    return res.status(200).json({ msg: 'Thông tin đơn hàng', order })
  }
  return res.status(404).json({ msg: 'Không tìm thấy đơn hàng' })
})

module.exports = router
