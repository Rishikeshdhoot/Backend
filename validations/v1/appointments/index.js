const Joi = require("joi");

module.exports.bookTherapist = Joi.object({
  slotData: Joi.object({
    spId: Joi.string().required(),
    mode: Joi.string().valid("in_person_slots", "tele_slots").required(),
    dayId: Joi.string().required(),
    timeId: Joi.string().required(),
    type: Joi.string()
      .valid("morningSlots", "afternoonSlots", "eveningSlots", "nightSlots")
      .required(),
  }),
  appointmentData: Joi.object({
    pName: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    age: Joi.number().integer().min(0).required(),
    phone: Joi.string().required(),
    issues: Joi.array().items(Joi.string()).min(1).required(),
    description: Joi.string().required(),
    day: Joi.date().iso().required(),
    time: Joi.number().integer().required(),
    spName: Joi.string().required(),
    spImage: Joi.string().uri().required(),
    uId: Joi.string().required(),
    uName: Joi.string().required(),
    uImage: Joi.string().uri().required(),
  }),
});

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

module.exports.create_slots = Joi.object({
  authID: Joi.string().required(),
  start_from: Joi.string().isoDate().required(),
  end_till: Joi.string().isoDate().required(),
  special_day: Joi.array().items(
    ...daysOfWeek.map((day) => Joi.string().valid(day))
  ),
  day_off: Joi.array().items(
    ...daysOfWeek.map((day) => Joi.string().valid(day))
  ),
  type: Joi.string().required(),
  break_type: Joi.string().required(),
  interval_after: Joi.number(),
  interval_for: Joi.number(),
  break_time: Joi.number(),
  duration: Joi.number(),
  morning_shift: Joi.object({
    start: Joi.string().isoDate().required(),
    till: Joi.string().isoDate().required(),
    isSpecial: Joi.boolean().required(),
    special_start: Joi.when("isSpecial", {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden(),
    }),
    special_till: Joi.when("isSpecial", {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden(),
    }),
  }),
  afternoon_shift: Joi.object({
    start: Joi.string().isoDate().required(),
    till: Joi.string().isoDate().required(),
    isSpecial: Joi.boolean().required(),
    special_start: Joi.when("isSpecial", {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden(),
    }),
    special_till: Joi.when("isSpecial", {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden(),
    }),
  }),
  evening_shift: Joi.object({
    start: Joi.string().isoDate().required(),
    till: Joi.string().isoDate().required(),
    isSpecial: Joi.boolean().required(),
    special_start: Joi.when("isSpecial", {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden(),
    }),
    special_till: Joi.when("isSpecial", {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden(),
    }),
  }),
  night_shift: Joi.object({
    start: Joi.string().isoDate().required(),
    till: Joi.string().isoDate().required(),
    isSpecial: Joi.boolean().required(),
    special_start: Joi.when("isSpecial", {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden(),
    }),
    special_till: Joi.when("isSpecial", {
      is: true,
      then: Joi.string().isoDate().required(),
      otherwise: Joi.forbidden(),
    }),
  }),
});

module.exports.get_slots = Joi.object({
  id: Joi.string().required(),
});

module.exports.book_appoitment = Joi.object({
  id: Joi.string().required(),
  subId: Joi.string().required(),
  subIddate: Joi.string().required(),
  type: Joi.string().required(),
  mode: Joi.string().required(),
});

module.exports.get_InPerson_Booking_upcoming = Joi.object({
  id: Joi.string().required(),
});

module.exports.get_Virtual_Booking_upcoming = Joi.object({
  id: Joi.string().required(),
});

module.exports.get_All_Booking_upcoming = Joi.object({
  id: Joi.string().required(),
});

module.exports.get_Current_Booking_upcoming = Joi.object({
  id: Joi.string().required(),
});

module.exports.get_Upcoming_Appointment_Details = Joi.object({
  id: Joi.string().required(),
});

module.exports.get_Appointment = Joi.object({
  id: Joi.string().required(),
});

module.exports.cancel_Appointments = Joi.object({
  spId: Joi.string().required(),
  uId: Joi.string().required(),
  aId: Joi.array().items(Joi.string()).min(1).required(),
  userAppointmentsId: Joi.array().items(Joi.string()).min(1).required(),
  spAppointmentsId: Joi.array().items(Joi.string()).min(1).required(),
});

module.exports.complete_Appointment = Joi.object({
  aId: Joi.string().required(),
  sessionRecommended: Joi.boolean().required(),
  fromDate: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().isoDate().required(),
    otherwise: Joi.optional(),
  }),
  location: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().allow("").optional(),
    otherwise: Joi.optional(),
  }),
  mode: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().allow("").required(),
    otherwise: Joi.optional(),
  }),
  paidAmount: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.optional(),
  }),
  duration: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.optional(),
  }),
  time: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().isoDate().required(),
    otherwise: Joi.optional(),
  }),
  packageType: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().allow("").required(),
    otherwise: Joi.optional(),
  }),
  sessionType: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().allow("").required(),
    otherwise: Joi.optional(),
  }),
});

module.exports.session_validation = Joi.object({
  aId: Joi.string().required(),
  sId: Joi.string().required(),
});

module.exports.session_validation_with_time = Joi.object({
  aId: Joi.string().required(),
  sId: Joi.string().required(),
  start_time: Joi.string().isoDate().required(),
});

module.exports.cancel_session = Joi.object({
  aId: Joi.string().required(),
  sId: Joi.array().items(Joi.string()).min(1).required(),
  fromDate: Joi.string().required(),
  final_date: Joi.string().required(),
  time: Joi.string().required(),
  canceled_by: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string().required(),
  }),
  cReason: Joi.string().required(),
  sessionType: Joi.string().required(),
  fees: Joi.number().required(),
});

module.exports.upgrade_session = Joi.object({
  aId: Joi.string().required(),
  location: Joi.string().allow("").optional(),
  duration: Joi.number().required(),
  mode: Joi.string().allow("").required(),
  totalAmount: Joi.number().required(),
  paidAmount: Joi.number().required(),
  fromDate: Joi.string().isoDate().required(),
  time: Joi.string().isoDate().required(),
  packageType: Joi.string().allow("").required(),
  sessionType: Joi.string().allow("").required(),
  attended_by: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string().required(),
  }),
});

module.exports.terminate_session = Joi.object({
  aId: Joi.string().required(),
});

module.exports.book_outlet_appoitment = Joi.object({
  oId: Joi.string().required(),
  pName: Joi.string().required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  issues: Joi.array().items(Joi.string()).min(1).required(),
  vop: Joi.string().required(),
  vot: Joi.string().required(),
  sessionRecommended: Joi.boolean().required(),
  fromDate: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().isoDate().required(),
    otherwise: Joi.optional(),
  }),
  location: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().allow("").optional(),
    otherwise: Joi.optional(),
  }),
  mode: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().allow("").required(),
    otherwise: Joi.optional(),
  }),
  paidAmount: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.optional(),
  }),
  pendingAmount: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.number(),
    otherwise: Joi.optional(),
  }),
  time: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().isoDate().required(),
    otherwise: Joi.optional(),
  }),
  packageType: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().allow("").required(),
    otherwise: Joi.optional(),
  }),
  sessionType: Joi.when("sessionRecommended", {
    is: true,
    then: Joi.string().allow("").required(),
    otherwise: Joi.optional(),
  }),
});
