const Outlets = require("../../../../models/v1/outlets/auth.model");
const outletService = require("../../../../services/v1/outlets/auth");
const { messageConstants } = require("../../../../utils/messageConstants");
const helper = require("../../../../utils/helper");

const signup = async (req, res) => {
  const emailExists = await Outlets.findOne({ email: req.body.email });
  if (emailExists) {
    return helper.responseError(res, messageConstants.emailAlreadyExists);
  }
  await outletService.signup(req.body);

  return helper.responseOk(res, messageConstants.outletSuccessTherapist);
};

const verifyEmailOtp = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;
  const isVerified = await outletService.verifyEmailOtp(otp, email);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const login = async (req, res) => {
  const isLoggedIn = await outletService.login(
    req.body.email,
    req.body.password,
    req.body.deviceToken,
    req.body.deviceType
  );
  if (isLoggedIn.success)
    return helper.responseOk(res, isLoggedIn.message, isLoggedIn.data);
  return helper.responseError(res, isLoggedIn.message);
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const isVerified = await outletService.forgotPassword(email);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const forgotPasswordOtp = async (req, res) => {
  const isVerified = await outletService.forgotPasswordOtp(
    req.body.email,
    req.body.otp
  );
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const changePassword = async (req, res) => {
  const isVerified = await outletService.changePassword(req.body);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const updatePassword = async (req, res) => {
  const isVerified = await outletService.updatePassword(req.body);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const registerProfile = async (req, res) => {
  const response = await outletService.registerProfile(req.body);
  if (!response.success) return helper.responseError(res, response.message);
  return helper.responseOk(res, response.message);
};

module.exports = {
  login,
  signup,
  verifyEmailOtp,
  forgotPassword,
  forgotPasswordOtp,
  changePassword,
  updatePassword,
  registerProfile,
};
