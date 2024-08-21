const mongoose = require("mongoose");
const { DeviceTypes } = require("../../../utils/constants");

const CertificateSchema = new mongoose.Schema({
  // id: String,
  title: String,
  organization: String,
  year: Number,
});

const ServiceSchema = new mongoose.Schema({
  id: String,
  title: String,
});

const SpecialitySchema = new mongoose.Schema({
  id: String,
  title: String,
});

const locationSchema = new mongoose.Schema({
  id: String,
  title: String,
}, { _id: false });

const contactInfoSchema = new mongoose.Schema({
  website: { type: String, default: null },
  state: locationSchema,
  district: locationSchema,
  area: locationSchema,
  pinCode: { type: Number, default: null, },
  address: { type: String, default: null, },
}, { _id: false });

const professionalInfoSchema = new mongoose.Schema({
  specialities: [SpecialitySchema],
  services: [ServiceSchema],
  registrationNumber: String,
  certificates: [CertificateSchema],
  establisedYear: Number,
}, { _id: false });

const generalInfoSchema = new mongoose.Schema({
  name: String,
  profilePic: String,
  coverPic: String,
}, { _id: false });

const outletAuthSchema = mongoose.Schema({
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
  isRegistred: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  authToken: { type: String, default: null },
  deviceToken: { type: String, default: null },
  deviceType: {
    type: String,
    enum: [DeviceTypes.android, DeviceTypes.ios, DeviceTypes.web],
    default: null,
  },
  generalInfo: generalInfoSchema,
  professionalInfo: professionalInfoSchema,
  contactInfo: contactInfoSchema,
  created_at: Date,
  updated_at: Date,
});

const Outlet = mongoose.model("Outlet_Auth", outletAuthSchema);

module.exports = Outlet;
