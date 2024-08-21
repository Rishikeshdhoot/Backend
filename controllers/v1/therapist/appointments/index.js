const appointmentsService = require("../../../../services/v1/therapist/appointments");
const helper = require("../../../../utils/helper");

const get_InPerson_Booking_upcoming = async (req, res) => {
  
  const slots = await appointmentsService.get_InPerson_Booking_upcoming(req.body);
  if (slots.success) return helper.responseOk(res, slots.message, slots.data);
  else return helper.responseError(res, slots.message, slots.status);
};

const get_Virtual_Booking_upcoming = async (req, res) => {
  const slots = await appointmentsService.get_Virtual_Booking_upcoming(req.body);
  if (slots.success) return helper.responseOk(res, slots.message, slots.data);
  else return helper.responseError(res, slots.message, slots.status);
};

const get_All_Booking_upcoming = async (req, res) => {
  const slots = await appointmentsService.get_All_Booking_upcoming(req.body);
  if (slots.success) return helper.responseOk(res, slots.message, slots.data);
  else return helper.responseError(res, slots.message, slots.status);
};

const get_Current_Booking_upcoming = async (req, res) => {
  const slots = await appointmentsService.get_Current_Booking_upcoming(req.body);
  if (slots.success) return helper.responseOk(res, slots.message, slots.data);
  else return helper.responseError(res, slots.message, slots.status);
};

const get_Upcoming_Appointment_Details = async (req, res) => {
  const slots = await appointmentsService.get_Upcoming_Appointment_Details(req.body);
  if (slots.success) return helper.responseOk(res, slots.message, slots.data);
  else return helper.responseError(res, slots.message, slots.status);
};

const cancel_Appointments = async (req, res) => {
  const slots = await appointmentsService.cancel_Appointments(req.body);
  if (slots.success) return helper.responseOk(res, slots.message, slots.data);
  else return helper.responseError(res, slots.message, slots.status);
};

const complete_Appointment = async (req, res) => {
  const slots = await appointmentsService.complete_Appointment(req.body);
  if (slots.success) return helper.responseOk(res, slots.message, slots.data);
  else return helper.responseError(res, slots.message, slots.status);
};

const start_Session = async (req, res) => {
  const result = await appointmentsService.start_Session(req.body);
  if (result.success) return helper.responseOk(res, result.message, result.data);
  else return helper.responseError(res, result.message, result.status);
};

const complete_Session = async (req, res) => {
  const result = await appointmentsService.complete_Session(req.body);
  if (result.success) return helper.responseOk(res, result.message, result.data);
  else return helper.responseError(res, result.message, result.status);
};

const cancel_session = async (req, res) => {
  const result = await appointmentsService.cancel_session(req.body);
  if (result.success) return helper.responseOk(res, result.message, result.data);
  else return helper.responseError(res, result.message, result.status);
};

module.exports = {
  get_InPerson_Booking_upcoming,
  get_Virtual_Booking_upcoming,
  get_All_Booking_upcoming,
  get_Current_Booking_upcoming,
  get_Upcoming_Appointment_Details,
  cancel_Appointments,
  complete_Appointment,
  start_Session,
  complete_Session,
  cancel_session
};
