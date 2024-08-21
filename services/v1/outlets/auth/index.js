const { ObjectId } = require("mongodb");
// const OutletActiveAppoinment = require("../../../../models/v1/outlets/activeAppoinment.models");
// const OutletAppointmentSlots = require("../../../../models/v1/outlets/appointmentSlots.model");
const Outlet = require("../../../../models/v1/outlets/auth.model");
// const OutletInActiveAppoinment = require("../../../../models/v1/outlets/inactiveAppoinment.models");
const helper = require("../../../../utils/helper");
const { messageConstants } = require("../../../../utils/messageConstants");

const login = async (email, password, deviceToken, deviceType) => {
  let outlet = await Outlet.findOne({ email: email });
  if (!outlet)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  const hashCheck = await helper.comparePassword(password, outlet.password);
  if (!hashCheck)
    return { success: false, message: messageConstants.invalidEmailOrPassword };
  if (!helper.isNotNullAndUndefined(outlet.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (outlet.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };
  const token = helper.generateToken({
    deviceToken: deviceToken,
    userId: outlet._id,
  });
  outlet.deviceToken = deviceToken || helper.generateRandomToken();
  outlet.deviceType = deviceType;
  outlet.authToken = token;
  outlet.save();
  return {
    success: true,
    message: messageConstants.loginSuccess,
    data: outlet,
  };
};

const signup = async (input) => {
  let outlet = new Outlet();
  outlet.name = input.name;
  outlet.email = input.email;
  outlet.password = await helper.hashPassword(input.password);
  outlet.deviceType = input.deviceType;
  outlet.deviceToken = input.deviceToken || helper.generateRandomToken();
  outlet.otp = helper.generateOTP();
  await outlet.save();
  // helper.sendEmailVerificationMail(outlet);
  outlet = outlet.toJSON();

  delete outlet.password;
  return outlet;
};

const CreateInventory = async (savedDocument) => {
  try {
    // let outletAppointmentSlots = new OutletAppointmentSlots();
    // outletAppointmentSlots.authID = savedDocument._id;
    // await outletAppointmentSlots.save();
    // let outletActiveAppoinment = new OutletActiveAppoinment();
    // outletActiveAppoinment.authID = savedDocument._id;
    // await outletActiveAppoinment.save();
    // let outletInActiveAppoinment = new OutletInActiveAppoinment();
    // outletInActiveAppoinment.authID = savedDocument._id;
    // await outletInActiveAppoinment.save();
  } catch (error) {
    console.log("Error (CreateInventory)", error);
  }
};

const verifyEmailOtp = async (otp, email) => {
  const outlet = await Outlet.findOne({ email: email });
  if (outlet.emailVerifiedAt)
    return { success: false, message: messageConstants.emailAlreadyVerified };

  if (true) {
    outlet.emailVerifiedAt = new Date();
    await outlet.save();
    await CreateInventory(outlet);
    return {
      success: true,
      message: messageConstants.emailVerificationSuccess,
    };
  } else {
    return { success: false, message: messageConstants.invalidOtp };
  }
};

const forgotPassword = async (email) => {
  let outlet = await Outlet.findOne({ email: email });
  if (!outlet)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(outlet.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (outlet.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  // outlet.otp = helper.generateOTP();
  outlet.otp = 1234;
  outlet.otpVerified = false;
  // helper.sendEmailVerificationMail(outlet);
  outlet.save();
  delete outlet;
  return {
    success: true,
    message: messageConstants.forgotPasswordOtpShared,
  };
};

const forgotPasswordOtp = async (email, otp) => {
  let outlet = await Outlet.findOne({ email: email });
  if (!outlet)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(outlet.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (outlet.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  // outlet.otp = helper.generateOTP();
  if (outlet.otp === otp) {
    outlet.otpVerified = true;
    outlet.emailVerifiedAt = new Date();
    await outlet.save();
    delete outlet;
    return {
      success: true,
      message: messageConstants.emailVerificationSuccess,
    };
  } else {
    delete outlet;
    return { success: false, message: messageConstants.invalidOtp };
  }
};

const changePassword = async (req) => {
  let outlet = await Outlet.findOne({ email: req.email });
  if (!outlet)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(outlet.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (outlet.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  if (!outlet.otpVerified)
    return { success: false, message: messageConstants.sessionExpired };

  outlet.otpVerified = false;
  outlet.password = await helper.hashPassword(req.password);
  await outlet.save();
  delete outlet;
  return {
    success: true,
    message: messageConstants.passwordChanged,
  };
};

const updatePassword = async (req) => {
  let outlet = await Outlet.findOne({ email: req.email });
  if (!outlet)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(outlet.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (outlet.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  const isPasswordCorrect = await helper.comparePassword(
    req.oldPassword,
    outlet.password
  );
  if (!isPasswordCorrect) {
    return { success: false, message: messageConstants.comparePassword };
  }
  outlet.password = await helper.hashPassword(req.newPassword);
  await outlet.save();
  delete outlet;
  return {
    success: true,
    message: messageConstants.passwordChanged,
  };
};

const registerProfile = async (req) => {
  const authID = new ObjectId(req.authId);
  let outlet = await Outlet.findOne({ _id: authID });
  if (!outlet) return { success: false, message: messageConstants.userNotFound };

  if (!helper.isNotNullAndUndefined(outlet.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (outlet.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  outlet.generalInfo = {
    name: req.name,
    profilePic: "",
    coverPic: "",
  };
  outlet.professionalInfo = {
    specialities: req.specialities,
    services: req.services,
    registrationNumber: req.registrationNumber,
    certificates: req.certificates,
    establisedYear: req.establisedYear,
  };
  outlet.contactInfo = {
    website: req.website,
    state: req.state,
    district: req.district,
    area: req.area,
    pinCode: req.pinCode,
    address: req.address,
  };
  outlet.isRegistred = true;
  outlet.isVerified = true;

  await outlet.save();
  delete outlet;
  return {
    success: true,
    message: messageConstants.profileRegister,
  };
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
