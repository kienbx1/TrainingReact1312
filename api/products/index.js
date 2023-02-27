const express = require("express");
const router = express.Router();
const upload = require("../../middleware/imageUpload");
const multer = require("multer");
const Products = require("./model");
const { Mongoose } = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });

// @route:  GET /api/products/
// @desc:   Lấy ra tất cả products trong hệ thống
router.get("/", async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 10);
    const skip = Number(req?.query?.skip || 0) * limit;
    const products = await Products.find()
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);
    const count = await Products.count();
    res.status(200).json({ products, count });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/upload", (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new Mongoose.Types.ObjectId(),
  });
  product.save().then((result) => {
    console.log(result);
    res.status(201).json({ msg: "create success" });
  });
});
// @route:  POST /api/products/
// @desc:   Thêm mới products
router.post("/", uploads.single("Image"), async (req, res) => {
  try {
    const dataProduct = {
      ...req.body,
    };
    if (!dataProduct) {
      res.status(400).json({ msg: "Vui lòng nhập đầy đủ thông tin" });
    }
    if (req.file && req.file.path) {
      dataProduct.Image = req.file.path;
    }
    const newProducts = new Products(req.body);
    newProducts.save();
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// @route:  GET /api/products/:id
// @desc:   Lấy thông tin chi tiết của products
router.get("/:id", async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    if (!products) {
      return res.status(404).json({ msg: "Tour không tồn tại" });
    }
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// @route:  put /api/products/:id
// @desc:   Cập nhật thông tin products
router.put("/:id", async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    if (!products) {
      return res.status(404).json({ msg: "Tour không tồn tại" });
    }
    const updateProducts = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(201)
      .json({ products: updateProducts, msg: "cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// @route:  DELETE /api/products/:id
// @desc:   Xóa products
router.delete("/:id", async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    if (!products) {
      return res.status(404).json({ msg: "Tour không tồn tại" });
    }
    await Products.findByIdAndDelete(req.params.id);

    res.status(201).json({ msg: "xóa Tour thành công" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
