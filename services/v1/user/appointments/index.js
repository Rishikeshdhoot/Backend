const { ObjectId } = require("mongodb");
const { messageConstants } = require("../../../../utils/messageConstants");
const ActiveAppoinment = require("../../../../models/v1/appointments/activeAppointments.model");
const manageSlotsServiceTherapsit = require("../../therapist/manage_slots");
const { ModelStrings } = require("../../../../utils/constants");
const moment = require("moment");
const { strings } = require("../../../../utils/strings");
const InActiveAppoinment = require("../../../../models/v1/appointments/inactiveAppointments.model");
const { upgardeSession } = require("../../../../global/v1/appointments");


const book_therapist_appointment = async (appointmentData, slotData) => {
  try {
    const result = await manageSlotsServiceTherapsit.book_appoitment(slotData);
    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }
    const authID = new ObjectId(appointmentData?.uId);
    const spID = new ObjectId(slotData.spId);

    let user_info = {
      uID: authID,
      name: appointmentData.uName,
      image: appointmentData.uImage,
    };
    let sp_info = {
      spID: spID,
      name: appointmentData.spName,
      image: appointmentData.spImage,
      type: "Therapist",
    };
    let patient_info = {
      name: appointmentData.pName,
      gender: appointmentData.gender,
      age: appointmentData.age,      
      description: appointmentData.description,
    };
    let appointment_info = {
      day: appointmentData.day,
      time: appointmentData.time,
      status: "Upcoming",
      issues: appointmentData.issues,
      mode: appointmentData.mode,
    };

    const appointmentDetails = new ActiveAppoinment({
      user_info: user_info,
      sp_info: sp_info,
      patient_info: patient_info,
      appointment_info: appointment_info,
    });
    await appointmentDetails.save();

    return {
      success: true,
      message: messageConstants.bookedAppointmentSuccess,
    };
  } catch (error) {
    return {
      success: false,
      message: messageConstants.serverIssue,
      error: error,
    };
  }
};

const start_Session = async (req) => {
  try {
    const result = await ActiveAppoinment.findOneAndUpdate(
      { _id: req?.aId, 'sessions_records._id': req?.sId },
      {
        $set: {
          'sessions_records.$.status': ModelStrings.onGoing,
          'sessions_records.$.updated_on': new Date()
        },
        $push: {
          'sessions_records.$.activity_records': {
            type: ModelStrings.user,
            result: ModelStrings.onGoing,
            created_on: new Date()
          }
        }
      },
      { new: true } // Return the modified document after the update
    );

    if (result) {
      return {
        success: true,
        message: messageConstants.sessionBegin,
        data: result
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

const cancel_start_Session = async (req) => {
  try {
    const result = await ActiveAppoinment.findOneAndUpdate(
      { _id: req?.aId, 'sessions_records._id': req?.sId },
      {
        $set: {
          'sessions_records.$.status': ModelStrings.upcoming,
          'sessions_records.$.updated_on': new Date(),
          'sessions_records.$.start_time': null
        },
        $push: {
          'sessions_records.$.activity_records': {
            type: ModelStrings.user,
            result: ModelStrings.cancelBegining,
            created_on: new Date()
          }
        }
      },
      { new: true } // Return the modified document after the update
    );

    if (result) {
      return {
        success: true,
        message: messageConstants.sessionBeginCanceled,
        data: result
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

const complete_Session = async (req) => {
  try {
    const result = await ActiveAppoinment.findOneAndUpdate(
      { _id: req?.aId, 'sessions_records._id': req?.sId },
      {
        $set: {
          'sessions_records.$.status': ModelStrings.completed,
          'sessions_records.$.updated_on': new Date(),
        },
        $push: {
          'sessions_records.$.activity_records': {
            type: ModelStrings.user,
            result: ModelStrings.completed,
            created_on: new Date()
          }
        }
      },
      { new: true } // Return the modified document after the update
    );


    if (result) {
      return {
        success: true,
        message: messageConstants.sessionCompleted,
        data: result
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

const cancel_complete_Session = async (req) => {
  try {
    const result = await ActiveAppoinment.findOneAndUpdate(
      { _id: req?.aId, 'sessions_records._id': req?.sId },
      {
        $set: {
          'sessions_records.$.status': ModelStrings.onGoing,
          'sessions_records.$.updated_on': new Date(),
          'sessions_records.$.end_time': null,
        },
        $push: {
          'sessions_records.$.activity_records': {
            type: ModelStrings.user,
            result: ModelStrings.cancelComplete,
            created_on: new Date()
          }
        }
      },
      { new: true } // Return the modified document after the update
    );


    if (result) {
      return {
        success: true,
        message: messageConstants.sessionCompletedCanceled,
        data: result
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
    const result = await ActiveAppoinment.findOneAndUpdate(
      { _id: req?.aId },
      {
        $set: {
          'current_session_info': sessiondata.currentSessionInfo,
        },
        $push: {
          'sessions_records': sessiondata.sessionsRecords,
          'updated_sessions_records': sessiondata.updatedSessionsRecords
        }
      },
      { new: true }
    );


    if (result) {
      return {
        success: true,
        message: messageConstants.sessionUpgraded,
        data: result
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

const terminate_Session = async (req) => {
  try {
    const appointment = await ActiveAppoinment.findByIdAndDelete(req?.aId);
    if (!appointment) {
      // Handle case when no appointment is found with the given _id
      console.log("Appointment not found");
      return;
    }
    appointment.sessions_records.forEach((session) => {
      if (session.status === strings.upcoming) {
        session.status = ModelStrings.terminated;
      }
    });
    appointment.status = ModelStrings.terminated;
    const inactiveAppointments = new InActiveAppoinment({
      user_info: appointment?.user_info,
      sp_info: appointment?.sp_info,
      patient_info: appointment?.patient_info,
      appointment_info: appointment?.appointment_info,
      current_session_info: appointment?.current_session_info,
      updated_sessions_records: appointment?.updated_sessions_records,
      sessions_records: appointment?.sessions_records,
      created_at: Date(),
      updated_at: Date(),
    });
    await inactiveAppointments.save()
    return {
      success: true,
      message: messageConstants.sessionTerminated,
    };

  } catch (error) {
    return {
      success: false,
      message: messageConstants.serverIssue,
      error: error,
    };
  }
};

module.exports = {
  book_therapist_appointment,
  start_Session,
  cancel_start_Session,
  complete_Session,
  cancel_complete_Session,
  upgrade_Session,
  terminate_Session
};
