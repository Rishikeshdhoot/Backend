const { validateJoiSchema } = require("../../../../utils/helper");
const userValidation = require("../../../../validations/v1/auth");
const appointmentsValidation = require("../../../../validations/v1/appointments");

module.exports.validateAppointmentRequest = async (req, res, next) => {
    const url = req.originalUrl.replace("/api/v1/outlet/", "");
    switch (url) {
        case "book-appointment":
            validateJoiSchema(appointmentsValidation.book_outlet_appoitment, req, res, next);
            break;
        case "ongoing-sessions":
            validateJoiSchema(appointmentsValidation.get_Appointment, req, res, next);
            break;
        case "finished-sessions":
            validateJoiSchema(appointmentsValidation.get_Appointment, req, res, next);
            break;
        case "complete-session":
            validateJoiSchema(appointmentsValidation.session_validation, req, res, next);
            break;
        case "cancel-session":
            validateJoiSchema(appointmentsValidation.cancel_session, req, res, next);
            break;
        case "upgrade-session":
            validateJoiSchema(appointmentsValidation.upgrade_session, req, res, next);
            break;
        case "terminate-session":
            validateJoiSchema(appointmentsValidation.get_Appointment, req, res, next);
            break;
        default:
            next();
            break;
    }
};
