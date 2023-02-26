const { current } = require("@reduxjs/toolkit");
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nhập tên sản phẩm"],
    },
    avatar: {
      type: String,
    },
    date: {
      type: String,
    },
    branch:{
      type:String
    },
    price: {
      type: String,
      required: [true, "Nhập giá tour"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productsSchema);
