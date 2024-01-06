import * as React from "react";
import { Card } from "@mui/material";
import Modal from "@mui/material/Modal";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { hour, log, minute } from "values/Utilitas";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalTimePicker = ({
  open,
  handleClose,
  onAccept,
  disabledTime = null,
  disabledTimeList = null,
}) => {

  const shouldDisableTime = (value, view) => {
    log("test 1", "t")
    const hourPick = value.hour();
    const minutePick = value.minute();

    const pickTime = hourPick * 60 + minutePick;

    if (disabledTime !== null) {
      if (view === "hours") {
        const { startHour, endHour } = disabledTime;

        if (hourPick >= startHour && hourPick <= endHour) {
          return false; // disabled
        } else {
          return true; // non disabled
        }
      }

      if (view === "minutes") {
        let isDisabled = null
        const { startHour, startMinute, endHour, endMinute } = disabledTime;

        const timeNow = hour() * 60 + minute();
        const startTimeDokter = startHour * 60 + startMinute;
        const endTimeDokter = endHour * 60 + endMinute;

        disabledTimeList.forEach(c => {
          const cDisabled = parseInt(c.hour) * 60 + parseInt(c.minute)
          if (cDisabled === pickTime) {
            isDisabled = true
          }
        })

        if (isDisabled !== null) return isDisabled
        else {
          if (pickTime >= startTimeDokter && pickTime <= endTimeDokter) {
            if (pickTime <= timeNow) return true
            return false;
          } else {
            return true;
          }
        }

      }
    }

    return false

    // if (disabledTimeList !== null) {
    //   disabledTimeList.forEach((e) => {
    //     const t = parseInt(e.hour) * 60 + parseInt(e.minute)

    //     if (pickTime === t) {
    //       log("hour", `${e.hour}:${e.minute}`)
    //       return true;
    //     } else {
    //       return false
    //     }
    //   });
    // }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={style} style={{ textAlign: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["StaticTimePicker"]}>
            <DemoItem label="Pilih jam konsultasi">
              <StaticTimePicker
                defaultValue={dayjs("2000-09-07T00:00")}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                minutesStep={25}
                shouldDisableTime={shouldDisableTime}
                onAccept={onAccept}
                onClose={handleClose}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Card>
    </Modal>
  );
};

export default ModalTimePicker;
