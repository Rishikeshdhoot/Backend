const helper = require("../../../../utils/helper");
const manageAppointmentsService = require("../../../../services/v1/user/appointments");

const book_therapist_appointment = async (req, res) => {
  let response = await manageAppointmentsService.book_therapist_appointment(
    req.body.appointmentData,
    req.body.slotData
  );
  if (response.success) return helper.responseOk(res, response.message);
  else return helper.responseError(res, response.message);
};


const start_Session = async (req, res) => {
  const result = await manageAppointmentsService.start_Session(req.body);
  if (result.success) return helper.responseOk(res, result.message, result.data);
  else return helper.responseError(res, result.message, result.status);
};


const cancel_start_Session = async (req, res) => {
  const result = await manageAppointmentsService.cancel_start_Session(req.body);
  if (result.success) return helper.responseOk(res, result.message, result.data);
  else return helper.responseError(res, result.message, result.status);
};


const complete_Session = async (req, res) => {
  const result = await manageAppointmentsService.complete_Session(req.body);
  if (result.success) return helper.responseOk(res, result.message, result.data);
  else return helper.responseError(res, result.message, result.status);
};


const cancel_complete_Session = async (req, res) => {
  const result = await manageAppointmentsService.cancel_complete_Session(req.body);
  if (result.success) return helper.responseOk(res, result.message, result.data);
  else return helper.responseError(res, result.message, result.status);
};


const upgrade_Session = async (req, res) => {
  const result = await manageAppointmentsService.upgrade_Session(req.body);
  if (result.success) return helper.responseOk(res, result.message, result.data);
  else return helper.responseError(res, result.message, result.status);
};


const terminate_Session = async (req, res) => {
  const result = await manageAppointmentsService.terminate_Session(req.body);
  if (result.success) return helper.responseOk(res, result.message, result.data);
  else return helper.responseError(res, result.message, result.status);
};


module.exports = {
  book_therapist_appointment,
  start_Session,
  cancel_start_Session,
  complete_Session,
  cancel_complete_Session,
  upgrade_Session,
  terminate_Session
};
