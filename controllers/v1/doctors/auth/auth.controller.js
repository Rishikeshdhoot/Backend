const Doctor = require("../../../../models/v1/doctor/auth/auth.model");
const doctorService = require("../../../../services/v1/doctor/auth/doctor.auth.service");
const { messageConstants } = require("../../../../utils/messageConstants");
const helper = require("../../../../utils/helper");

const signup = async (req, res) => {
  const emailExists = await Doctor.findOne({ email: req.body.email });
  if (emailExists) {
    return helper.responseError(res, messageConstants.emailAlreadyExists);
  }
  await doctorService.signup(req.body);

  return helper.responseOk(res, messageConstants.signupSuccess);
};

const verifyEmailOtp = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;
  const isVerified = await doctorService.verifyEmailOtp(otp, email);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const login = async (req, res) => {
  const isLoggedIn = await doctorService.login(
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
  const isVerified = await doctorService.forgotPassword(email);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const forgotPasswordOtp = async (req, res) => {
  const isVerified = await doctorService.forgotPasswordOtp(req.body.email, req.body.otp);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const changePassword = async (req, res) => {
  const isVerified = await doctorService.changePassword(req.body);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

const updatePassword = async (req, res) => {
  const isVerified = await doctorService.updatePassword(req.body);
  if (!isVerified.success) return helper.responseError(res, isVerified.message);
  return helper.responseOk(res, isVerified.message);
};

module.exports = {
  login,
  signup,
  verifyEmailOtp,
  forgotPassword,
  forgotPasswordOtp,
  changePassword,
  updatePassword
};