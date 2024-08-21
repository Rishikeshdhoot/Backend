def CalculateSlots(data):
    try:
        total_video_slot = 0
        total_inClinic_slot = 0
        sd = data['dateFrom'].split('/')
        ed = data['dateTill'].split('/')
        start_date = date(year=int(sd[-1]),
                          month=int(sd[1]), day=int(sd[0]))
        end_date = date(year=int(ed[-1]), month=int(ed[1]), day=int(ed[0]))
        appoint_list = []
        mSlots = []
        aSlots = []
        eSlots = []
        curr_date = start_date
        print("1", sd, ed, start_date, end_date, data)
        while curr_date <= end_date:

            if data['breakType'] == "After Certain Appoinment":
                if curr_date.strftime("%A") in data['exDay']:
                    temp = 0
                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": [],
                        "afternoonSlots": [],
                        "eveningSlots": [],
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    curr_date += timedelta(days=1)
                    if data['cType'] == 'Video':
                        total_video_slot += temp

                elif curr_date.strftime("%A") in data['speDay']:
                    temp = 0
                    for key in data.keys():
                        if key in ["mSlot", "aSlot", "eSlot"]:
                            if len(data[key].keys()) > 0 and data[key]['isSpecific'] == True:
                                start = datetime.strptime(
                                    data[key]['sFrom'], "%I:%M %p")
                                end = datetime.strptime(
                                    data[key]['sTill'], "%I:%M %p")
                                count = 0
                                ittr = 0
                                for i in range(int((end-start).total_seconds() / 60.0 / data['appointTime'])):
                                    if (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))) <= end:
                                        if count == data['aAppoint']:
                                            ittr += 1
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            count = 1
                                        else:
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            count += 1
                                        temp += 1
                                    else:
                                        break
                            else:
                                if key == 'mSlot':
                                    mSlots = []
                                elif key == 'aSlot':
                                    aSlots = []
                                elif key == 'eSlot':
                                    eSlots = []

                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": mSlots,
                        "afternoonSlots": aSlots,
                        "eveningSlots": eSlots,
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    if data['cType'] == 'Video':
                        total_video_slot += temp
                    else:
                        total_inClinic_slot += temp
                    mSlots = []
                    aSlots = []
                    eSlots = []
                    curr_date += timedelta(days=1)
                else:
                    temp = 0
                    for key in data.keys():
                        if key in ["mSlot", "aSlot", "eSlot"]:
                            if len(data[key].keys()) > 0:
                                start = datetime.strptime(
                                    data[key]['nFrom'], "%I:%M %p")
                                end = datetime.strptime(
                                    data[key]['nTill'], "%I:%M %p")
                                count = 0
                                ittr = 0
                                for i in range(int((end-start).total_seconds() / 60.0 / data['appointTime'])):
                                    if (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))) <= end:
                                        if count == data['aAppoint']:
                                            ittr += 1
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            count = 1
                                        else:
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i)+(data['afterAppointBT']*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            count += 1
                                        temp += 1
                                    else:
                                        break
                            else:
                                if key == 'mSlot':
                                    mSlots = []
                                elif key == 'aSlot':
                                    aSlots = []
                                elif key == 'eSlot':
                                    eSlots = []

                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": mSlots,
                        "afternoonSlots": aSlots,
                        "eveningSlots": eSlots,
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    if data['cType'] == 'Video':
                        total_video_slot += temp
                    else:
                        total_inClinic_slot += temp
                    mSlots = []
                    aSlots = []
                    eSlots = []
                    curr_date += timedelta(days=1)

            elif data['breakType'] == "After Every Appoinment":
                if curr_date.strftime("%A") in data['exDay']:
                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": [],
                        "afternoonSlots": [],
                        "eveningSlots": [],
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    curr_date += timedelta(days=1)

                elif curr_date.strftime("%A") in data['speDay']:
                    temp = 0
                    for key in data.keys():
                        if key in ["mSlot", "aSlot", "eSlot"]:
                            if len(data[key].keys()) > 0 and data[key]['isSpecific'] == True:
                                start = datetime.strptime(
                                    data[key]['sFrom'], "%I:%M %p")
                                end = datetime.strptime(
                                    data[key]['sTill'], "%I:%M %p")
                                count = 0
                                ittr = 0
                                for i in range(int((end-start).total_seconds() / 60.0 / (data['appointTime'] + data['everyAppointBT']))):
                                    if (start + timedelta(minutes=(data['appointTime'] + data['everyAppointBT'])*i)) <= end:
                                        if key == 'mSlot':
                                            mSlots.append(
                                                {
                                                    "_id": uuid.uuid4().hex,
                                                    "time": (start + timedelta(minutes=(data['appointTime'] + data['everyAppointBT'])*i)).strftime("%I:%M %p"),
                                                    "status": "A",
                                                }
                                            )
                                        elif key == 'aSlot':
                                            aSlots.append(
                                                {
                                                    "_id": uuid.uuid4().hex,
                                                    "time": (start + timedelta(minutes=(data['appointTime'] + data['everyAppointBT'])*i)).strftime("%I:%M %p"),
                                                    "status": "A",
                                                }
                                            )
                                        elif key == 'eSlot':
                                            eSlots.append(
                                                {
                                                    "_id": uuid.uuid4().hex,
                                                    "time": (start + timedelta(minutes=(data['appointTime'] + data['everyAppointBT'])*i)).strftime("%I:%M %p"),
                                                    "status": "A",
                                                }
                                            )
                                        temp += 1
                                    else:
                                        break
                            else:
                                if key == 'mSlot':
                                    mSlots = []
                                elif key == 'aSlot':
                                    aSlots = []
                                elif key == 'eSlot':
                                    eSlots = []
                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": mSlots,
                        "afternoonSlots": aSlots,
                        "eveningSlots": eSlots,
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    if data['cType'] == 'Video':
                        total_video_slot += temp
                    else:
                        total_inClinic_slot += temp
                    mSlots = []
                    aSlots = []
                    eSlots = []
                    curr_date += timedelta(days=1)

                else:
                    temp = 0
                    for key in data.keys():
                        if key in ["mSlot", "aSlot", "eSlot"]:
                            if len(data[key].keys()) > 0:
                                start = datetime.strptime(
                                    data[key]['nFrom'], "%I:%M %p")
                                end = datetime.strptime(
                                    data[key]['nTill'], "%I:%M %p")
                                count = 0
                                ittr = 0
                                for i in range(int((end-start).total_seconds() / 60.0 / (data['appointTime'] + data['everyAppointBT']))):
                                    if (start + timedelta(minutes=(data['appointTime'] + data['everyAppointBT'])*i)) <= end:
                                        if key == 'mSlot':
                                            mSlots.append(
                                                {
                                                    "_id": uuid.uuid4().hex,
                                                    "time": (start + timedelta(minutes=(data['appointTime'] + data['everyAppointBT'])*i)).strftime("%I:%M %p"),
                                                    "status": "A",
                                                }
                                            )
                                        elif key == 'aSlot':
                                            aSlots.append(
                                                {
                                                    "_id": uuid.uuid4().hex,
                                                    "time": (start + timedelta(minutes=(data['appointTime'] + data['everyAppointBT'])*i)).strftime("%I:%M %p"),
                                                    "status": "A",
                                                }
                                            )
                                        elif key == 'eSlot':
                                            eSlots.append(
                                                {
                                                    "_id": uuid.uuid4().hex,
                                                    "time": (start + timedelta(minutes=(data['appointTime'] + data['everyAppointBT'])*i)).strftime("%I:%M %p"),
                                                    "status": "A",
                                                }
                                            )
                                        temp += 1
                                    else:
                                        break
                            else:
                                if key == 'mSlot':
                                    mSlots = []
                                elif key == 'aSlot':
                                    aSlots = []
                                elif key == 'eSlot':
                                    eSlots = []

                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": mSlots,
                        "afternoonSlots": aSlots,
                        "eveningSlots": eSlots,
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    if data['cType'] == 'Video':
                        total_video_slot += temp
                    else:
                        total_inClinic_slot += temp
                    mSlots = []
                    aSlots = []
                    eSlots = []
                    curr_date += timedelta(days=1)

            elif data['breakType'] == "Both options":
                if curr_date.strftime("%A") in data['exDay']:
                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": [],
                        "afternoonSlots": [],
                        "eveningSlots": [],
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    curr_date += timedelta(days=1)
                elif curr_date.strftime("%A") in data['speDay']:
                    temp = 0
                    for key in data.keys():
                        if key in ["mSlot", "aSlot", "eSlot"]:
                            if len(data[key].keys()) > 0 and data[key]['isSpecific'] == True:
                                start = datetime.strptime(
                                    data[key]['sFrom'], "%I:%M %p")
                                end = datetime.strptime(
                                    data[key]['sTill'], "%I:%M %p")
                                count = 0
                                ittr = 0
                                for i in range(int((end-start).total_seconds() / 60.0 / (data['appointTime'] + data['everyAppointBT']))):
                                    if (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))) <= end:
                                        if count == data['aAppoint']:
                                            ittr += 1
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            count = 1
                                        else:
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            count += 1
                                        temp = + 1
                                    else:
                                        break

                            else:
                                if key == 'mSlot':
                                    mSlots = []
                                elif key == 'aSlot':
                                    aSlots = []
                                elif key == 'eSlot':
                                    eSlots = []
                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": mSlots,
                        "afternoonSlots": aSlots,
                        "eveningSlots": eSlots,
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    if data['cType'] == 'Video':
                        total_video_slot += temp
                    else:
                        total_inClinic_slot += temp
                    mSlots = []
                    aSlots = []
                    eSlots = []
                    curr_date += timedelta(days=1)
                else:
                    temp = 0
                    for key in data.keys():
                        if key in ["mSlot", "aSlot", "eSlot"]:
                            if len(data[key].keys()) > 0:
                                start = datetime.strptime(
                                    data[key]['nFrom'], "%I:%M %p")
                                end = datetime.strptime(
                                    data[key]['nTill'], "%I:%M %p")
                                count = 0
                                ittr = 0
                                for i in range(int((end-start).total_seconds() / 60.0 / (data['appointTime']+data['everyAppointBT']))):
                                    if (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))) <= end:
                                        if count == data['aAppoint']:
                                            ittr += 1
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            count = 1
                                        else:
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=((data['appointTime'] + data['everyAppointBT'])*i)+((data['afterAppointBT']-data['everyAppointBT'])*ittr))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            count += 1
                                        temp += 1
                                    else:
                                        break

                            else:
                                if key == 'mSlot':
                                    mSlots = []
                                elif key == 'aSlot':
                                    aSlots = []
                                elif key == 'eSlot':
                                    eSlots = []
                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": mSlots,
                        "afternoonSlots": aSlots,
                        "eveningSlots": eSlots,
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    if data['cType'] == 'Video':
                        total_video_slot += temp
                    else:
                        total_inClinic_slot += temp
                    mSlots = []
                    aSlots = []
                    eSlots = []
                    curr_date += timedelta(days=1)

            else:
                if curr_date.strftime("%A") in data['exDay']:
                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": [],
                        "afternoonSlots": [],
                        "eveningSlots": [],
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    curr_date += timedelta(days=1)
                elif curr_date.strftime("%A") in data['speDay']:
                    temp = 0
                    for key in data.keys():
                        if key in ["mSlot", "aSlot", "eSlot"]:
                            if len(data[key].keys()) > 0 and data[key]['isSpecific'] == True:
                                start = datetime.strptime(
                                    data[key]['sFrom'], "%I:%M %p")
                                end = datetime.strptime(
                                    data[key]['sTill'], "%I:%M %p")

                                for i in range(int((end-start).total_seconds() / 60.0 / data['appointTime'])):
                                    if (start + timedelta(minutes=(data['appointTime']*i))) <= end:
                                        if count == data['aAppoint']:
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            count = 1
                                        else:
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            count += 1
                                        temp += 1
                                    else:
                                        break

                            else:
                                if key == 'mSlot':
                                    mSlots = []
                                elif key == 'aSlot':
                                    aSlots = []
                                elif key == 'eSlot':
                                    eSlots = []
                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": mSlots,
                        "afternoonSlots": aSlots,
                        "eveningSlots": eSlots,
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    if data['cType'] == 'Video':
                        total_video_slot += temp
                    else:
                        total_inClinic_slot += temp
                    mSlots = []
                    aSlots = []
                    eSlots = []
                    curr_date += timedelta(days=1)
                else:
                    temp = 0
                    for key in data.keys():
                        if key in ["mSlot", "aSlot", "eSlot"]:
                            if len(data[key].keys()) > 0:
                                start = datetime.strptime(
                                    data[key]['nFrom'], "%I:%M %p")
                                end = datetime.strptime(
                                    data[key]['nTill'], "%I:%M %p")
                                count = 0
                                ittr = 0
                                for i in range(int((end-start).total_seconds() / 60.0 / data['appointTime'])):
                                    if (start + timedelta(minutes=(data['appointTime']*i))) <= end:
                                        if count == data['aAppoint']:
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                        else:
                                            if key == 'mSlot':
                                                mSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'aSlot':
                                                aSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                            elif key == 'eSlot':
                                                eSlots.append(
                                                    {
                                                        "_id": uuid.uuid4().hex,
                                                        "time": (start + timedelta(minutes=(data['appointTime']*i))).strftime("%I:%M %p"),
                                                        "status": "A",
                                                    }
                                                )
                                        temp += 1
                                    else:
                                        break

                            else:
                                if key == 'mSlot':
                                    mSlots = []
                                elif key == 'aSlot':
                                    aSlots = []
                                elif key == 'eSlot':
                                    eSlots = []
                    appoint_list.append({
                        "_id": uuid.uuid4().hex,
                        "day": curr_date.strftime("%Y-%m-%d"),
                        "day_show": curr_date.strftime("%d %b"),
                        "type": data['cType'],
                        "morningSlots": mSlots,
                        "afternoonSlots": aSlots,
                        "eveningSlots": eSlots,
                        "created_At": datetime.now(pytz.timezone('Asia/Kolkata')),
                        "updated_At": datetime.now(pytz.timezone('Asia/Kolkata'))
                    })
                    if data['cType'] == 'Video':
                        total_video_slot += temp
                    else:
                        total_inClinic_slot += temp
                    mSlots = []
                    aSlots = []
                    eSlots = []
                    curr_date += timedelta(days=1)

        del data, sd, ed, start_date, end_date, mSlots, aSlots, eSlots, curr_date
        return appoint_list, total_video_slot, total_inClinic_slot
    except Exception as e:
        print("Error (CalculateSlots): Error occured during calculation of slos for Doctor or Therapist.")
        print("Exception is : ", e)
