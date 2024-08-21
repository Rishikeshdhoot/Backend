const JWT = require("jsonwebtoken");
const { Config } = require("../config");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const moment = require("moment");

module.exports.generateToken = (payload) =>
  JWT.sign(payload, Config.JWT_SECRET);

module.exports.verifyToken = (token) => {
  try {
    return JWT.verify(token, Config.JWT_SECRET);
  } catch (err) {
    return false;
  }
};

module.exports.hashPassword = async (password) =>
  await bcrypt.hash(password, 6);

module.exports.comparePassword = async (rawPassword, hashedPassword) =>
  await bcrypt.compare(rawPassword, hashedPassword);

module.exports.createSuccessResponse = (
  message,
  data = null,
  success = true
) => {
  return { success, message, data };
};

module.exports.createErrorResponse = (
  message,
  data = null,
  success = false
) => {
  return { success, message, data };
};

module.exports.parseToMongoObjectID = (string) =>
  new mongoose.Types.ObjectId(string);

module.exports.isNotNullAndUndefined = (value) =>
  value !== undefined && value !== null && value !== "";

module.exports.stringTONumber = (checkString) =>
  typeof checkString === "string" ? parseInt(checkString) : checkString;

module.exports.escapeSpecialCharacter = (text) => {
  if (text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  } else {
    return "";
  }
};

module.exports.paginateAggregation = (aggregation, limit, offset) => {
  const pages = [{ $skip: offset || 0 }, { $limit: limit }];
  aggregation.push({
    $facet: {
      data: pages,
      totalCount: [{ $count: "count" }],
    },
  });
  return aggregation;
};

module.exports.paginationData = (totalCount, LIMIT = 10, OFFSET = 0) => {
  let totalPages = Math.ceil(totalCount / LIMIT);
  let currentPage = Math.floor(OFFSET / LIMIT);
  let prevPage = currentPage - 1 > 0 ? (currentPage - 1) * LIMIT : 0;
  let nextPage = currentPage + 1 <= totalPages ? (currentPage + 1) * LIMIT : 0;

  return {
    totalCount,
    nextPage,
    prevPage,
    totalCount,
    currentPage: currentPage + 1,
  };
};

module.exports.customErrorHandler = (err, req, res, next) => {
  let code = 500;
  if (err) {
    switch (err.name) {
      case "NotFoundError":
        code = 200;
        message = "Route Not Found";
        break;
      case "JsonWebTokenError":
        code = 400;
        message = "Invaid signature";
        break;
    }
  }

  console.log("====================================");
  console.log(err);
  console.log("====================================");

  res.status(500).send({ success: false, message: err.message });
};

module.exports.validMongooseObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports.generateRandomToken = (length = 32) => {
  const token = crypto.randomBytes(length / 2).toString("hex");
  return token;
};

module.exports.publicFolders = [];

module.exports.validateJoiSchema = (schema, req, res, next) => {
  const payload = req.body;
  const { error, value } = schema.validate(payload, { stripUnknown: true });
  req.body = value;
  if (error) {
    this.responseError(res, error.message);
  } else {
    next();
  }
};

module.exports.responseOk = (res, message, data = null) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

module.exports.responseError = (res, message, data = null, status = 400) => {
  return res.status(status).json({
    success: false,
    message,
    data,
  });
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: Config.EMAIL_USER,
    pass: Config.EMAIL_PASSWORD,
  },
});
module.exports.sendEmailVerificationMail = async (user) => {

  // create the verification link with the token
  const otp = user.otp
  // define the email options
  const mailOptions = {
    from: `Fornax<${Config.EMAIL_USER}>`,
    to: user.email,
    subject: "Email Verification",
    html: fs
      .readFileSync(path.join(__dirname, "../html/verify.email.html"), "utf8")
      .replace("{{ email }}", user.email)
      .replace(/{{OTP}}/g, otp),
  };

  // send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.sendPasswordResetMail = async (user, token) => {
  // create the verification link with the token
  const resetLink = Config.CLIENT_URL + "/changepassword?token=" + token;

  // define the email options
  const mailOptions = {
    from: `Fornax<${Config.EMAIL_USER}>`,
    to: user.email,
    subject: "Reset Password",
    html: fs
      .readFileSync(path.join(__dirname, "../html/reset.password.html"), "utf8")
      .replace("{{ userName }}", user.userName || "user")
      .replace("{{ resetLink }}", resetLink),
  };

  // send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.sendPasswordChangedMail = async (user) => {
  // define the email options
  const mailOptions = {
    from: `Fornax<${Config.EMAIL_USER}>`,
    to: user.email,
    subject: "Password Change",
    html: fs
      .readFileSync(
        path.join(__dirname, "../html/password-changed.html"),
        "utf8"
      )
      .replace("{{ userName }}", user.userName || "user"),
  };

  // send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports.sendAdminPasswordResetMail = async (user, token) => {
  // create the verification link with the token
  const resetLink = Config.ADMIN_URL + "/reset-password/" + token;

  // define the email options
  const mailOptions = {
    from: `Fornax<${Config.EMAIL_USER}>`,
    to: user.email,
    subject: "Password reset link",
    html: fs
      .readFileSync(
        path.join(__dirname, "../html/admin.reset.password.html"),
        "utf8"
      )
      .replace("{{ name }}", "Admin")
      .replace("{{ resetLink }}", resetLink),
  };

  // send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.uuidv4_32 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

exports.generateOTP = (limit = 4) => {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < limit; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}