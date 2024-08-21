const mongoose = require("mongoose");
const { messageConstants } = require("../../../../utils/messageConstants");
const ActiveAppoinment = require("../../../../models/v1/appointments/activeAppointments.model");
const { ModelStrings } = require("../../../../utils/constants");
const {
  createSessions,
  createCustomSessions,
  upgardeSession,
} = require("../../../../global/v1/appointments");
const InActiveAppoinment = require("../../../../models/v1/appointments/inactiveAppointments.model");
let ObjectId = mongoose.Types.ObjectId;

const get_All_Ongoing_Appointments = async (req) => {
  try {
    const authId = new ObjectId(req.id);
    let data = [];
    await ActiveAppoinment.find({
      "outlet_info.oID": authId,
      "appointment_info.type": ModelStrings.outlet,
      "appointment_info.status": ModelStrings.onGoing,
    })
      .select({
        patient_info: 1,
        user_info: 1,
        appointment_info: 1,
      })
      .then((result) => {
        data = result;
      })
      .catch((err) => {
        console.error("err", err);
        // Handle errors here
        return {
          success: false,
          message: messageConstants.serverIssue,
          data: err,
        };
      });
    return {
      success: true,
      message: messageConstants.appointmentsfound,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: messageConstants.serverIssue,
    };
  }
};

const book_outlet_appoitment = async (req) => {
  try {
    let sessiondata = {};
    const oID = new ObjectId(req.oId);
    const spID = new ObjectId(req.spID);
    let user_info = null;
    let outlet_info = {
      oID: oID,
      name: req.oName,
      image: req.oImage,
    };
    let sp_info = {
      spID: spID,
      name: req.spName,
      image: req.spImage,
      type: "Therapist",
    };
    let patient_info = {
      name: req.pName,
      gender: req.gender,
      age: req.age,
      phone: req.phone,
      email: req.email,
    };
    let appointment_info = {
      day: Date(),
      time: Date(),
      status: ModelStrings.onGoing,
      mode: req.mode,
      type: "Outlet",
      issues: req.issues,
      recurrenceType: ModelStrings.session,
      vop: req?.vop,
      specialistObservation: req?.vot,
    };

    if (!req?.sessionRecommended) {
      appointment_info.status = ModelStrings.completed;
      const appointmentDetails = new InActiveAppoinment({
        user_info: user_info,
        outlet_info: outlet_info,
        patient_info: patient_info,
        sp_info: sp_info,
        appointment_info: appointment_info,
      });
      appointmentDetails.save();
      return {
        success: true,
        message: messageConstants.appointmentCompleted,
      };
    }
    try {
      sessiondata = await createSessions(req);
    } catch (sessionError) {
      console.error("Error creating sessions:", sessionError);
      return {
        success: false,
        message: "messageConstants.sessionCreationError",
        error: sessionError,
      };
    }
    const appointmentDetails = new ActiveAppoinment({
      user_info: user_info,
      outlet_info: outlet_info,
      patient_info: patient_info,
      sp_info: sp_info,
      appointment_info: appointment_info,
      current_session_info: sessiondata.currentSessionInfo,
      updated_sessions_records: sessiondata.updatedSessionsRecords,
      sessions_records: sessiondata.sessionsRecords,
    });
    await appointmentDetails.save();

    return {
      success: true,
      message: messageConstants.bookedAppointmentSuccess,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: messageConstants.serverIssue,
    };
  }
};

const get_Active_Appointment_Details = async (req) => {
  try {
    const id = new ObjectId(req.id);
    const activeAppoinments = await ActiveAppoinment.findOne({
      _id: id,
    });

    if (!activeAppoinments) {
      return {
        success: false,
        message: messageConstants.appointmentNotFound,
      };
    }

    return {
      success: true,
      message: messageConstants.appointmentsfound,
      data: activeAppoinments,
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      status: 500,
      message: messageConstants.serverIssue,
    };
  }
};

