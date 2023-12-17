import * as React from "react";
import { Card } from "@mui/material";
import Modal from "@mui/material/Modal";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { log, logS } from "values/Utilitas";
import dayjs from "dayjs";

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

const ModalTimePicker = ({ open, handleClose, label, onAccept, disabledTime = null, nonDisabledTime = null }) => {

  const shouldDisableTime = (value, view) => {
    if (disabledTime !== null) {
      const hour = value.hour()
      const minute = value.minute()

      if (view === 'hours') {
        const { startHour, endHour } = disabledTime;

        if ((hour >= startHour) && (hour <= endHour)) {
          return false; // disabled
        } else {
          return true // non disabled
        }
      }

      if (view === 'minutes') {
        const { startHour, startMinute, endHour, endMinute } = disabledTime;

        if (nonDisabledTime !== null) {
          nonDisabledTime.forEach(e => {
            if (hour === e.hour && minute === e.minute) {
              return false
            }
          })
        }

        if (hour === startHour && minute >= startMinute && hour !== endHour) {
          return false; // disabled
        } else if (hour === endHour && minute <= endMinute && hour !== startHour) {
          return false; // disabled
        } else if (hour > startHour && hour <= endHour) {
          return false; // disabled
        } else {
          return true; // non disabled
        }
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Card sx={style} style={{ textAlign: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={[
              'StaticTimePicker',
            ]}
          >
            <DemoItem label="Pilih jam konsultasi">
              <StaticTimePicker
                defaultValue={dayjs('2000-09-07T00:00')}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                minutesStep={15}
                shouldDisableTime={shouldDisableTime}
                onAccept={onAccept} onClose={handleClose} />

            </DemoItem>
          </DemoContainer>

        </LocalizationProvider>

      </Card>
    </Modal>
  );
};

export default ModalTimePicker;
