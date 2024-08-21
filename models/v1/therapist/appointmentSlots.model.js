const mongoose = require("mongoose");
const Therapist = require("./auth.model");

const slotSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  time: Date,
  status: String,
});

const in_person_slots = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  day: Date,
  type: String,
  morningSlots: [slotSchema],
  afternoonSlots: [slotSchema],
  eveningSlots: [slotSchema],
  nightSlots: [slotSchema],
  created_at: Date,
  updated_at: Date,
});

const tele_slots = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  day: Date,
  type: String,
  morningSlots: [slotSchema],
  afternoonSlots: [slotSchema],
  eveningSlots: [slotSchema],
  nightSlots: [slotSchema],
  created_at: Date,
  updated_at: Date,
});

const therapistAppointmentSlotsSchema = new mongoose.Schema({
  authID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Therapist,
  },
  in_person_slots: [in_person_slots],
  tele_slots: [tele_slots],
  created_at: Date,
  updated_at: Date,
});

const TherapistAppointmentSlots = mongoose.model(
  "Therapist_Appointment_Slots",
  therapistAppointmentSlotsSchema
);

module.exports = TherapistAppointmentSlots;
