const TherapistAppointmentSlots = require("../../../../models/v1/therapist/appointmentSlots.model");
const moment = require("moment");
const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;

const CalculateTime = async (req) => {
  try {
    const {
      start_from,
      end_till,
      special_day,
      day_off,
      break_type,
      type,
      interval_after,
      interval_for,
      break_time,
      duration,
      morning_shift,
      afternoon_shift,
      evening_shift,
      night_shift,
    } = req;

    let currentDate = new Date(start_from);
    let endDate = new Date(end_till);
    const Appoinment_List = [];
    while (currentDate <= endDate) {
      if (day_off.includes(moment(currentDate).format("dddd"))) {
        Appoinment_List.push({
          _id: new ObjectId(),
          day: new Date(currentDate),
          type: type,
          morningSlots: [],
          afternoonSlots: [],
          eveningSlots: [],
          nightSlots: [],
          created_at: new Date(),
          updated_at: new Date(),
        });
        // currentDate.setDate(currentDate.getDate() + 1);
      } else if (special_day.includes(moment(currentDate).format("dddd"))) {
        let mSlots = [];
        let aSlots = [];
        let eSlots = [];
        let nSlots = [];
        for (let key in req) {
          if (
            [
              "morning_shift",
              "evening_shift",
              "afternoon_shift",
              "night_shift",
            ].includes(key)
          ) {
            if (key === "morning_shift") {
              mSlots = [];
              if (morning_shift.isSpecial === true) {
                if (break_type === "After Certain Appoinment") {
                  let count = 1;
                  const dateStr = morning_shift.special_start.split("T")[0];
                  const startTime = moment(morning_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(morning_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    if (count > interval_after) {
                      currentTime.add(interval_for, "minutes");
                      count = 1;
                    } else {
                      mSlots.push({
                        _id: new ObjectId(),
                        time: `${moment(currentDate).format(
                          "YYYY-MM-DD"
                        )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                        status: "Available",
                      });
                      currentTime.add(duration, "minutes");
                      count = count + 1;
                    }
                  }
                } else if (break_type === "After Every Appoinment") {
                  const dateStr = morning_shift.special_start.split("T")[0];
                  const startTime = moment(morning_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(morning_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    mSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration + break_time, "minutes");
                  }
                } else if (break_type === "Both options") {
                  let count = 1;
                  const dateStr = morning_shift.special_start.split("T")[0];
                  const startTime = moment(morning_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(morning_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    if (count > interval_after) {
                      currentTime.add(interval_for, "minutes");
                      count = 1;
                    } else {
                      mSlots.push({
                        _id: new ObjectId(),
                        time: `${moment(currentDate).format(
                          "YYYY-MM-DD"
                        )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                        status: "Available",
                      });
                      currentTime.add(duration + break_time, "minutes");
                      count = count + 1;
                    }
                  }
                } else {
                  const dateStr = morning_shift.special_start.split("T")[0];
                  const startTime = moment(morning_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(morning_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    mSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration, "minutes");
                  }
                }
              }
            } else if (key === "afternoon_shift") {
              aSlots = [];
              if (afternoon_shift.isSpecial === true) {
                if (break_type === "After Certain Appoinment") {
                  let count = 1;
                  const dateStr = afternoon_shift.special_start.split("T")[0];
                  const startTime = moment(
                    afternoon_shift.special_start
                  ).format("HH:mm");
                  const endTime = moment(afternoon_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    if (count > interval_after) {
                      currentTime.add(interval_for, "minutes");
                      count = 1;
                    } else {
                      aSlots.push({
                        _id: new ObjectId(),
                        time: `${moment(currentDate).format(
                          "YYYY-MM-DD"
                        )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                        status: "Available",
                      });
                      currentTime.add(duration, "minutes");
                      count = count + 1;
                    }
                  }
                } else if (break_type === "After Every Appoinment") {
                  const dateStr = afternoon_shift.special_start.split("T")[0];
                  const startTime = moment(
                    afternoon_shift.special_start
                  ).format("HH:mm");
                  const endTime = moment(afternoon_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    aSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration + break_time, "minutes");
                  }
                } else if (break_type === "Both options") {
                  let count = 1;
                  const dateStr = afternoon_shift.special_start.split("T")[0];
                  const startTime = moment(
                    afternoon_shift.special_start
                  ).format("HH:mm");
                  const endTime = moment(afternoon_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    if (count > interval_after) {
                      currentTime.add(interval_for, "minutes");
                      count = 1;
                    } else {
                      aSlots.push({
                        _id: new ObjectId(),
                        time: `${moment(currentDate).format(
                          "YYYY-MM-DD"
                        )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                        status: "Available",
                      });
                      currentTime.add(duration + break_time, "minutes");
                      count = count + 1;
                    }
                  }
                } else {
                  const dateStr = afternoon_shift.special_start.split("T")[0];
                  const startTime = moment(
                    afternoon_shift.special_start
                  ).format("HH:mm");
                  const endTime = moment(afternoon_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    aSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration, "minutes");
                  }
                }
              }
            } else if (key === "evening_shift") {
              eSlots = [];
              if (evening_shift.isSpecial === true) {
                if (break_type === "After Certain Appoinment") {
                  let count = 1;
                  const dateStr = evening_shift.special_start.split("T")[0];
                  const startTime = moment(evening_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(evening_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    if (count > interval_after) {
                      currentTime.add(interval_for, "minutes");
                      count = 1;
                    } else {
                      eSlots.push({
                        _id: new ObjectId(),
                        time: `${moment(currentDate).format(
                          "YYYY-MM-DD"
                        )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                        status: "Available",
                      });
                      currentTime.add(duration, "minutes");
                      count = count + 1;
                    }
                  }
                } else if (break_type === "After Every Appoinment") {
                  const dateStr = evening_shift.special_start.split("T")[0];
                  const startTime = moment(evening_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(evening_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    eSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration + break_time, "minutes");
                  }
                } else if (break_type === "Both options") {
                  let count = 1;
                  const dateStr = evening_shift.special_start.split("T")[0];
                  const startTime = moment(evening_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(evening_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    if (count > interval_after) {
                      currentTime.add(interval_for, "minutes");
                      count = 1;
                    } else {
                      eSlots.push({
                        _id: new ObjectId(),
                        time: `${moment(currentDate).format(
                          "YYYY-MM-DD"
                        )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                        status: "Available",
                      });
                      currentTime.add(duration + break_time, "minutes");
                      count = count + 1;
                    }
                  }
                } else {
                  const dateStr = evening_shift.special_start.split("T")[0];
                  const startTime = moment(evening_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(evening_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    eSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration, "minutes");
                  }
                }
              }
            } else if (key === "night_shift") {
              nSlots = [];
              if (night_shift.isSpecial === true) {
                if (break_type === "After Certain Appoinment") {
                  let count = 1;
                  const dateStr = night_shift.special_start.split("T")[0];
                  const startTime = moment(night_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(night_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    if (count > interval_after) {
                      currentTime.add(interval_for, "minutes");
                      count = 1;
                    } else {
                      nSlots.push({
                        _id: new ObjectId(),
                        time: `${moment(currentDate).format(
                          "YYYY-MM-DD"
                        )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                        status: "Available",
                      });
                      currentTime.add(duration, "minutes");
                      count = count + 1;
                    }
                  }
                } else if (break_type === "After Every Appoinment") {
                  const dateStr = night_shift.special_start.split("T")[0];
                  const startTime = moment(night_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(night_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    nSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration + break_time, "minutes");
                  }
                } else if (break_type === "Both options") {
                  let count = 1;
                  const dateStr = night_shift.special_start.split("T")[0];
                  const startTime = moment(night_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(night_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    if (count > interval_after) {
                      currentTime.add(interval_for, "minutes");
                      count = 1;
                    } else {
                      nSlots.push({
                        _id: new ObjectId(),
                        time: `${moment(currentDate).format(
                          "YYYY-MM-DD"
                        )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                        status: "Available",
                      });
                      currentTime.add(duration + break_time, "minutes");
                      count = count + 1;
                    }
                  }
                } else {
                  const dateStr = night_shift.special_start.split("T")[0];
                  const startTime = moment(night_shift.special_start).format(
                    "HH:mm"
                  );
                  const endTime = moment(night_shift.special_till).format(
                    "HH:mm"
                  );
                  const startDateTime = moment(`${dateStr}T${startTime}:00`);
                  const endDateTime = moment(`${dateStr}T${endTime}:00`);
                  let currentTime = startDateTime.clone();
                  while (currentTime.isSameOrBefore(endDateTime)) {
                    nSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration, "minutes");
                  }
                }
              }
            }
          }
        }
        Appoinment_List.push({
          _id: new ObjectId(),
          day: new Date(currentDate),
          type: type,
          morningSlots: mSlots,
          afternoonSlots: aSlots,
          eveningSlots: eSlots,
          nightSlots: nSlots,
          created_at: new Date(),
          updated_at: new Date(),
        });
        // currentDate.setDate(currentDate.getDate() + 1);
      } else {
        let mSlots = [];
        let aSlots = [];
        let eSlots = [];
        let nSlots = [];
        for (let key in req) {
          if (
            [
              "morning_shift",
              "evening_shift",
              "afternoon_shift",
              "night_shift",
            ].includes(key)
          ) {
            if (key === "morning_shift") {
              mSlots = [];
              if (break_type === "After Certain Appoinment") {
                let count = 1;
                const dateStr = morning_shift.start.split("T")[0];
                const startTime = moment(morning_shift.start).format("HH:mm");
                const endTime = moment(morning_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  if (count > interval_after) {
                    currentTime.add(interval_for, "minutes");
                    count = 1;
                  } else {
                    mSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration, "minutes");
                    count = count + 1;
                  }
                }
              } else if (break_type === "After Every Appoinment") {
                const dateStr = morning_shift.start.split("T")[0];
                const startTime = moment(morning_shift.start).format("HH:mm");
                const endTime = moment(morning_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  mSlots.push({
                    _id: new ObjectId(),
                    time: `${moment(currentDate).format("YYYY-MM-DD")}T${moment
                      .utc(currentTime)
                      .format("HH:mm:ss.SSS")}Z`,

                    status: "Available",
                  });
                  currentTime.add(duration + break_time, "minutes");
                }
              } else if (break_type === "Both options") {
                let count = 1;
                const dateStr = morning_shift.start.split("T")[0];
                const startTime = moment(morning_shift.start).format("HH:mm");
                const endTime = moment(morning_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  if (count > interval_after) {
                    currentTime.add(interval_for, "minutes");
                    count = 1;
                  } else {
                    console.log(
                      new Date(currentTime),
                      "currentTime",
                      currentTime,
                      moment(currentTime)
                    );
                    mSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration + break_time, "minutes");
                    count = count + 1;
                  }
                }
              } else {
                const dateStr = morning_shift.start.split("T")[0];
                const startTime = moment(morning_shift.start).format("HH:mm");
                const endTime = moment(morning_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  mSlots.push({
                    _id: new ObjectId(),
                    time: `${moment(currentDate).format("YYYY-MM-DD")}T${moment
                      .utc(currentTime)
                      .format("HH:mm:ss.SSS")}Z`,
                    status: "Available",
                  });
                  currentTime.add(duration, "minutes");
                }
              }
            } else if (key === "afternoon_shift") {
              aSlots = [];
              if (break_type === "After Certain Appoinment") {
                let count = 1;
                const dateStr = afternoon_shift.start.split("T")[0];
                const startTime = moment(afternoon_shift.start).format("HH:mm");
                const endTime = moment(afternoon_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  if (count > interval_after) {
                    currentTime.add(interval_for, "minutes");
                    count = 1;
                  } else {
                    aSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration, "minutes");
                    count = count + 1;
                  }
                }
              } else if (break_type === "After Every Appoinment") {
                const dateStr = afternoon_shift.start.split("T")[0];
                const startTime = moment(afternoon_shift.start).format("HH:mm");
                const endTime = moment(afternoon_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  aSlots.push({
                    _id: new ObjectId(),
                    time: `${moment(currentDate).format("YYYY-MM-DD")}T${moment
                      .utc(currentTime)
                      .format("HH:mm:ss.SSS")}Z`,

                    status: "Available",
                  });
                  currentTime.add(duration + break_time, "minutes");
                }
              } else if (break_type === "Both options") {
                let count = 1;
                const dateStr = afternoon_shift.start.split("T")[0];
                const startTime = moment(afternoon_shift.start).format("HH:mm");
                const endTime = moment(afternoon_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  if (count > interval_after) {
                    currentTime.add(interval_for, "minutes");
                    count = 1;
                  } else {
                    aSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration + break_time, "minutes");
                    count = count + 1;
                  }
                }
              } else {
                const dateStr = afternoon_shift.start.split("T")[0];
                const startTime = moment(afternoon_shift.start).format("HH:mm");
                const endTime = moment(afternoon_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  aSlots.push({
                    _id: new ObjectId(),
                    time: `${moment(currentDate).format("YYYY-MM-DD")}T${moment
                      .utc(currentTime)
                      .format("HH:mm:ss.SSS")}Z`,

                    status: "Available",
                  });
                  currentTime.add(duration, "minutes");
                }
              }
            } else if (key === "evening_shift") {
              eSlots = [];
              if (break_type === "After Certain Appoinment") {
                let count = 1;
                const dateStr = evening_shift.start.split("T")[0];
                const startTime = moment(evening_shift.start).format("HH:mm");
                const endTime = moment(evening_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  if (count > interval_after) {
                    currentTime.add(interval_for, "minutes");
                    count = 1;
                  } else {
                    eSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration, "minutes");
                    count = count + 1;
                  }
                }
              } else if (break_type === "After Every Appoinment") {
                const dateStr = evening_shift.start.split("T")[0];
                const startTime = moment(evening_shift.start).format("HH:mm");
                const endTime = moment(evening_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  eSlots.push({
                    _id: new ObjectId(),
                    time: `${moment(currentDate).format("YYYY-MM-DD")}T${moment
                      .utc(currentTime)
                      .format("HH:mm:ss.SSS")}Z`,

                    status: "Available",
                  });
                  currentTime.add(duration + break_time, "minutes");
                }
              } else if (break_type === "Both options") {
                let count = 1;
                const dateStr = evening_shift.start.split("T")[0];
                const startTime = moment(evening_shift.start).format("HH:mm");
                const endTime = moment(evening_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  if (count > interval_after) {
                    currentTime.add(interval_for, "minutes");
                    count = 1;
                  } else {
                    eSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration + break_time, "minutes");
                    count = count + 1;
                  }
                }
              } else {
                const dateStr = evening_shift.start.split("T")[0];
                const startTime = moment(evening_shift.start).format("HH:mm");
                const endTime = moment(evening_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  eSlots.push({
                    _id: new ObjectId(),
                    time: `${moment(currentDate).format("YYYY-MM-DD")}T${moment
                      .utc(currentTime)
                      .format("HH:mm:ss.SSS")}Z`,

                    status: "Available",
                  });
                  currentTime.add(duration, "minutes");
                }
              }
            } else if (key === "night_shift") {
              nSlots = [];
              if (break_type === "After Certain Appoinment") {
                let count = 1;
                const dateStr = night_shift.start.split("T")[0];
                const startTime = moment(night_shift.start).format("HH:mm");
                const endTime = moment(night_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  if (count > interval_after) {
                    currentTime.add(interval_for, "minutes");
                    count = 1;
                  } else {
                    nSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration, "minutes");
                    count = count + 1;
                  }
                }
              } else if (break_type === "After Every Appoinment") {
                const dateStr = night_shift.start.split("T")[0];
                const startTime = moment(night_shift.start).format("HH:mm");
                const endTime = moment(night_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  nSlots.push({
                    _id: new ObjectId(),
                    time: `${moment(currentDate).format("YYYY-MM-DD")}T${moment
                      .utc(currentTime)
                      .format("HH:mm:ss.SSS")}Z`,

                    status: "Available",
                  });
                  currentTime.add(duration + break_time, "minutes");
                }
              } else if (break_type === "Both options") {
                let count = 1;
                const dateStr = night_shift.start.split("T")[0];
                const startTime = moment(night_shift.start).format("HH:mm");
                const endTime = moment(night_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  if (count > interval_after) {
                    currentTime.add(interval_for, "minutes");
                    count = 1;
                  } else {
                    nSlots.push({
                      _id: new ObjectId(),
                      time: `${moment(currentDate).format(
                        "YYYY-MM-DD"
                      )}T${moment.utc(currentTime).format("HH:mm:ss.SSS")}Z`,

                      status: "Available",
                    });
                    currentTime.add(duration + break_time, "minutes");
                    count = count + 1;
                  }
                }
              } else {
                const dateStr = night_shift.start.split("T")[0];
                const startTime = moment(night_shift.start).format("HH:mm");
                const endTime = moment(night_shift.till).format("HH:mm");
                const startDateTime = moment(`${dateStr}T${startTime}:00`);
                const endDateTime = moment(`${dateStr}T${endTime}:00`);
                let currentTime = startDateTime.clone();
                while (currentTime.isSameOrBefore(endDateTime)) {
                  nSlots.push({
                    _id: new ObjectId(),
                    time: `${moment(currentDate).format("YYYY-MM-DD")}T${moment
                      .utc(currentTime)
                      .format("HH:mm:ss.SSS")}Z`,

                    status: "Available",
                  });
                  currentTime.add(duration, "minutes");
                }
              }
            }
          }
        }
        Appoinment_List.push({
          _id: new ObjectId(),
          day: new Date(currentDate),
          type: type,
          morningSlots: mSlots,
          afternoonSlots: aSlots,
          eveningSlots: eSlots,
          nightSlots: nSlots,
          created_at: new Date(),
          updated_at: new Date(),
        });
        // currentDate.setDate(currentDate.getDate() + 1);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return Appoinment_List;
  } catch (error) {
    console.log("Error (CalculateTime): ", error);
  }
};

