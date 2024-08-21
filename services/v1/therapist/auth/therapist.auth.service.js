const { ObjectId } = require("mongodb");
const TherapistAppointmentSlots = require("../../../../models/v1/therapist/appointmentSlots.model");
const Therapist = require("../../../../models/v1/therapist/auth.model");
const helper = require("../../../../utils/helper");
const { messageConstants } = require("../../../../utils/messageConstants");

const login = async (email, password, deviceToken, deviceType) => {
  let therapist = await Therapist.findOne({ email: email });
  if (!therapist)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  const hashCheck = await helper.comparePassword(password, therapist.password);
  if (!hashCheck)
    return { success: false, message: messageConstants.invalidEmailOrPassword };
  if (!helper.isNotNullAndUndefined(therapist.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (therapist.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };
  const token = helper.generateToken({
    deviceToken: deviceToken,
    userId: therapist._id,
  });
  therapist.deviceToken = deviceToken || helper.generateRandomToken();
  therapist.deviceType = deviceType;
  therapist.authToken = token;
  therapist.save();
  return {
    success: true,
    message: messageConstants.loginSuccess,
    data: therapist,
  };
};

const signup = async (input) => {
  let therapist = new Therapist();
  therapist.name = input.name;
  therapist.email = input.email;
  therapist.password = await helper.hashPassword(input.password);
  therapist.deviceType = input.deviceType;
  therapist.deviceToken = input.deviceToken || helper.generateRandomToken();
  therapist.otp = helper.generateOTP();
  await therapist.save();
  // helper.sendEmailVerificationMail(therapist);
  therapist = therapist.toJSON();

  delete therapist.password;
  return therapist;
};

const CreateInventory = async (savedDocument) => {
  try {
    let therapistAppointmentSlots = new TherapistAppointmentSlots();
    therapistAppointmentSlots.authID = savedDocument._id;
    await therapistAppointmentSlots.save();
  } catch (error) {
    console.log("Error (CreateInventory)", error);
  }
};

const verifyEmailOtp = async (otp, email) => {
  const therapist = await Therapist.findOne({ email: email });
  if (therapist.emailVerifiedAt)
    return { success: false, message: messageConstants.emailAlreadyVerified };

  if (true) {
    therapist.emailVerifiedAt = new Date();
    await therapist.save();
    await CreateInventory(therapist);
    return {
      success: true,
      message: messageConstants.emailVerificationSuccess,
    };
  } else {
    return { success: false, message: messageConstants.invalidOtp };
  }
};

const forgotPassword = async (email) => {
  let therapist = await Therapist.findOne({ email: email });
  if (!therapist)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(therapist.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (therapist.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  // therapist.otp = helper.generateOTP();
  therapist.otp = 1234;
  therapist.otpVerified = false;
  // helper.sendEmailVerificationMail(therapist);
  therapist.save();
  delete therapist;
  return {
    success: true,
    message: messageConstants.forgotPasswordOtpShared,
  };
};

const forgotPasswordOtp = async (email, otp) => {
  let therapist = await Therapist.findOne({ email: email });
  if (!therapist)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(therapist.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (therapist.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  // therapist.otp = helper.generateOTP();
  if (therapist.otp === otp) {
    therapist.otpVerified = true;
    therapist.emailVerifiedAt = new Date();
    await therapist.save();
    delete therapist;
    return {
      success: true,
      message: messageConstants.emailVerificationSuccess,
    };
  } else {
    delete therapist;
    return { success: false, message: messageConstants.invalidOtp };
  }
};

const changePassword = async (req) => {
  let therapist = await Therapist.findOne({ email: req.email });
  if (!therapist)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(therapist.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (therapist.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  if (!therapist.otpVerified)
    return { success: false, message: messageConstants.sessionExpired };

  therapist.otpVerified = false;
  therapist.password = await helper.hashPassword(req.password);
  await therapist.save();
  delete therapist;
  return {
    success: true,
    message: messageConstants.passwordChanged,
  };
};

const updatePassword = async (req) => {
  let therapist = await Therapist.findOne({ email: req.email });
  if (!therapist)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  if (!helper.isNotNullAndUndefined(therapist.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (therapist.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  const isPasswordCorrect = await helper.comparePassword(
    req.oldPassword,
    therapist.password
  );
  if (!isPasswordCorrect) {
    return { success: false, message: messageConstants.comparePassword };
  }
  therapist.password = await helper.hashPassword(req.newPassword);
  await therapist.save();
  delete therapist;
  return {
    success: true,
    message: messageConstants.passwordChanged,
  };
};

const registerProfile = async (req) => {
  const authID = new ObjectId(req.authId);
  let therapist = await Therapist.findOne({ _id: authID });
  if (!therapist) return { success: false, message: messageConstants.userNotFound };

  if (!helper.isNotNullAndUndefined(therapist.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (therapist.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };

  therapist.generalInfo = {
    name: req.name,
    gender: req.gender,
    age: req.age,
    profilePic: "",
    coverPic: "",
  };
  therapist.professionalInfo = {
    specialities: req.specialities,
    services: req.services,
    practicingSince: req.practicingSince,
    registrationNumber: req.registrationNumber,
    educations: req.educations,
    we: req.we,
    membership: req.membership,
    vFees: req.vFees,
    cFees: req.cFees,
    aboutSelf: req.aboutSelf,
  };
  therapist.contactInfo = {
    website: req.website,
    state: req.state,
    district: req.district,
    area: req.area,
    pinCode: req.pinCode,
    address: req.address,
  };
  therapist.isRegistred = true;
  therapist.isVerified = true;

  await therapist.save();
  delete therapist;
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
