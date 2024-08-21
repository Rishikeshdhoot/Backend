const express = require("express");
const routes = express.Router();

//---------------------------------------------MIDDLEWARES--------------------------------------------------//
const authenticate = require("../../../middlewares/v1/auth");
const {
  validateAuthRequest,
} = require("../../../middlewares/v1/therapist/auth/validateAuthRequest");
const {
  validateSlotsManagementRequest,
} = require("../../../middlewares/v1/therapist/manage_slots");
const {
  validateAppointmentsRequest,
} = require("../../../middlewares/v1/therapist/appointments");
const { asyncTryCatchMiddleware } = require("../../../middlewares/v1/async");

//---------------------------------------------CONTROLLERS--------------------------------------------------//
const userController = require("../../../controllers/v1/therapist/auth/auth.controller");
const manageSlotsController = require("../../../controllers/v1/therapist/manage_slots");
const appointmentsController = require("../../../controllers/v1/therapist/appointments");
const {
  parseJsonStringsMiddleware,
} = require("../../../middlewares/v1/parser");
// const { uploadToS3Middleware } = require("../../../middlewares/v1/aws");
const { upload } = require("../../../middlewares/v1/file");

//---------------------------------------------ROUTES--------------------------------------------------//

//Authenitication
routes.post("/signup", validateAuthRequest, userController.signup);
routes.post("/login", validateAuthRequest, userController.login);
routes.post(
  "/verify-email-otp",
  validateAuthRequest,
  userController.verifyEmailOtp
);
routes.post(
  "/forgot-password",
  validateAuthRequest,
  asyncTryCatchMiddleware(userController.forgotPassword)
);
routes.post(
  "/forgot-password-otp",
  validateAuthRequest,
  asyncTryCatchMiddleware(userController.forgotPasswordOtp)
);
routes.post(
  "/change-password",
  validateAuthRequest,
  asyncTryCatchMiddleware(userController.changePassword)
);
routes.post(
  "/update-password",
  validateAuthRequest,
  asyncTryCatchMiddleware(userController.updatePassword)
);

//Profile Registration
routes.post(
  "/register",
  authenticate,
  parseJsonStringsMiddleware,
  validateAuthRequest,
  asyncTryCatchMiddleware(userController.registerProfile)
);

//Manage Slots
routes.post(
  "/create-slots",
  authenticate,
  validateSlotsManagementRequest,
  manageSlotsController.create_slots
);
routes.post(
  "/get-slots",
  authenticate,
  validateSlotsManagementRequest,
  manageSlotsController.get_slots
);

// Appointments Management
routes.post(
  "/getInPersonBooking",
  authenticate,
  validateAppointmentsRequest,
  appointmentsController.get_InPerson_Booking_upcoming
);
routes.post(
  "/getVirtualBooking",
  authenticate,
  validateAppointmentsRequest,
  appointmentsController.get_Virtual_Booking_upcoming
);
routes.post(
  "/getAllBooking",
  authenticate,
  validateAppointmentsRequest,
  appointmentsController.get_All_Booking_upcoming
);
routes.post(
  "/getCurrentBooking",
  authenticate,
  validateAppointmentsRequest,
  appointmentsController.get_Current_Booking_upcoming
);
routes.post(
  "/cancelAppointments",
  authenticate,
  validateAppointmentsRequest,
  appointmentsController.get_Current_Booking_upcoming
);


// Active Appointments Details
routes.post(
  "/upcomingAppointmentDetails",
  authenticate,
  validateAppointmentsRequest,
  appointmentsController.get_Upcoming_Appointment_Details
);

routes.post(
  "/cancel-appointments",
  authenticate,
  validateAppointmentsRequest,
  appointmentsController.cancel_Appointments
);

routes.post(
  "/complete-appointment",
  authenticate,
  parseJsonStringsMiddleware,
  validateAppointmentsRequest,
  asyncTryCatchMiddleware(appointmentsController.complete_Appointment)
);

routes.post(
  "/start-session",
  authenticate,
  validateAppointmentsRequest,
  asyncTryCatchMiddleware(appointmentsController.start_Session)
);

routes.post(
  "/complete-session",
  authenticate,
  validateAppointmentsRequest,
  asyncTryCatchMiddleware(appointmentsController.complete_Session)
);

routes.post(
  "/cancel-session",
  authenticate,
  validateAppointmentsRequest,
  asyncTryCatchMiddleware(appointmentsController.cancel_session)
);

routes.post(
  "/increase-session",
  authenticate,
  validateAppointmentsRequest,
  asyncTryCatchMiddleware(appointmentsController.complete_Appointment)
);

routes.post(
  "/terminate-session",
  authenticate,
  validateAppointmentsRequest,
  asyncTryCatchMiddleware(appointmentsController.complete_Appointment)
);

module.exports = routes;
