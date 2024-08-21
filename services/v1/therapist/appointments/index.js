const moment = require("moment");
const mongoose = require("mongoose");
const { strings } = require("../../../../utils/strings");
const { messageConstants } = require("../../../../utils/messageConstants");
const ActiveAppoinment = require("../../../../models/v1/appointments/activeAppointments.model");
const InActiveAppoinment = require("../../../../models/v1/appointments/inactiveAppointments.model");
const { ModelStrings } = require("../../../../utils/constants");
const { createCustomSessions, createSessions } = require("../../../../global/v1/appointments");
let ObjectId = mongoose.Types.ObjectId;

const get_InPerson_Booking_upcoming = async (req) => {
  try {
    const authId = new ObjectId(req.id);
    let data = [];
    await ActiveAppoinment.find({
      "sp_info.spID": authId,
      "appointment_info.status": strings.upcoming,
      "appointment_info.mode": strings.atclinic,
      "appointment_info.day": {
        $gte: new Date(
          `${new Date().toISOString().split("T")[0]}T00:00:00.000Z`
        ),
        $lt: new Date(
          `${new Date().toISOString().split("T")[0]}T23:59:59.999Z`
        ),
      },
      "appointment_info.time": {
        $gte: `${moment().format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`,
      },
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
    console.error("error (get_InPerson_Booking)", error);
    return {
      success: false,
      status: 500,
      message: messageConstants.serverIssue,
    };
  }
};

const get_Virtual_Booking_upcoming = async (req) => {
  try {
    const authId = new ObjectId(req.id);
    let data = [];
    await ActiveAppoinment.find({
      "sp_info.spID": authId,
      "appointment_info.status": strings.upcoming,
      "appointment_info.mode": strings.athome,
      "appointment_info.day": {
        $gte: new Date(
          `${new Date().toISOString().split("T")[0]}T00:00:00.000Z`
        ),
        $lt: new Date(
          `${new Date().toISOString().split("T")[0]}T23:59:59.999Z`
        ),
      },
      "appointment_info.time": {
        $gte: `${moment().format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`,
      },
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

    return {
      success: true,
      message: messageConstants.appointmentsfound,
      data: filteredAppointments,
    };
  } catch (error) {
    console.error("error (get_Virtual_Booking_upcoming)", error);
    return {
      success: false,
      status: 500,
      message: messageConstants.serverIssue,
    };
  }
};

const get_All_Booking_upcoming = async (req) => {
  try {
    const authId = new ObjectId(req.id);
    let data = [];
    await ActiveAppoinment.find({
      "sp_info.spID": authId,
      "appointment_info.status": strings.upcoming,
      "appointment_info.day": {
        $gte: `${moment().format("YYYY-MM-DD")}T00:00:00.000Z`,
      },
      "appointment_info.time": {
        $gte: `${moment().format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`,
      },
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
    console.error("error (get_All_Booking_upcoming)", error);
    return {
      success: false,
      status: 500,
      message: messageConstants.serverIssue,
    };
  }
};

const get_Current_Booking_upcoming = async (req) => {
  try {
    const authId = new ObjectId(req.id);
    let data = [];
    await ActiveAppoinment.find({
      "sp_info.spID": authId,
      "appointment_info.status": strings.upcoming,
      "appointment_info.day": {
        $gte: `${moment().format("YYYY-MM-DD")}T00:00:00.000Z`,
      },
      "appointment_info.time": {
        $gte: `${moment().format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`,
      },
    })
      .select({
        // patient_info: 1,
        // user_info: 1,
        appointment_info: 1,
      })
      .sort({
        "appointment_info.day": 1, // Sort by day in ascending order
        "appointment_info.time": 1, // Sort by time in ascending order
      })
      .limit(1)
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
    console.error("error (get_All_Booking_upcoming)", error);
    return {
      success: false,
      status: 500,
      message: messageConstants.serverIssue,
    };
  }
};

const get_Upcoming_Appointment_Details = async (req) => {
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
    console.error("error (get_Upcoming_Appointment_Details)", error);
    return {
      success: false,
      status: 500,
      message: messageConstants.serverIssue,
    };
  }
};

const cancel_Appointments = async (req) => {
  try {
    const activeAppoinments = await ActiveAppoinment.find({
      _id: { $in: req?.aId },
    });

    if (!activeAppoinments) {
      return {
        success: false,
        message: messageConstants.appointmentNotFound,
      };
    }

    const cancellationDetails = activeAppoinments.map((activeAppointment) => {
      const newAId = new ObjectId();

      const user_info = {
        uID: activeAppointment?.user_info?.uID,
        name: activeAppointment?.user_info?.name,
        image: activeAppointment?.user_info?.image,
      };

      const sp_info = {
        spID: activeAppointment?.sp_info?.spID,
        name: activeAppointment?.sp_info?.name,
        image: activeAppointment?.sp_info?.image,
        type: "Therapist",
      };
      const patient_info = {
        name: activeAppointment?.patient_info?.name,
        gender: activeAppointment?.patient_info?.gender,
        age: activeAppointment?.patient_info?.age,
        issues: activeAppointment?.patient_info?.issues,
        description: activeAppointment?.patient_info?.description,
      };

      const appointment_info = {
        day: activeAppointment?.appointment_info?.day,
        time: activeAppointment?.appointment_info?.time,
        status: "Canceled",
        mode: activeAppointment?.appointment_info?.mode,
        cancelBy: "Therapist",
        cReason: req.cReason,
      };

      return {
        newAId,
        user_info,
        sp_info,
        patient_info,
        appointment_info,
      };
    });

    const appointmentDetails = cancellationDetails.map(
      (details) =>
        new ActiveAppoinment({
          _id: details.newAId,
          user_info: details.user_info,
          sp_info: details.sp_info,
          patient_info: details.patient_info,
          appointment_info: details.appointment_info,
        })
    );

    const result = await Promise.all([
      ActiveAppoinment.deleteMany({ _id: { $in: req?.aId } }),
      InActiveAppoinment.insertMany(appointmentDetails),
    ]);

    const isSuccessful = result.every((operationResult) => {
      if (!operationResult.modifiedCount) {
        if (typeof operationResult === "object") {
          return operationResult.deletedCount === appointmentDetails.length;
        } else {
          return operationResult?.length === appointmentDetails.length;
        }
      } else {
        return (
          operationResult.modifiedCount > 0 && operationResult.matchedCount > 0
        );
      }
    });

    console.log("isSuccessful", isSuccessful, result);
    if (isSuccessful) {
      return {
        success: true,
        message: messageConstants.appointmentCancelSuccess,
      };
    } else {
      return {
        success: false,
        message: messageConstants.appointmentCancelFailed,
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

const complete_Appointment = async (req) => {
  try {
    const activeAppoinments = await ActiveAppoinment.findOne({
      _id: req?.aId,
    });

    if (!activeAppoinments) {
      return {
        success: false,
        message: messageConstants.appointmentNotFound,
      };
    }

    let sessiondata;
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
    activeAppoinments.current_session_info = sessiondata.currentSessionInfo;
    activeAppoinments.updated_sessions_records.push(...sessiondata.updatedSessionsRecords);
    activeAppoinments.sessions_records.push(...sessiondata.sessionsRecords);
    await activeAppoinments.save();

    return {
      success: true,
      message: messageConstants.appointmentCompleted,
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
          'sessions_records.$.status': ModelStrings.requestToBegin,
          'sessions_records.$.updated_on': new Date(),
          'sessions_records.$.start_time': new Date()
        },
        $push: {
          'sessions_records.$.activity_records': {
            type: ModelStrings.therapist,
            result: ModelStrings.requestToBegin,
            created_on: new Date()
          }
        }
      },
      { new: true } // Return the modified document after the update
    );

    if (result) {
      return {
        success: true,
        message: messageConstants.sessionBeginReq,
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
    const date1 = new Date(req?.start_time);
    const date2 = new Date();
    const timeDifferenceMinutes = Math.abs(date2 - date1) / (1000 * 60);
    let result = []

    if (timeDifferenceMinutes > 44) {
      result = await ActiveAppoinment.findOneAndUpdate(
        { _id: req?.aId, 'sessions_records._id': req?.sId },
        {
          $set: {
            'sessions_records.$.status': ModelStrings.completed,
            'sessions_records.$.updated_on': new Date(),
            'sessions_records.$.end_time': new Date()
          },
          $push: {
            'sessions_records.$.activity_records': {
              type: ModelStrings.therapist,
              result: ModelStrings.completed,
              created_on: new Date()
            }
          }
        },
        { new: true } // Return the modified document after the update
      );
    } else {
      result = await ActiveAppoinment.findOneAndUpdate(
        { _id: req?.aId, 'sessions_records._id': req?.sId },
        {
          $set: {
            'sessions_records.$.status': ModelStrings.requestToEnd,
            'sessions_records.$.updated_on': new Date(),
            'sessions_records.$.end_time': new Date()
          },
          $push: {
            'sessions_records.$.activity_records': {
              type: ModelStrings.therapist,
              result: ModelStrings.requestToEnd,
              created_on: new Date()
            }
          }
        },
        { new: true } // Return the modified document after the update
      );
    }


    if (result) {
      return {
        success: true,
        message: messageConstants.sessionCompletedReq,
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

const cancel_session = async (req) => {
  try {
    const newSession = await createCustomSessions(req)
    const result = await ActiveAppoinment.findOneAndUpdate(
      {
        '_id': req?.aId,
        'sessions_records._id': { $in: req?.sId.map(id => id) },
      },
      {
        $set: { 'sessions_records.$[record].status': ModelStrings.canceled },
      },
      {
        $push: {
          'sessions_records.$.activity_records': {
            $each: newSession,
          },
        },
      },
      {
        arrayFilters: [{ 'record._id': { $in: req?.sId.map(id => id) } }],
        new: true,
      }
    );

    if (result) {
      return {
        success: true,
        message: messageConstants.sessionCanceled,
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

module.exports = {
  get_InPerson_Booking_upcoming,
  get_Virtual_Booking_upcoming,
  get_All_Booking_upcoming,
  get_Current_Booking_upcoming,
  get_Upcoming_Appointment_Details,
  cancel_Appointments,
  complete_Appointment,
  start_Session,
  complete_Session,
  cancel_session
};
