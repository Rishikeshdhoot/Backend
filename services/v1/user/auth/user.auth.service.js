const User = require("../../../../models/v1/user/auth.model");
const helper = require("../../../../utils/helper");
const { messageConstants } = require("../../../../utils/messageConstants");

const login = async (email, password, deviceToken, deviceType) => {
  let user = await User.findOne({ email: email });
  if (!user)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  const hashCheck = await helper.comparePassword(password, user.password);
  if (!hashCheck)
    return { success: false, message: messageConstants.invalidEmailOrPassword };
  if (!helper.isNotNullAndUndefined(user.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (user.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };
  const token = helper.generateToken({
    deviceToken: deviceToken,
    userId: user._id,
  });
  user.deviceToken = deviceToken || helper.generateRandomToken();
  user.deviceType = deviceType;
  user.authToken = token;
  user.save();
  return { success: true, message: messageConstants.loginSuccess, data: user };
};

const signup = async (input) => {
  let user = new User();
  user.name = input.name;
  user.email = input.email;
  user.password = await helper.hashPassword(input.password);
  user.deviceType = input.deviceType;
  user.deviceToken = input.deviceToken || helper.generateRandomToken();
  // user.otp = helper.generateOTP();
  user.otp = 1234;
  await user.save();
  // helper.sendEmailVerificationMail(user);
  user = user.toJSON();

  delete user.password;
  return user;
};

const verifyEmailOtp = async (otp, email) => {
  const user = await User.findOne({ email: email });
  if (user.emailVerifiedAt)
    return { success: false, message: messageConstants.emailAlreadyVerified };
  // if (user.otp === otp) {
  if (user.otp === 1234) {
    user.emailVerifiedAt = new Date();
    await user.save();
    return {
      success: true,
      message: messageConstants.emailVerificationSuccess,
    };
  } else {
    return { success: false, message: messageConstants.invalidOtp };
  }
};

const forgotPassword = async (email) => {
  let user = await User.findOne({ email: email });
  if (!user)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(user.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (user.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  // user.otp = helper.generateOTP();
  user.otp = 1234;
  user.otpVerified = false;
  // helper.sendEmailVerificationMail(user);
  user.save()
  delete user;
  return {
    success: true,
    message: messageConstants.forgotPasswordOtpShared,
  };
};

const forgotPasswordOtp = async (email, otp) => {
  let user = await User.findOne({ email: email });
  if (!user)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(user.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (user.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  // user.otp = helper.generateOTP();
  if (user.otp === otp) {
    user.otpVerified = true;
    user.emailVerifiedAt = new Date();
    await user.save();
    delete user;
    return {
      success: true,
      message: messageConstants.emailVerificationSuccess,
    };
  } else {
    delete user;
    return { success: false, message: messageConstants.invalidOtp };
  }
};

const changePassword = async (req) => {
  let user = await User.findOne({ email: req.email });
  if (!user)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(user.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (user.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  if (!user.otpVerified)
    return { success: false, message: messageConstants.sessionExpired };

  user.otpVerified = false;
  user.password = await helper.hashPassword(req.password);
  await user.save();
  delete user;
  return {
    success: true,
    message: messageConstants.passwordChanged,
  };
};

const updatePassword = async (req) => {
  let user = await User.findOne({ email: req.email });
  if (!user)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(user.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (user.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  const isPasswordCorrect = await helper.comparePassword(req.oldPassword, user.password);
  if (!isPasswordCorrect) {
    return { success: false, message: messageConstants.comparePassword };
  }
  user.password = await helper.hashPassword(req.newPassword);
  await user.save();
  delete user;
  return {
    success: true,
    message: messageConstants.passwordChanged,
  };
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
