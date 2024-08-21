const Therapist = require("../../../../models/v1/therapist/auth.model");
const therapistService = require("../../../../services/v1/therapist/auth/therapist.auth.service");
const { messageConstants } = require("../../../../utils/messageConstants");
const helper = require("../../../../utils/helper");

const signup = async (req, res) => {
  const emailExists = await Therapist.findOne({ email: req.body.email });
  if (emailExists) {
    return helper.responseError(res, messageConstants.emailAlreadyExists);
  }
  await therapistService.signup(req.body);

  return helper.responseOk(res, messageConstants.signupSuccessTherapist);
};

const verifyEmailOtp = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;
  const isVerified = await therapistService.verifyEmailOtp(otp, email);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const login = async (req, res) => {
  const isLoggedIn = await therapistService.login(
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
  const isVerified = await therapistService.forgotPassword(email);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const forgotPasswordOtp = async (req, res) => {
  const isVerified = await therapistService.forgotPasswordOtp(
    req.body.email,
    req.body.otp
  );
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const changePassword = async (req, res) => {
  const isVerified = await therapistService.changePassword(req.body);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const updatePassword = async (req, res) => {
  const isVerified = await therapistService.updatePassword(req.body);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const registerProfile = async (req, res) => {
  const response = await therapistService.registerProfile(req.body);
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