const create_slots = async (req) => {
  let data = await CalculateTime(req);
  const id = new ObjectId(req.authID);
  const docs = await TherapistAppointmentSlots.findOne({ authID: id });
  if (docs) {
    if (req?.type === "In_Person") {
      docs.in_person_slots.push(...data);
    } else {
      docs.tele_slots.push(...data);
    }
    await docs.save();
    return {
      success: true,
      message: "Slots Created Successfully.",
      data: data,
    };
  } else {
    return {
      success: false,
      message: "Data not found.",
      data: data,
    };
  }
};

const get_slots = async (req) => {
  const id = new ObjectId(req.id);
  const docs = await TherapistAppointmentSlots.findOne({ authID: id });
  if (docs) {
    for (let index = 0; index < docs?.in_person_slots.length; index++) {
      const element = docs?.in_person_slots[index];
      for (let index1 = 0; index1 < element?.morningSlots.length; index1++) {
        const element1 = element?.morningSlots[index1];
      }
    }
    return {
      success: true,
      message: "Slots found.",
      data: {
        in_person_slots: docs?.in_person_slots,
        tele_slots: docs?.tele_slots,
      },
    };
  } else {
    return {
      success: false,
      message: "Data not found.",
    };
  }
};

const book_appoitment = async (req) => {
  const { spId, mode, dayId, timeId, type } = req;

  try {
    const authID = new ObjectId(spId);
    const result = await TherapistAppointmentSlots.findOne({ authID: authID });
    if (!result) {
      return {
        success: false,
        message: "AuthID not found",
      };
    }

    let slots = null;
    if (mode === "in_person_slots") {
      slots = result.in_person_slots.find(
        (slot) => slot._id.toString() === dayId.toString()
      );
    } else if (mode === "tele_slots") {
      slots = result.tele_slots.find(
        (slot) => slot._id.toString() === dayId.toString()
      );
    } else {
      return {
        success: false,
        message: "Invalid mode",
      };
    }
    if (!slots) {
      return {
        success: false,
        message: "SubIddate not found in mode",
      };
    }

    const slotType = slots[type];
    const matchingSlot = slotType.find(
      (slot) => slot._id.toString() === timeId.toString()
    );
    if (!matchingSlot) {
      return {
        success: false,
        message: "SubId not found in type",
      };
    }

    if (matchingSlot.status == "Not Available") {
      return {
        success: false,
        message: "Slot not available.",
      };
    }

    matchingSlot.status = "Not Available";
    await result.save();

    return {
      success: true,
      message: "Status updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
      error: error,
    };
  }
};

module.exports = {
  create_slots,
  book_appoitment,
  get_slots,
};
