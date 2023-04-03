const express = require('express')
const router = express.Router()
const upload = require('../../middleware/imageUpload')
const auth = require('../../middleware/auth')
const Brand = require('./model')

router.get('/', async (req, res) => {
  const brandList = await Brand.find()

  if (!brandList) {
    res.status(500).json({ success: false })
  }
  res.send(brandList)
})

router.get('/:slug', async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug })
    if (!brand) {
      return res.status(404).json({ msg: 'Brand không tồn tại' })
    }
    res.status(200).json({ brand })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

router.post('/', upload.single('banner'), async (req, res) => {
  const data = {
    ...req.body
  }
  if (req.file && req.file.path) {
    data.banner = req.file.path
  }
  let newBrand = new Brand(data)
  newBrand = newBrand.save()
  if (!newBrand) {
    return res.status(404).send('Brand không thể được tạo')
  } else {
    return res.status(200).send('Tạo mới thành công')
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const resp = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!resp) {
      return res.status(404).json({ msg: 'Không tìm thấy thương hiệu' })
    }
    res.status(200).json({ msg: 'Update thành công' })
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id)
    if (!brand) {
      return res.status(404).json({ msg: 'Thương hiệu không tồn tại' })
    }
    await Brand.findByIdAndDelete(req.params.id)

    res.status(201).json({ msg: 'xóa thương hiệu thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// router.post('/', upload.single('logo'), upload.single('banner') , async (req, res, next) => {
//   if (req.files && req.files.length) {
//     console.log("router.route ~ req.files:", req.files)

//     req.files.map(item => {
//       if (item.path) {
//         images.push(item.path)
//       }
//       return item
//     })
//   }
// })

module.exports = router
