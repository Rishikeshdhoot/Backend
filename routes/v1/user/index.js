const express = require("express");
const routes = express.Router();
const {
  validateAuthRequest,
} = require("../../../middlewares/v1/user/auth/validateAuthRequest");

const {
  validateAppointmentManagementRequest,
} = require("../../../middlewares/v1/user/manage_appointments");
const { asyncTryCatchMiddleware } = require("../../../middlewares/v1/async");
const authController = require("../../../controllers/v1/user/auth/auth.controller");
const manageAppointmentsController = require("../../../controllers/v1/user/appointments");
const authenticate = require("../../../middlewares/v1/auth");


// -------------------------------AUTHENTICATION------------------------------ //
routes.get("profile", authenticate, validateAuthRequest, asyncTryCatchMiddleware(authController.login));
routes.post("/signup", validateAuthRequest, asyncTryCatchMiddleware(authController.signup));
routes.post("/login", validateAuthRequest, asyncTryCatchMiddleware(authController.login));
routes.post(
  "/verify-email-otp",
  validateAuthRequest,
  asyncTryCatchMiddleware(authController.verifyEmailOtp)
);
routes.post("/forgot-password", validateAuthRequest, asyncTryCatchMiddleware(authController.forgotPassword));
routes.post("/forgot-password-otp", validateAuthRequest, asyncTryCatchMiddleware(authController.forgotPasswordOtp));
routes.post("/change-password", validateAuthRequest, asyncTryCatchMiddleware(authController.changePassword));
routes.post("/update-password", validateAuthRequest, asyncTryCatchMiddleware(authController.updatePassword));
routes.post("/upload", validateAuthRequest, asyncTryCatchMiddleware(authController.forgotPassword));


// -------------------------------MANAGE APPOINTMENTS------------------------------ //
routes.post("/book-therapist", authenticate, validateAppointmentManagementRequest, asyncTryCatchMiddleware(manageAppointmentsController.book_therapist_appointment));
routes.post("/start-session", authenticate, validateAppointmentManagementRequest, asyncTryCatchMiddleware(manageAppointmentsController.start_Session));
routes.post("/cancel-start-session", authenticate, validateAppointmentManagementRequest, asyncTryCatchMiddleware(manageAppointmentsController.cancel_start_Session));
routes.post("/complete-session", authenticate, validateAppointmentManagementRequest, asyncTryCatchMiddleware(manageAppointmentsController.complete_Session));
routes.post("/cancel-complete-session", authenticate, validateAppointmentManagementRequest, asyncTryCatchMiddleware(manageAppointmentsController.cancel_complete_Session));
routes.post("/upgrade-session", authenticate, validateAppointmentManagementRequest, asyncTryCatchMiddleware(manageAppointmentsController.upgrade_Session));
routes.post("/terminate-session", authenticate, validateAppointmentManagementRequest, asyncTryCatchMiddleware(manageAppointmentsController.terminate_Session));

module.exports = routes;
