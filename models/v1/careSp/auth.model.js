const mongoose = require("mongoose");
const { DeviceTypes } = require("../../../utils/constants");

const therapistAuthSchema = mongoose.Schema({
  name: String,
  email: String,
  otp: { type: Number, default: null },
  password: String,
  emailVerifiedAt: {
    type: Date,
    default: null,
  },
  otpVerified: { type: Boolean, default: false },
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

const Therapist = mongoose.model("Therapist_Auth", therapistAuthSchema);

module.exports = Therapist;
