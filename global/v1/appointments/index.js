const moment = require("moment");
const { strings } = require("../../../utils/strings");
const { ModelStrings } = require("../../../utils/constants");

async function createSessions(data) {
  let sessionsRecords = [];
  let currentSessionInfo = {};
  let updatedSessionsRecords = [];
  let count;
  let index;
  let fees;
  const initialDate = new Date(data?.fromDate);
  const currentDate = new Date(initialDate);
  if (data?.sessionType == ModelStrings.everyday) {
    if (data?.packageType === ModelStrings.everyday) {
      fees = data?.paidAmount;
      sessionsRecords.push({
        date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
          data?.time
        )?.format("HH:mm:ss.SSS")}Z`,
        status: strings.upcoming,
        fees: fees,
        attended_by: {
          id: "dummy",
          name: "dummy",
          image: "dummy",
        },
        cReason: "",
        canceled_by: {
          id: "",
          name: "",
          image: "",
        },
        updated_on: new Date(),
      });
    } else if (data?.packageType === ModelStrings.sevenDays) {
      fees = Math.round(data?.paidAmount / 7);
      index = 1;
      count = 1;
      while (count <= 7) {
        sessionsRecords.push({
          date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
            data?.time
          )?.format("HH:mm:ss.SSS")}Z`,
          status: strings.upcoming,
          fees: fees,
          attended_by: {
            id: "dummy",
            name: "dummy",
            image: "dummy",
          },
          cReason: "",
          canceled_by: {
            id: "",
            name: "",
            image: "",
          },
          updated_on: new Date(),
        });
        count = count + 1;
        if (currentDate.getDate() === 1) {
          index = 2;
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1);
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1;
        }
      }
    } else if (data?.packageType === ModelStrings.tenDays) {
      fees = Math.round(data?.paidAmount / 10);
      index = 1;
      count = 1;
      while (count <= 10) {
        sessionsRecords.push({
          date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
            data?.time
          )?.format("HH:mm:ss.SSS")}Z`,
          status: strings.upcoming,
          fees: fees,
          attended_by: {
            id: "dummy",
            name: "dummy",
            image: "dummy",
          },
          cReason: "",
          canceled_by: {
            id: "",
            name: "",
            image: "",
          },
          updated_on: new Date(),
        });
        count = count + 1;
        if (currentDate.getDate() === 1) {
          index = 2;
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1);
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1;
        }
      }
    }
    updatedSessionsRecords.push({
      duration: data?.duration,
      mode: data?.mode,
      time: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      location: data?.location,
      package_type: data?.packageType,
      session_type: data?.sessionType,
      fees: fees,
      paid_amount: data?.paidAmount,
      attended_by: {
        id: "dummy",
        name: "dummy",
        image: "dummy",
      },
      created_on: new Date(),
    });
    currentSessionInfo = {
      fromDate: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      total_session: "1+",
      duration: data?.duration,
      mode: data?.mode,
      time: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      location: data?.location,
      package_type: data?.packageType,
      session_type: data?.sessionType,
      fees: fees,
      total_amount: data?.paidAmount,
      paid_amount: data?.paidAmount,
      attended_by: {
        id: "dummy",
        name: "dummy",
        image: "dummy",
      },
    };
  } else if (data?.sessionType == ModelStrings.alternate) {
    if (data?.packageType === ModelStrings.everyday) {
      fees = data?.paidAmount;
      sessionsRecords.push({
        date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
          data?.time
        )?.format("HH:mm:ss.SSS")}Z`,
        status: strings.upcoming,
        fees: fees,
        attended_by: {
          id: "dummy",
          name: "dummy",
          image: "dummy",
        },
        cReason: "",
        canceled_by: {
          id: "",
          name: "",
          image: "",
        },
        updated_on: new Date(),
      });
      currentDate.setDate(initialDate.getDate() + 2);
      sessionsRecords.push({
        date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
          data?.time
        )?.format("HH:mm:ss.SSS")}Z`,
        status: strings.upcoming,
        fees: data?.paidAmount,
        attended_by: {
          id: "dummy",
          name: "dummy",
          image: "dummy",
        },
        cReason: "",
        canceled_by: {
          id: "",
          name: "",
          image: "",
        },
        updated_on: new Date(),
      });
    } else if (data?.packageType === ModelStrings.sevenDays) {
      fees = Math.round(data?.paidAmount / 7);
      count = 1;
      index = 2;
      while (count <= 7) {
        sessionsRecords.push({
          date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
            data?.time
          )?.format("HH:mm:ss.SSS")}Z`,
          status: strings.upcoming,
          fees: fees,
          attended_by: {
            id: "dummy",
            name: "dummy",
            image: "dummy",
          },
          cReason: "",
          canceled_by: {
            id: "",
            name: "",
            image: "",
          },
          updated_on: new Date(),
        });
        count = count + 1;
        if (currentDate.getDate() === 1 || currentDate.getDate() === 2) {
          index = currentDate.getDate() + 2;
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1);
          index = index + 1;
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 2;
        }
      }
    } else if (data?.packageType === ModelStrings.tenDays) {
      fees = Math.round(data?.paidAmount / 10);
      count = 1;
      index = 2;
      while (count <= 10) {
        sessionsRecords.push({
          date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
            data?.time
          )?.format("HH:mm:ss.SSS")}Z`,
          status: strings.upcoming,
          fees: fees,
          attended_by: {
            id: "dummy",
            name: "dummy",
            image: "dummy",
          },
          cReason: "",
          canceled_by: {
            id: "",
            name: "",
            image: "",
          },
          updated_on: new Date(),
        });
        count = count + 1;
        if (currentDate.getDate() === 1 || currentDate.getDate() === 2) {
          index = currentDate.getDate() + 2;
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1);
          index = index + 1;
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 2;
        }
      }
    }
    updatedSessionsRecords.push({
      duration: data?.duration,
      mode: data?.mode,
      time: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      location: data?.location,
      package_type: data?.packageType,
      session_type: data?.sessionType,
      fees: fees,
      paid_amount: data?.paidAmount,
      attended_by: {
        id: "dummy",
        name: "dummy",
        image: "dummy",
      },
      created_on: new Date(),
    });
    currentSessionInfo = {
      fromDate: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      total_session: "1+",
      duration: data?.duration,
      mode: data?.mode,
      time: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      location: data?.location,
      package_type: data?.packageType,
      session_type: data?.sessionType,
      fees: fees,
      total_amount: data?.paidAmount,
      paid_amount: data?.paidAmount,
      attended_by: {
        id: "dummy",
        name: "dummy",
        image: "dummy",
      },
    };
  } else if (data?.sessionType == ModelStrings.weekdays) {
    fees = data?.paidAmount;
    if (data?.packageType === ModelStrings.everyday) {
      count = 1;
      index = 1;
      while (count <= 1) {
        const currentDate = new Date(initialDate);
        if (
          moment(currentDate).format("dddd") !== "Saturday" &&
          moment(currentDate).format("dddd") !== "Sunday"
        ) {
          sessionsRecords.push({
            date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
              data?.time
            )?.format("HH:mm:ss.SSS")}Z`,
            status: strings.upcoming,
            fees: fees,
            attended_by: {
              id: "dummy",
              name: "dummy",
              image: "dummy",
            },
            cReason: "",
            canceled_by: {
              id: "",
              name: "",
              image: "",
            },
            updated_on: new Date(),
          });
          count = count + 1;
        }

        if (currentDate.getDate() === 1) {
          index = 2;
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1);
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1;
        }
      }
    } else if (data?.packageType === ModelStrings.sevenDays) {
      fees = Math.round(data?.paidAmount / 7);
      count = 1;
      index = 1;
      while (count <= 7) {
        if (
          moment(currentDate).format("dddd") !== "Saturday" &&
          moment(currentDate).format("dddd") !== "Sunday"
        ) {
          sessionsRecords.push({
            date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
              data?.time
            )?.format("HH:mm:ss.SSS")}Z`,
            status: strings.upcoming,
            fees: fees,
            attended_by: {
              id: "dummy",
              name: "dummy",
              image: "dummy",
            },
            cReason: "",
            canceled_by: {
              id: "",
              name: "",
              image: "",
            },
            updated_on: new Date(),
          });
          count = count + 1;
        }
        if (currentDate.getDate() === 1) {
          index = 2;
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1);
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1;
        }
      }
    } else if (data?.packageType === ModelStrings.tenDays) {
      fees = Math.round(data?.paidAmount / 10);
      count = 1;
      index = 1;
      while (count <= 10) {
        if (
          moment(currentDate).format("dddd") !== "Saturday" &&
          moment(currentDate).format("dddd") !== "Sunday"
        ) {
          sessionsRecords.push({
            date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
              data?.time
            )?.format("HH:mm:ss.SSS")}Z`,
            status: strings.upcoming,
            fees: fees,
            attended_by: {
              id: "dummy",
              name: "dummy",
              image: "dummy",
            },
            cReason: "",
            canceled_by: {
              id: "",
              name: "",
              image: "",
            },
            updated_on: new Date(),
          });
          count = count + 1;
        }
        if (currentDate.getDate() === 1) {
          index = 2;
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1);
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1;
        }
      }
    }
    updatedSessionsRecords.push({
      duration: data?.duration,
      mode: data?.mode,
      time: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      location: data?.location,
      package_type: data?.packageType,
      session_type: data?.sessionType,
      fees: fees,
      paid_amount: data?.paidAmount,
      attended_by: {
        id: "dummy",
        name: "dummy",
        image: "dummy",
      },
      created_on: new Date(),
    });
    currentSessionInfo = {
      fromDate: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      total_session: "1+",
      duration: data?.duration,
      mode: data?.mode,
      time: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      location: data?.location,
      package_type: data?.packageType,
      session_type: data?.sessionType,
      fees: fees,
      total_amount: data?.paidAmount,
      paid_amount: data?.paidAmount,
      attended_by: {
        id: "dummy",
        name: "dummy",
        image: "dummy",
      },
    };
  } else if (data?.sessionType == ModelStrings.weekends) {
    if (data?.packageType === ModelStrings.everyday) {
      fees = data?.paidAmount;
      count = 1;
      index = 1;
      while (count <= 1) {
        const currentDate = new Date(initialDate);
        if (
          moment(currentDate).format("dddd") === "Saturday" ||
          moment(currentDate).format("dddd") === "Sunday"
        ) {
          sessionsRecords.push({
            date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
              data?.time
            )?.format("HH:mm:ss.SSS")}Z`,
            status: strings.upcoming,
            fees: fees,
            attended_by: {
              id: "dummy",
              name: "dummy",
              image: "dummy",
            },
            cReason: "",
            canceled_by: {
              id: "",
              name: "",
              image: "",
            },
            updated_on: new Date(),
          });
          count = count + 1;
        }
        if (currentDate.getDate() === 1) {
          index = 2;
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1);
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1;
        }
      }
    } else if (data?.packageType === ModelStrings.sevenDays) {
      fees = Math.round(data?.paidAmount / 7);
      count = 1;
      index = 1;
      while (count <= 7) {
        if (
          moment(currentDate).format("dddd") === "Saturday" ||
          moment(currentDate).format("dddd") === "Sunday"
        ) {
          sessionsRecords.push({
            date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
              data?.time
            )?.format("HH:mm:ss.SSS")}Z`,
            status: strings.upcoming,
            fees: fees,
            attended_by: {
              id: "dummy",
              name: "dummy",
              image: "dummy",
            },
            cReason: "",
            canceled_by: {
              id: "",
              name: "",
              image: "",
            },
            updated_on: new Date(),
          });
          count = count + 1;
        }
        if (currentDate.getDate() === 1) {
          index = 2;
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1);
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1;
        }
      }
    } else if (data?.packageType === ModelStrings.tenDays) {
      fees = Math.round(data?.paidAmount / 10);
      count = 1;
      index = 1;
      while (count <= 10) {
        if (
          moment(currentDate).format("dddd") === "Saturday" ||
          moment(currentDate).format("dddd") === "Sunday"
        ) {
          sessionsRecords.push({
            date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
              data?.time
            )?.format("HH:mm:ss.SSS")}Z`,
            status: strings.upcoming,
            fees: fees,
            attended_by: {
              id: "dummy",
              name: "dummy",
              image: "dummy",
            },
            cReason: "",
            canceled_by: {
              id: "",
              name: "",
              image: "",
            },
            updated_on: new Date(),
          });
          count = count + 1;
        }
        if (currentDate.getDate() === 1) {
          index = 2;
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1);
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1;
        }
      }
    }
    updatedSessionsRecords.push({
      duration: data?.duration,
      mode: data?.mode,
      time: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      location: data?.location,
      package_type: data?.packageType,
      session_type: data?.sessionType,
      fees: fees,
      paid_amount: data?.paidAmount,
      attended_by: {
        id: "dummy",
        name: "dummy",
        image: "dummy",
      },
      created_on: new Date(),
    });
    currentSessionInfo = {
      fromDate: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      total_session: "1+",
      duration: data?.duration,
      mode: data?.mode,
      time: `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(
        data?.time
      )?.format("HH:mm:ss.SSS")}`,
      location: data?.location,
      package_type: data?.packageType,
      session_type: data?.sessionType,
      fees: fees,
      total_amount: data?.paidAmount,
      paid_amount: data?.paidAmount,
      attended_by: {
        id: "dummy",
        name: "dummy",
        image: "dummy",
      },
    };
  }
  return {
    sessionsRecords: sessionsRecords,
    updatedSessionsRecords: updatedSessionsRecords,
    currentSessionInfo: currentSessionInfo,
  };
}

async function createCustomSessions(data) {
  let sessionsRecords = [];
  let count;
  let index;
  const initialDate = new Date(data?.final_date);
  const currentDate = new Date(initialDate);
  currentDate.setDate(initialDate.getDate() + 1);
  if (data?.sessionType == ModelStrings.everyday) {
    index = 2;
    count = 1;
    while (count <= data?.sId?.length) {
      sessionsRecords.push({
        date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
          data?.time
        )?.format("HH:mm:ss.SSS")}Z`,
        status: strings.upcoming,
        fees: data?.fees,
        attended_by: {
          id: "dummy",
          name: "dummy",
          image: "dummy",
        },
        cReason: "",
        canceled_by: {
          id: "",
          name: "",
          image: "",
        },
        updated_on: new Date(),
      });
      count = count + 1;
      if (currentDate.getDate() === 1) {
        index = 2;
        currentDate.setDate(index);
        initialDate.setMonth(initialDate.getMonth() + 1, 1);
      } else {
        currentDate.setDate(initialDate.getDate() + index);
        index = index + 1;
      }
    }
  } else if (data?.sessionType == ModelStrings.alternate) {
    count = 1;
    index = 4;
    currentDate.setDate(initialDate.getDate() + 2);
    while (count <= data?.sId?.length) {
      sessionsRecords.push({
        date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
          data?.time
        )?.format("HH:mm:ss.SSS")}Z`,
        status: strings.upcoming,
        fees: data?.fees,
        attended_by: {
          id: "dummy",
          name: "dummy",
          image: "dummy",
        },
        cReason: "",
        canceled_by: {
          id: "",
          name: "",
          image: "",
        },
        updated_on: new Date(),
      });
      count = count + 1;
      if (currentDate.getDate() === 1 || currentDate.getDate() === 2) {
        index = currentDate.getDate() + 2;
        currentDate.setDate(index);
        initialDate.setMonth(initialDate.getMonth() + 1, 1);
        index = index + 1;
      } else {
        currentDate.setDate(initialDate.getDate() + index);
        index = index + 2;
      }
    }
  } else if (data?.sessionType == ModelStrings.weekdays) {
    count = 1;
    index = 2;
    while (count <= data?.sId?.length) {
      console.log(
        "date",
        `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
          data?.time
        )?.format("HH:mm:ss.SSS")}Z`
      );
      if (
        moment(currentDate).format("dddd") !== "Saturday" &&
        moment(currentDate).format("dddd") !== "Sunday"
      ) {
        console.log(
          "entred",
          `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
            data?.time
          )?.format("HH:mm:ss.SSS")}`
        );
        sessionsRecords.push({
          date: `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
            data?.time
          )?.format("HH:mm:ss.SSS")}Z`,
          status: strings.upcoming,
          fees: data?.fees,
          attended_by: {
            id: "dummy",
            name: "dummy",
            image: "dummy",
          },
          cReason: "",
          canceled_by: {
            id: "",
            name: "",
            image: "",
          },
          updated_on: new Date(),
        });
        count = count + 1;
      }
      if (currentDate.getDate() === 1) {
        index = 2;
        currentDate.setDate(index);
        initialDate.setMonth(initialDate.getMonth() + 1, 1);
      } else {
        currentDate.setDate(initialDate.getDate() + index);
        index = index + 1;
      }
    }
  } else if (data?.sessionType == ModelStrings.weekends) {
    count = 1;
    index = 2;
    while (count <= data?.sId?.length) {
      if (
        moment(currentDate).format("dddd") === "Saturday" ||
        moment(currentDate).format("dddd") === "Sunday"
      ) {
        sessionsRecords.push({
          date: new Date(`${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(
            data?.time
          )?.format("HH:mm:ss.SSS")}Z`),
          status: strings.upcoming,
          fees: data?.fees,
          attended_by: {
            id: "dummy",
            name: "dummy",
            image: "dummy",
          },
          cReason: "",
          start_time: null,
          end_time: null,
          canceled_by: {
            id: "",
            name: "",
            image: "",
          },
          updated_on: new Date(),
        });
        count = count + 1;
      }
      if (currentDate.getDate() === 1) {
        index = 2;
        currentDate.setDate(index);
        initialDate.setMonth(initialDate.getMonth() + 1, 1);
      } else {
        currentDate.setDate(initialDate.getDate() + index);
        index = index + 1;
      }
      // console.log("currendate", currentDate,);
    }
  }
  return sessionsRecords;
}

async function upgardeSession(data) {
  let sessionsRecords = []
  let currentSessionInfo = {}
  let updatedSessionsRecords = []
  let count;
  let index;
  let fees;
  const initialDate = new Date(data?.fromDate);
  const currentDate = new Date(initialDate);
  if (data?.sessionType == ModelStrings.everyday) {
    if (data?.packageType === ModelStrings.everyday) {
      fees = data?.paidAmount
      sessionsRecords.push({
        "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
        "status": strings.upcoming,
        "fees": fees,
        "attended_by": data?.attended_by,
        "cReason": "",
        start_time: null,
        end_time: null,
        "canceled_by": {
          "id": "",
          "name": "",
          "image": ""
        },
        "updated_on": new Date()
      })
    } else if (data?.packageType === ModelStrings.sevenDays) {
      fees = Math.round(data?.paidAmount / 7);
      index = 1
      count = 1
      while (count <= 7) {
        sessionsRecords.push({
          "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
          "status": strings.upcoming,
          "fees": fees,
          "attended_by": data?.attended_by,
          "cReason": "",
          "canceled_by": {
            "id": "",
            "name": "",
            "image": ""
          },
          "updated_on": new Date()
        })
        count = count + 1
        if (currentDate.getDate() === 1) {
          index = 2
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1)
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1
        }
      }
    } else if (data?.packageType === ModelStrings.tenDays) {
      fees = Math.round(data?.paidAmount / 10);
      index = 1
      count = 1
      while (count <= 10) {
        sessionsRecords.push({
          "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
          "status": strings.upcoming,
          "fees": fees,
          "attended_by": data?.attended_by,
          "cReason": "",
          "canceled_by": {
            "id": "",
            "name": "",
            "image": ""
          },
          "updated_on": new Date()
        })
        count = count + 1
        if (currentDate.getDate() === 1) {
          index = 2
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1)
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1
        }

      }
    }
    updatedSessionsRecords.push({
      "duration": data?.duration,
      "mode": data?.mode,
      "time": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "location": data?.location,
      "package_type": data?.packageType,
      "session_type": data?.sessionType,
      "fees": fees,
      "paid_amount": data?.paidAmount,
      "attended_by": data?.attended_by,
      "created_on": new Date()
    })
    currentSessionInfo = {
      "fromDate": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "total_session": "1+",
      "duration": data?.duration,
      "mode": data?.mode,
      "time": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "location": data?.location,
      "package_type": data?.packageType,
      "session_type": data?.sessionType,
      "fees": fees,
      "total_amount": data?.total_amount + data?.paidAmount,
      "paid_amount": data?.paidAmount,
      "attended_by": data?.attended_by,
    }
  } else if (data?.sessionType == ModelStrings.alternate) {
    if (data?.packageType === ModelStrings.everyday) {
      fees = data?.paidAmount
      sessionsRecords.push({
        "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
        "status": strings.upcoming,
        "fees": fees,
        "attended_by": data?.attended_by,
        "cReason": "",
        "canceled_by": {
          "id": "",
          "name": "",
          "image": ""
        },
        "updated_on": new Date()
      })
      currentDate.setDate(initialDate.getDate() + 2);
      sessionsRecords.push({
        "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
        "status": strings.upcoming,
        "fees": data?.paidAmount,
        "attended_by": data?.attended_by,
        "cReason": "",
        "canceled_by": {
          "id": "",
          "name": "",
          "image": ""
        },
        "updated_on": new Date()
      })
    } else if (data?.packageType === ModelStrings.sevenDays) {
      fees = Math.round(data?.paidAmount / 7);
      count = 1
      index = 2
      while (count <= 7) {
        sessionsRecords.push({
          "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
          "status": strings.upcoming,
          "fees": fees,
          "attended_by": data?.attended_by,
          "cReason": "",
          "canceled_by": {
            "id": "",
            "name": "",
            "image": ""
          },
          "updated_on": new Date()
        })
        count = count + 1
        if (currentDate.getDate() === 1 || currentDate.getDate() === 2) {
          index = currentDate.getDate() + 2
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1)
          index = index + 1
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 2
        }
      }
    } else if (data?.packageType === ModelStrings.tenDays) {
      fees = Math.round(data?.paidAmount / 10);
      count = 1
      index = 2
      while (count <= 10) {
        sessionsRecords.push({
          "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
          "status": strings.upcoming,
          "fees": fees,
          "attended_by": data?.attended_by,
          "cReason": "",
          "canceled_by": {
            "id": "",
            "name": "",
            "image": ""
          },
          "updated_on": new Date()
        })
        count = count + 1
        if (currentDate.getDate() === 1 || currentDate.getDate() === 2) {
          index = currentDate.getDate() + 2
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1)
          index = index + 1
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 2
        }
      }
    }
    updatedSessionsRecords.push({
      "duration": data?.duration,
      "mode": data?.mode,
      "time": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "location": data?.location,
      "package_type": data?.packageType,
      "session_type": data?.sessionType,
      "fees": fees,
      "paid_amount": data?.paidAmount,
      "attended_by": data?.attended_by,
      "created_on": new Date()
    })
    currentSessionInfo = {
      "fromDate": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "total_session": "1+",
      "duration": data?.duration,
      "mode": data?.mode,
      "time": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "location": data?.location,
      "package_type": data?.packageType,
      "session_type": data?.sessionType,
      "fees": fees,
      "total_amount": data?.total_amount + data?.paidAmount,
      "paid_amount": data?.paidAmount,
      "attended_by": data?.attended_by,
    }
  } else if (data?.sessionType == ModelStrings.weekdays) {
    if (data?.packageType === ModelStrings.everyday) {
      count = 1
      index = 1
      while (count <= 1) {
        const currentDate = new Date(initialDate);
        if (moment(currentDate).format("dddd") !== "Saturday" && moment(currentDate).format("dddd") !== "Sunday") {
          sessionsRecords.push({
            "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
            "status": strings.upcoming,
            "fees": fees,
            "attended_by": data?.attended_by,
            "cReason": "",
            "canceled_by": {
              "id": "",
              "name": "",
              "image": ""
            },
            "updated_on": new Date()
          })
          count = count + 1
        }

        if (currentDate.getDate() === 1) {
          index = 2
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1)
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1
        }
      }
    } else if (data?.packageType === ModelStrings.sevenDays) {
      fees = Math.round(data?.paidAmount / 7);
      count = 1
      index = 1
      while (count <= 7) {
        if (moment(currentDate).format("dddd") !== "Saturday" && moment(currentDate).format("dddd") !== "Sunday") {
          sessionsRecords.push({
            "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
            "status": strings.upcoming,
            "fees": fees,
            "attended_by": data?.attended_by,
            "cReason": "",
            "canceled_by": {
              "id": "",
              "name": "",
              "image": ""
            },
            "updated_on": new Date()
          })
          count = count + 1
        }
        if (currentDate.getDate() === 1) {
          index = 2
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1)
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1
        }
      }
    } else if (data?.packageType === ModelStrings.tenDays) {
      fees = Math.round(data?.paidAmount / 10);
      count = 1
      index = 1
      while (count <= 10) {
        if (moment(currentDate).format("dddd") !== "Saturday" && moment(currentDate).format("dddd") !== "Sunday") {
          sessionsRecords.push({
            "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
            "status": strings.upcoming,
            "fees": fees,
            "attended_by": data?.attended_by,
            "cReason": "",
            "canceled_by": {
              "id": "",
              "name": "",
              "image": ""
            },
            "updated_on": new Date()
          })
          count = count + 1
        }
        if (currentDate.getDate() === 1) {
          index = 2
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1)
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1
        }
      }
    }
    updatedSessionsRecords.push({
      "duration": data?.duration,
      "mode": data?.mode,
      "time": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "location": data?.location,
      "package_type": data?.packageType,
      "session_type": data?.sessionType,
      "fees": fees,
      "paid_amount": data?.paidAmount,
      "attended_by": data?.attended_by,
      "created_on": new Date()
    })
    currentSessionInfo = {
      "fromDate": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "total_session": "1+",
      "duration": data?.duration,
      "mode": data?.mode,
      "time": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "location": data?.location,
      "package_type": data?.packageType,
      "session_type": data?.sessionType,
      "fees": fees,
      "total_amount": data?.total_amount + data?.paidAmount,
      "paid_amount": data?.paidAmount,
      "attended_by": data?.attended_by,
    }
  } else if (data?.sessionType == ModelStrings.weekends) {
    if (data?.packageType === ModelStrings.everyday) {
      fees = data?.paidAmount
      count = 1
      index = 1
      while (count <= 1) {
        const currentDate = new Date(initialDate);
        if (moment(currentDate).format("dddd") === "Saturday" || moment(currentDate).format("dddd") === "Sunday") {
          sessionsRecords.push({
            "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
            "status": strings.upcoming,
            "fees": fees,
            "attended_by": data?.attended_by,
            "cReason": "",
            "canceled_by": {
              "id": "",
              "name": "",
              "image": ""
            },
            "updated_on": new Date()
          })
          count = count + 1
        }
        if (currentDate.getDate() === 1) {
          index = 2
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1)
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1
        }
      }
    } else if (data?.packageType === ModelStrings.sevenDays) {
      fees = Math.round(data?.paidAmount / 7);
      count = 1
      index = 1
      while (count <= 7) {
        if (moment(currentDate).format("dddd") === "Saturday" || moment(currentDate).format("dddd") === "Sunday") {
          sessionsRecords.push({
            "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
            "status": strings.upcoming,
            "fees": fees,
            "attended_by": data?.attended_by,
            "cReason": "",
            "canceled_by": {
              "id": "",
              "name": "",
              "image": ""
            },
            "updated_on": new Date()
          })
          count = count + 1
        }
        if (currentDate.getDate() === 1) {
          index = 2
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1)
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1
        }
      }
    } else if (data?.packageType === ModelStrings.tenDays) {
      fees = Math.round(data?.paidAmount / 10);
      count = 1
      index = 1
      while (count <= 10) {
        if (moment(currentDate).format("dddd") === "Saturday" || moment(currentDate).format("dddd") === "Sunday") {
          sessionsRecords.push({
            "date": `${moment(currentDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}Z`,
            "status": strings.upcoming,
            "fees": fees,
            "attended_by": data?.attended_by,
            "cReason": "",
            "canceled_by": {
              "id": "",
              "name": "",
              "image": ""
            },
            "updated_on": new Date()
          })
          count = count + 1
        }
        if (currentDate.getDate() === 1) {
          index = 2
          currentDate.setDate(index);
          initialDate.setMonth(initialDate.getMonth() + 1, 1)
        } else {
          currentDate.setDate(initialDate.getDate() + index);
          index = index + 1
        }
      }
    }
    updatedSessionsRecords.push({
      "duration": data?.duration,
      "mode": data?.mode,
      "time": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "location": data?.location,
      "package_type": data?.packageType,
      "session_type": data?.sessionType,
      "fees": fees,
      "paid_amount": data?.paidAmount,
      "attended_by": data?.attended_by,
      "created_on": new Date()
    })
    currentSessionInfo = {
      "fromDate": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "total_session": "1+",
      "duration": data?.duration,
      "mode": data?.mode,
      "time": `${moment(data?.fromDate)?.format("YYYY-MM-DD")}T${moment(data?.time)?.format("HH:mm:ss.SSS")}`,
      "location": data?.location,
      "package_type": data?.packageType,
      "session_type": data?.sessionType,
      "fees": fees,
      "total_amount": data?.total_amount + data?.paidAmount,
      "paid_amount": data?.paidAmount,
      "attended_by": data?.attended_by,
    }
  }

  return { sessionsRecords: sessionsRecords, updatedSessionsRecords: updatedSessionsRecords, currentSessionInfo: currentSessionInfo };
}

module.exports = {
  createSessions,
  createCustomSessions,
  upgardeSession
};
