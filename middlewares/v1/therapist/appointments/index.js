const { validateJoiSchema } = require("../../../../utils/helper");
const appointmentsValidation = require("../../../../validations/v1/appointments");

module.exports.validateAppointmentsRequest = async (req, res, next) => {
  const url = req.originalUrl.replace("/api/v1/therapist/", "");
  switch (url) {
    case "getInPersonBooking":
      validateJoiSchema(
        appointmentsValidation.get_InPerson_Booking_upcoming,
        req,
        res,
        next
      );
      break;
    case "getVirtualBooking":
      validateJoiSchema(
        appointmentsValidation.get_Virtual_Booking_upcoming,
        req,
        res,
        next
      );
      break;
    case "getAllBooking":
      validateJoiSchema(
        appointmentsValidation.get_All_Booking_upcoming,
        req,
        res,
        next
      );
      break;
    case "getCurrentBooking":
      validateJoiSchema(
        appointmentsValidation.get_Current_Booking_upcoming,
        req,
        res,
        next
      );
      break;
    case "upcomingAppointmentDetails":
      validateJoiSchema(
        appointmentsValidation.get_Upcoming_Appointment_Details,
        req,
        res,
        next
      );
      break;
    case "cancel-appointments":
      validateJoiSchema(
        appointmentsValidation.cancel_Appointments,
        req,
        res,
        next
      );
      break;
    case "complete-appointment":
      validateJoiSchema(
        appointmentsValidation.complete_Appointment,
        req,
        res,
        next
      );
      break;
    case "start-session":
      validateJoiSchema(
        appointmentsValidation.session_validation,
        req,
        res,
        next
      );
      break;
    case "complete-session":
      validateJoiSchema(
        appointmentsValidation.session_validation_with_time,
        req,
        res,
        next
      );
      break;
    case "increase-session":
      validateJoiSchema(
        appointmentsValidation.complete_Appointment,
        req,
        res,
        next
      );
      break;
    case "terminate-session":
      validateJoiSchema(
        appointmentsValidation.complete_Appointment,
        req,
        res,
        next
      );
      break;
    case "cancel-session":
      validateJoiSchema(
        appointmentsValidation.cancel_session,
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
