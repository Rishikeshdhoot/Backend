const mongoose = require("mongoose");
const User = require("../user/auth.model");
const Therapist = require("../therapist/auth.model");
const { DeviceTypes, ModelStrings } = require("../../../utils/constants");
const Outlet = require("../outlets/auth.model");

const userInfoSchema = new mongoose.Schema({
  uID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  name: String,
  image: String,
  phone: String,
  email: String
}, { _id: false });

const spInfoSchema = new mongoose.Schema({
  spID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Therapist,
  },
  name: String,
  image: String,
  type: String,
}, { _id: false });

const outletSchema = new mongoose.Schema({
  oID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Outlet,
  },
  name: String,
  image: String,
}, { _id: false });

const patientInfoSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  phone: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
});

const appointmentsInfoSchema = new mongoose.Schema({
  day: Date,
  time: Date,
  status: String,
  mode: String,
  type: String,
  issues: [String],
  recurrenceType: {
    type: String,
    enum: [ModelStrings.recurring, ModelStrings.session],
    default: null
  },
  vop: String,
  specialistObservation: String,
}, { _id: false });

const currentSessionInfo = new mongoose.Schema(
  {
    fromDate: Date,
    total_session: mongoose.Schema.Types.Mixed,
    duration: String,
    mode: String,
    time: Date,
    location: String,
    package_type: String,
    session_type: String,
    fees: Number,
    total_amount: Number,
    paid_amount: Number,
    attended_by: {
      id: String,
      name: String,
      image: String,
    },
  }, { _id: false }
);

const activityRecords = new mongoose.Schema({
  type: String,
  result: String,
  created_on: Date,
});

const sessionsRecords = new mongoose.Schema({
  date: Date,
  status: String,
  fees: Number,
  attended_by: {
    id: String,
    name: String,
    image: String,
  },
  cReason: String,
  start_time: { type: Date, default: null },
  end_time: { type: Date, default: null },
  canceled_by: {
    id: String,
    name: String,
    image: String,
  },
  updated_on: Date,
  activity_records: { type: [activityRecords], default: null },
});

const updatedSessionsRecords = new mongoose.Schema({
  duration: String,
  mode: String,
  time: Date,
  location: String,
  package_type: {
    type: String,
    enum: [ModelStrings.everyday, ModelStrings.sevenDays, ModelStrings.tenDays],
  },
  session_type: {
    type: String,
    enum: [
      ModelStrings.alternate,
      ModelStrings.weekdays,
      ModelStrings.weekends,
      ModelStrings.everyday,
    ],
  },
  fees: Number,
  paid_amount: Number,
  attended_by: {
    id: String,
    name: String,
    image: String,
  },
  created_on: Date,
});

const active_Appointments = new mongoose.Schema({
  user_info: {
    type: userInfoSchema,
    default: null
  },
  sp_info: spInfoSchema,
  outlet_info: {
    type: outletSchema,
    default: null
  },
  patient_info: patientInfoSchema,
  appointment_info: appointmentsInfoSchema,
  current_session_info: {
    type: currentSessionInfo,
    default: null
  },
  updated_sessions_records: {
    type: [updatedSessionsRecords],
    default: null
  },
  sessions_records: {
    type: [sessionsRecords],
    default: null
  },
  created_at: Date,
  updated_at: Date,
});

const ActiveAppoinment = mongoose.model(
  "Active_Appoinment",
  active_Appointments
);

module.exports = ActiveAppoinment;
