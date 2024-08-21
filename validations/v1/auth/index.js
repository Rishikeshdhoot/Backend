const Joi = require("joi");
const { DeviceTypes } = require("../../../utils/constants");

module.exports.signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  deviceType: Joi.string()
    .valid(...Object.values(DeviceTypes))
    .required(),
  deviceToken: Joi.string().allow(null),
});

module.exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  deviceType: Joi.string()
    .valid(...Object.values(DeviceTypes))
    .required(),
  deviceToken: Joi.string().allow(null),
});

module.exports.verifyEmailOtp = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().required(),
});

module.exports.verifyForgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

module.exports.verifyForgotPasswordOtp = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().required(),
});

module.exports.changePassword = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports.updatePassword = Joi.object({
  email: Joi.string().email().required(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

module.exports.registerProfile = Joi.object({
  authId: Joi.string().required(),
  // profileImage: Joi.object().required(),
  // coverImage: Joi.object().required(),
  name: Joi.string().required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  age: Joi.number().integer().min(0).required(),
  specialities: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
  }).required(),
  services: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
  practicingSince: Joi.number().integer().min(1900).required(),
  registrationNumber: Joi.string().required(),
  educations: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        degree: Joi.string().required(),
        university: Joi.string().required(),
        year: Joi.number().integer().min(1900).required(),
        // media: Joi.object().required(),
      })
    )
    .min(1)
    .required(),
  we: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      position: Joi.string().required(),
      organization: Joi.string().required(),
      year: Joi.number().integer().min(1900).required(),
      // media: Joi.object().required(),
    })
  ),
  membership: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      title: Joi.string().required(),
      organization: Joi.string().required(),
      year: Joi.number().integer().min(1900).required(),
      // media: Joi.object().required(),
    })
  ),
  vFees: Joi.number().required(),
  cFees: Joi.number().required(),
  aboutSelf: Joi.string().required(),
  website: Joi.string(),
  state: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
  }).required(),
  district: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
  }).required(),
  area: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
  }).required(),
  pinCode: Joi.number().integer().min(100000).max(999999).required(),
  address: Joi.string().required(),
});

module.exports.registerProfileOutlet = Joi.object({
  authId: Joi.string().required(),
  // profileImage: Joi.object().required(),
  // coverImage: Joi.object().required(),
  name: Joi.string().required(),
  establisedYear: Joi.number().integer().min(1900).required(),
  specialities: Joi.array()
    .items(Joi.object({
      id: Joi.string().required(),
      title: Joi.string().required(),
    })).min(1).required(),
  services: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
  registrationNumber: Joi.string().required(),
  certificates: Joi.array().items(
    Joi.object({
      // id: Joi.string().required(),
      title: Joi.string().required(),
      organization: Joi.string().required(),
      year: Joi.number().integer().min(1900).required(),
      // media: Joi.object().required(),
    })
  ),
  website: Joi.string(),
  state: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
  }).required(),
  district: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
  }).required(),
  area: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
  }).required(),
  pinCode: Joi.number().integer().min(100000).max(999999).required(),
  address: Joi.string().required(),
});

// module.exports.verifyForgotPassword = Joi.object({
//   edu: Joi.array().required(),
//   membership: Joi.object().required(),
//   // media:
// });
