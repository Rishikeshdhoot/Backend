const { validateJoiSchema } = require("../../../../utils/helper");
const userValidation = require("../../../../validations/v1/auth");

module.exports.validateAuthRequest = async (req, res, next) => {
  const url = req.originalUrl.replace("/api/v1/doctor/", "");
  switch (url) {
    case "signup":
      validateJoiSchema(userValidation.signupSchema, req, res, next);
      break;
    case "login":
      validateJoiSchema(userValidation.loginSchema, req, res, next);
      break;
    case "verify-email-otp":
      validateJoiSchema(userValidation.verifyEmailOtp, req, res, next);
      break;
    case "forgot-password":
      validateJoiSchema(userValidation.verifyForgotPassword, req, res, next);
      break;
    case "forgot-password-otp":
      validateJoiSchema(userValidation.verifyForgotPasswordOtp, req, res, next);
      break;
    case "change-password":
      validateJoiSchema(userValidation.changePassword, req, res, next);
      break;
    case "update-password":
      validateJoiSchema(userValidation.updatePassword, req, res, next);
      break;
    default:
      next();
      break;
  }
};
