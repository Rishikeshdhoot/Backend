const express = require("express");
const routes = express.Router();

//---------------------------------------------MIDDLEWARES--------------------------------------------------//
const authenticate = require("../../../middlewares/v1/auth");
const {
  validateAuthRequest,
} = require("../../../middlewares/v1/outlets/auth/validateAuthRequest");
// const {
//   validateSlotsManagementRequest,
// } = require("../../../middlewares/v1/outlets/manage_slots");
const { asyncTryCatchMiddleware } = require("../../../middlewares/v1/async");

//---------------------------------------------CONTROLLERS--------------------------------------------------//
const userController = require("../../../controllers/v1/outlets/auth/auth.controller");
const appointmentsController = require("../../../controllers/v1/outlets/appointments");

// const manageSlotsController = require("../../../controllers/v1/outlet/manage_slots");
const {
  parseJsonStringsMiddleware,
} = require("../../../middlewares/v1/parser");
// const { uploadToS3Middleware } = require("../../../middlewares/v1/aws");
const { upload } = require("../../../middlewares/v1/file");
const { validateAppointmentRequest } = require("../../../middlewares/v1/outlets/appointments");

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


// Appointmnet Management
routes.post(
  "/book-appointment",
  validateAppointmentRequest,
  asyncTryCatchMiddleware(appointmentsController.book_outlet_appoitment)
);

routes.post(
  "/ongoing-sessions",
  validateAppointmentRequest,
  asyncTryCatchMiddleware(appointmentsController.get_All_Ongoing_Appointments)
);

routes.post(
  "/appointment-details",
  validateAppointmentRequest,
  asyncTryCatchMiddleware(appointmentsController.get_Active_Appointment_Details)
);

routes.post(
  "/complete-session",
  authenticate,
  validateAppointmentRequest,
  asyncTryCatchMiddleware(appointmentsController.complete_Session)
);

routes.post(
  "/cancel-session",
  authenticate,
  validateAppointmentRequest,
  asyncTryCatchMiddleware(appointmentsController.cancel_session)
);
routes.post("/upgrade-session", authenticate, validateAppointmentRequest, asyncTryCatchMiddleware(appointmentsController.upgrade_Session));
module.exports = routes;
