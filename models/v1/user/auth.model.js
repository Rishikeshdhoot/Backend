const mongoose = require("mongoose");
const { DeviceTypes } = require("../../../utils/constants");

const userAuthSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  image: String,
  age: Number,
  gender: String,
  otp: { type: Number, default: null },
  password: String,
  otpVerified: { type: Boolean, default: false },
  emailVerifiedAt: {
    type: Date,
    default: null,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  authToken: { type: String, default: null },
  deviceToken: { type: String, default: null },
  deviceType: {
    type: String,
    enum: [DeviceTypes.android, DeviceTypes.ios, DeviceTypes.web],
    default: null,
  },
  created_at: Date,
  updated_at: Date,
});

const User = mongoose.model("User_Auth", userAuthSchema);

module.exports = User;
