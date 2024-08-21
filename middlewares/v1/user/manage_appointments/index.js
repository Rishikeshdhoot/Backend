const { validateJoiSchema } = require("../../../../utils/helper");
const appointmentsValidation = require("../../../../validations/v1/appointments");

module.exports.validateAppointmentManagementRequest = async (req, res, next) => {
    const url = req.originalUrl.replace("/api/v1/user/", "");
    switch (url) {
        case "/book-therapist":
            validateJoiSchema(appointmentsValidation.bookTherapist, req, res, next);
            break;
        case "/start-session":
            validateJoiSchema(appointmentsValidation.session_validation, req, res, next);
            break;
        case "/cancel-start-session":
            validateJoiSchema(appointmentsValidation.session_validation, req, res, next);
            break;
        case "/complete-session":
            validateJoiSchema(appointmentsValidation.session_validation, req, res, next);
            break;
        case "/cancel-complete-session":
            validateJoiSchema(appointmentsValidation.session_validation, req, res, next);
            break;
        case "/upgrade-session":
            validateJoiSchema(appointmentsValidation.upgrade_session, req, res, next);
            break;
        case "/terminate-session":
            validateJoiSchema(appointmentsValidation.terminate_session, req, res, next);
            break;
        default:
            next();
            break;
    }
};