const complete_Session = async (req) => {
  try {
    const result = await ActiveAppoinment.findOneAndUpdate(
      { _id: req?.aId, "sessions_records._id": req?.sId },
      {
        $set: {
          "sessions_records.$.status": ModelStrings.completed,
          "sessions_records.$.updated_on": new Date(),
        },
        $push: {
          "sessions_records.$.activity_records": {
            type: ModelStrings.outlet,
            result: ModelStrings.completed,
            created_on: new Date(),
          },
        },
      },
      { new: true } // Return the modified document after the update
    );

    if (result) {
      return {
        success: true,
        message: messageConstants.sessionCompleted,
        data: result,
      };
    } else {
      return {
        success: true,
        message: messageConstants.sessionNotExsist,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: messageConstants.serverIssue,
      error: error,
    };
  }
};

const updatedRecords = [
  {
    duration: null, // Provide your value here
    mode: null, // Provide your value here
    time: new Date(), // Provide your value here
    location: null, // Provide your value here
    package_type: null, // Provide your value here
    session_type: null, // Provide your value here
    fees: null, // Provide your value here
    paid_amount: null, // Provide your value here
    attended_by: {
      id: "reqBody.canceled_by.id",
      name: "reqBody.canceled_by.name",
      image: "reqBody.canceled_by.image",
    },
    created_on: new Date(),
  },
  {
    duration: null, // Provide your value here
    mode: null, // Provide your value here
    time: new Date(), // Provide your value here
    location: null, // Provide your value here
    package_type: null, // Provide your value here
    session_type: null, // Provide your value here
    fees: null, // Provide your value here
    paid_amount: null, // Provide your value here
    attended_by: {
      id: "reqBody.canceled_by.id1",
      name: "reqBody.canceled_by.name",
      image: "reqBody.canceled_by.image",
    },
    created_on: new Date(),
  },
];

const cancel_session = async (req) => {
  try {
    console.log("1111");
    const newSession = await createCustomSessions(req);
    // const result = await ActiveAppoinment.findOneAndUpdate(
    //   {
    //     '_id': req?.aId,
    //     'sessions_records._id': { $in: req?.sId },
    //   },
    //   {
    //     $set: { 'sessions_records.$[record].status': ModelStrings.canceled },
    //   },
    //   {
    //     $push: {
    //       'sessions_records': {
    //         $each: updatedRecords,
    //       },
    //     },
    //   },
    //   {
    //     arrayFilters: [{ 'record._id': { $in: req?.sId } }],
    //     new: true,
    //   },
    //   // (err, result) => {
    //   //   if (err) {
    //   //     console.error("Error updating sessions records:", err);
    //   //     // return;
    //   //   }
    //   //   console.log("Sessions records updated and new records added:", result);
    //   // }
    // );

    const result1 = await ActiveAppoinment.updateOne(
      {
        _id: req?.aId,
        "sessions_records._id": { $in: req?.sId },
      },
      { $set: { "sessions_records.$[record].status": ModelStrings.canceled } },
      {
        arrayFilters: [{ "record._id": { $in: req?.sId } }],
        new: true,
      },
      (err, result) => {
        if (err) {
          console.error("Error updating sessions records:", err);
          return;
        }
        console.log("Sessions records updated:", result);
      }
    );

    // Push new array of objects inside sessions_records
    const result2 = await ActiveAppoinment.updateOne(
      {
        _id: req?.aId,
        "sessions_records._id": { $in: req?.sId },
      },
      {
        $push: {
          sessions_records: {
            $each: updatedRecords,
          },
        },
      },
      {
        arrayFilters: [{ "record._id": { $in: req?.sId } }],
        new: true,
      },
      (err, result) => {
        if (err) {
          console.error("Error pushing activity record:", err);
          return;
        }
        console.log("Activity record pushed:", result);
      }
    );

    if (result1) {
      return {
        success: true,
        message: messageConstants.sessionCanceled,
        data: result1,
      };
    } else {
      return {
        success: true,
        message: messageConstants.sessionNotExsist,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: messageConstants.serverIssue,
      error: error,
    };
  }
};

const upgrade_Session = async (req) => {
  try {
    let sessiondata;
    try {
      sessiondata = await upgardeSession(req);
    } catch (sessionError) {
      console.error("Error creating sessions:", sessionError);
      return {
        success: false,
        message: "messageConstants.sessionCreationError",
        error: sessionError,
      };
    }
    const authId = new ObjectId(req?.aId);
    const result = await ActiveAppoinment.findOneAndUpdate(
      { _id: authId },
      {
        $set: {
          current_session_info: sessiondata.currentSessionInfo,
        },
        $push: {
          sessions_records: sessiondata.sessionsRecords,
          updated_sessions_records: sessiondata.updatedSessionsRecords,
        },
      },
      { new: true }
    );

    if (result) {
      return {
        success: true,
        message: messageConstants.sessionUpgraded,
        data: result,
      };
    } else {
      return {
        success: true,
        message: messageConstants.sessionUpgradedFailed,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: messageConstants.serverIssue,
      error: error,
    };
  }
};

module.exports = {
  get_All_Ongoing_Appointments,
  book_outlet_appoitment,
  get_Active_Appointment_Details,
  complete_Session,
  cancel_session,
  upgrade_Session,
};
