const { validateJoiSchema } = require("../../../../utils/helper");
const slotManagementValidation = require("../../../../validations/v1/therapist/manage_slots/index");

module.exports.validateSlotsManagementRequest = async (req, res, next) => {
  const url = req.originalUrl.replace("/api/v1/doctor/", "");
  switch (url) {
    case "create-slots":
      validateJoiSchema(slotManagementValidation.create_slots, req, res, next);
      break;
    case "book-apointment":
      validateJoiSchema(slotManagementValidation.book_appoitment, req, res, next);
      break;
    default:
      next();
      break;
  }
};
