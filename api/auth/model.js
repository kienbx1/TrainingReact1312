const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nhập tên người dùng']
    },
    email: {
      type: String,
      required: [true, 'Nhập email'],
      unique: true,
      operationType: 'update',
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Nhập đúng định dạng email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Nhập mật khẩu']
    },
    profilePicUrl: {
      type: String,
      default: 'https://www.gravatar.com/avatar/?d=mp'
    },
    phoneNumber: {
      type: String
    },
    address: {
      type: String
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin']
    },
    verificationToken: {
      type: String
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
