const { validateJoiSchema } = require("../../../../utils/helper");
const slotManagementValidation = require("../../../../validations/v1/manage_slots");

module.exports.validateSlotsManagementRequest = async (req, res, next) => {
  const url = req.originalUrl.replace("/api/v1/therapist/", "");
  switch (url) {
    case "create-slots":
      validateJoiSchema(slotManagementValidation.create_slots, req, res, next);
      break;
    case "get-slots":
      validateJoiSchema(slotManagementValidation.get_slots, req, res, next);
      break;
    case "book-apointment":
      validateJoiSchema(
        slotManagementValidation.book_appoitment,
        req,
        res,
        next
      );
      break;
    default:
      next();
      break;
  }
};
