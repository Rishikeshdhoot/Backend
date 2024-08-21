const manageSlotsService = require("../../../../services/v1/doctor/manage_slots");
const helper = require("../../../../utils/helper");

const create_slots = async (req, res) => {
  const new_slots = await manageSlotsService.create_slots(req.body);
  if (new_slots.success) return helper.responseOk(res, new_slots.message);
  else return helper.responseError(res, new_slots.message);
};

const book_appointment = async (req, res) => {
  const appointment_booked = await manageSlotsService.book_appoitment(req.body);
  if (appointment_booked.success) return helper.responseOk(res, appointment_booked.message);
  else return helper.responseError(res, appointment_booked.message);
};

module.exports = {
  create_slots,
  book_appointment,
};
