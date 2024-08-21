const DoctorAuth = require("../../../../models/v1/doctor/auth.model");
const helper = require("../../../../utils/helper");
const { messageConstants } = require("../../../../utils/messageConstants");

const login = async (email, password, deviceToken, deviceType) => {
  let doctor = await DoctorAuth.findOne({ email: email });
  if (!doctor)
    return { success: false, message: messageConstants.invalidEmailOrPassword };

  const hashCheck = await helper.comparePassword(password, doctor.password);
  if (!hashCheck)
    return { success: false, message: messageConstants.invalidEmailOrPassword };
  if (!helper.isNotNullAndUndefined(doctor.emailVerifiedAt))
    return { success: false, message: messageConstants.emailNotVerified };

  if (doctor.isBlocked)
    return { success: false, message: messageConstants.accountBlocked };
  const token = helper.generateToken({
    deviceToken: deviceToken,
    userId: doctor._id,
  });
  doctor.deviceToken = deviceToken || helper.generateRandomToken();
  doctor.deviceType = deviceType;
  doctor.authToken = token;
  doctor.save();
  return {
    success: true,
    message: messageConstants.loginSuccess,
    data: doctor,
  };
};

const signup = async (input) => {
  let doctor = new DoctorAuth();
  doctor.name = input.name;
  doctor.email = input.email;
  doctor.password = await helper.hashPassword(input.password);
  doctor.deviceType = input.deviceType;
  doctor.deviceToken = input.deviceToken || helper.generateRandomToken();
  doctor.otp = helper.generateOTP();
  await doctor.save();
  // helper.sendEmailVerificationMail(doctor);
  doctor = doctor.toJSON();

  delete doctor.password;
  return doctor;
};

// const CreateInventory = async (savedDocument) => {
//   try {
//     let therapistAppointmentSlots = new TherapistAppointmentSlots();
//     therapistAppointmentSlots.authID = savedDocument._id
//     await therapistAppointmentSlots.save();
//     let therapistBookedAppoinment = new TherapistBookedAppoinment();
//     therapistBookedAppoinment.authID = savedDocument._id
//     await therapistBookedAppoinment.save();
//     let therapistCompletedOrCanceledAppoinment = new TherapistCompletedOrCanceledAppoinment();
//     therapistCompletedOrCanceledAppoinment.authID = savedDocument._id
//     await therapistCompletedOrCanceledAppoinment.save();
//     let therapistPayment = new TherapistPayment();
//     therapistPayment.authID = savedDocument._id
//     await therapistPayment.save();
//     let therapistFeedback = new TherapistFeedback();
//     therapistFeedback.authID = savedDocument._id
//     await therapistFeedback.save();
//     let therapistOnGoingSession = new TherapistOnGoingSession();
//     therapistOnGoingSession.authID = savedDocument._id
//     await therapistOnGoingSession.save();
//     let therapistSessionRecords = new TherapistSessionRecords();
//     therapistSessionRecords.authID = savedDocument._id
//     await therapistSessionRecords.save();
//   } catch (error) {
//     console.log("Error (CreateInventory)", error);
//   }
// }

const verifyEmailOtp = async (otp, email) => {
  const doctor = await DoctorAuth.findOne({ email: email });
  if (doctor.emailVerifiedAt)
    return { success: false, message: messageConstants.emailAlreadyVerified };

  if (user.otp === 1234) {
    doctor.emailVerifiedAt = new Date();
    await user.save();
    await CreateInventory(savedDocument);
    return {
      success: true,
      message: messageConstants.emailVerificationSuccess,
    };
  } else {
    return { success: false, message: messageConstants.invalidOtp };
  }
};

const forgotPassword = async (email) => {
  let user = await DoctorAuth.findOne({ email: email });
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
  let user = await DoctorAuth.findOne({ email: email });
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
  let user = await DoctorAuth.findOne({ email: req.email });
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
  let user = await DoctorAuth.findOne({ email: req.email });
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
