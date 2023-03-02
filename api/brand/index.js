const express = require('express')
const router = express.Router()
const upload = require('../../middleware/imageUpload')

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
  if (!newBrand) { return res.status(404).send('Brand không thể được tạo') }

  res.send(newBrand)
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
