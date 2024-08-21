const manageSlotsService = require("../../../../services/v1/therapist/manage_slots");
const helper = require("../../../../utils/helper");

const create_slots = async (req, res) => {
  const new_slots = await manageSlotsService.create_slots(req.body);
  if (new_slots.success) return helper.responseOk(res, new_slots.message, new_slots.data);
  else return helper.responseError(res, new_slots.message);
};

const get_slots = async (req, res) => {
  const slots = await manageSlotsService.get_slots(req.body);
  if (slots.success) return helper.responseOk(res, slots.message, slots.data);
  else return helper.responseError(res, slots.message);
};

const book_appointment = async (req, res) => {
  const appointment_booked = await manageSlotsService.get_slots(req.body);
  if (appointment_booked.success)
    return helper.responseOk(res, appointment_booked.message);
  else return helper.responseError(res, appointment_booked.message);
};

module.exports = {
  create_slots,
  book_appointment,
  get_slots,
};
