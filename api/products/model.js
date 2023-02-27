const { current } = require("@reduxjs/toolkit");
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    Image: {
      type: String
    },
    // name: {
    //   type: String,
    //   required: [true, "Nhập tên sản phẩm"],
    // },
    // branch: {
    //   type: String,
    //   require: [true, 'Nhập tên thương hiệu']
    // },
    // importQuantity: {
    //   type: Number,
    //   require: [true, 'Nhập số lượng hàng']
    // },
    // sellQuantity: {
    //   type: Number,
    //   require: [true, 'Nhập số lượng hàng']
    // },
    // price: {
    //   type: String,
    //   required: [true, 'Nhập giá sản phẩm']
    // },
    // date: {
    //   type: String
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productsSchema);
