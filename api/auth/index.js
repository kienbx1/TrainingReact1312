const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('./model')
const auth = require('../../middleware/auth')
const upload = require('../../middleware/imageUpload')

// @route:  POST /api/auth/signup
// @desc:   Register a new user
router.post('/signup', async (req, res) => {
  const { name, email, password, role, address, phoneNumber, districts, city } =
    req.body

  if (password.length < 6) {
    return res.status(400).json({ msg: 'Mật khẩu tối thiểu 6 ký tự' })
  }
  if (phoneNumber.length !== 10) {
    return res.status(401).json({ msg: 'Số điện thoại phải đủ 10 ký tự' })
  }

  try {
    // Check if user is already registered
    let user = await User.findOne({ email: email.toLowerCase() })
    if (user) {
      return res.status(400).json({ msg: 'Email đã tồn tại' })
    }

    user = new User({
      name,
      email: email.toLowerCase(),
      password,
      role,
      address,
      phoneNumber,
      districts,
      city
    })
    const error = user.validateSync()
    if (error) {
      return res.status(400).json(error.errors)
    }

    // Hash the password
    user.password = await bcrypt.hash(password, 10)
    await user.save()
    return res.status(200).json({ msg: 'Đăng ký thành công' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/auth/
// @desc:   GET all user
router.get('/', async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 10)
    const skip = Number(req?.query?.skip || 0) * limit
    const user = await User.find()
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
    const count = await User.count()
    res.status(200).json({ user, count })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  DELETE /api/auth/:id
// @desc:   Xóa User
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'User không tồn tại' })
    }
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({ msg: 'xóa User thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/auth/me
// @desc:   Get logged in user's info
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        msg: 'Không thể tìm thấy user này'
      })
    }
    res.status(200).json({ user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/auth/
// @desc:   GET all user
router.get('/', async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 10)
    const skip = Number(req?.query?.skip || 0) * limit
    const user = await User.find()
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
    const count = await User.count()
    res.status(200).json({ user, count })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  POST /api/auth
// @desc:   Login user
router.post('/', async (req, res) => {
  const { email, password } = req.body

  if (password && password.length < 6) {
    return res.status(400).json({ msg: 'Mật khẩu tối thiểu 6 ký tự' })
  }

  try {
    // Check if user is registered
    const user = await User.findOne({
      email: email && email.toLowerCase()
    }).select('+password')

    if (!user) {
      return res.status(400).json({ msg: 'Email không tồn tại' })
    }

    // Check if password is correct
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
      return res.status(400).json({ msg: 'Mật khẩu không đúng' })
    }

    // Sign JWT and return token
    jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err
      res.status(200).json({ token })
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  PUT /api/auth/me
// @desc:   Update user settings
router.put('/me', auth, upload.single('profilePic'), async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ msg: 'Email is required' })
    }
    // Check if username is already taken
    let user = await User.findOne({ email: email.toLowerCase() })
    if (user && user._id.toString() !== req.userId) {
      return res.status(400).json({ msg: 'Email đã được sử dụng' })
    }
    const updatedUser = {
      ...req.body
    }
    if (req.file && req.file.path) updatedUser.profilePicUrl = req.file.path

    user = await User.findByIdAndUpdate(req.userId, updatedUser, { new: true })

    res.status(200).json({ msg: 'Update User thành công' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error', error })
  }
})
// @route:  put /api/auth/:id
// @desc:   Cập nhật thông tin user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'Người dùng không tồn tại' })
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res
      .status(201)
      .json({ products: updateUser, msg: 'Cập nhật thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/products/:id
// @desc:   Lấy thông tin chi tiết của products
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'Người dùng không tồn tại' })
    }
    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  PUT /api/auth/password
// @desc:   Update password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await User.findById(req.userId).select('+password')
    if (!user) {
      return res.status(404).json({ msg: 'Không tìm thấy người dùng' })
    }

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(401).json({ msg: 'Mật khẩu không đúng' })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'Mật khẩu tối thiểu 6 ký tự' })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    res.status(200).json({ msg: 'Password updated' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
