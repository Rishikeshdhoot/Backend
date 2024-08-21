const appointmentsService = require("../../../../services/v1/outlets/appointments");
const helper = require("../../../../utils/helper");

const get_All_Ongoing_Appointments = async (req, res) => {
    const result = await appointmentsService.get_All_Ongoing_Appointments(req.body);
    if (result.success) return helper.responseOk(res, result.message, result.data);
    else return helper.responseError(res, result.message, result.status);
};

const book_outlet_appoitment = async (req, res) => {
    const result = await appointmentsService.book_outlet_appoitment(req.body);
    if (result.success) return helper.responseOk(res, result.message, result.data);
    else return helper.responseError(res, result.message, result.status);
};


const get_Active_Appointment_Details = async (req, res) => {
    const result = await appointmentsService.get_Active_Appointment_Details(req.body);
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

const upgrade_Session = async (req, res) => {
    const result = await appointmentsService.upgrade_Session(req.body);
    if (result.success) return helper.responseOk(res, result.message, result.data);
    else return helper.responseError(res, result.message, result.status);
  };
  
module.exports = {
    book_outlet_appoitment,
    get_All_Ongoing_Appointments,
    get_Active_Appointment_Details,
    complete_Session,
    cancel_session,
    upgrade_Session
}