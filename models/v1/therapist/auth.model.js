const mongoose = require("mongoose");
const { DeviceTypes } = require("../../../utils/constants");

const EducationSchema = new mongoose.Schema({
  id: String,
  degree: String,
  university: String,
  year: Number,
});

const WorkExperienceSchema = new mongoose.Schema({
  id: String,
  position: String,
  organization: String,
  year: Number,
});

const MembershipSchema = new mongoose.Schema({
  id: String,
  title: String,
  organization: String,
  year: Number,
});

const ServiceSchema = new mongoose.Schema({
  id: String,
  title: String,
});

const StateSchema = new mongoose.Schema({
  id: String,
  title: String,
});

const DistrictSchema = new mongoose.Schema({
  id: String,
  title: String,
});

const AreaSchema = new mongoose.Schema({
  id: String,
  title: String,
});

const SpecialitySchema = new mongoose.Schema({
  id: String,
  title: String,
});

const contactInfoSchema = new mongoose.Schema({
  website: { type: String, default:null },
  state: StateSchema,
  district: DistrictSchema,
  area: AreaSchema,
  pinCode: { type: Number, default: null, },
  address: { type: String, default: null, },
});

const professionalInfoSchema = new mongoose.Schema({
  specialities: SpecialitySchema,
  services: [ServiceSchema],
  practicingSince: { type: Number, default: null },
  registrationNumber: { type: String, default: null },
  educations: [EducationSchema],
  we: [WorkExperienceSchema],
  membership: [MembershipSchema],
  vFees: { type: Number, default: null, },
  cFees: { type: Number, default: null, },
  aboutSelf: { type: String, default: null, },
});

const generalInfoSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  profilePic: String,
  coverPic: String,
});

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

const Therapist = mongoose.model("Therapist_Auth", therapistAuthSchema);

module.exports = Therapist;
