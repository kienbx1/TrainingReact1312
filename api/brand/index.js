const express = require('express')
const router = express.Router()

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

router.post('/', async (req, res) => {
  let newBrand = new Brand(req.body)
  newBrand = newBrand.save()
  if (!newBrand) { return res.status(404).send('Brand không thể được tạo') }

  res.send(newBrand)
})

module.exports = router
