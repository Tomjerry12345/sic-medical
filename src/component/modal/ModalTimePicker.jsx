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

const ModalTimePicker = ({ open, handleClose, label, onAccept, timeDisabled = null }) => {

  const shouldDisableTime = (value, view) => {
    if (timeDisabled !== null) {
      if (view === 'hours') {
        const { startHour, startMinute, endHour, endMinute } = timeDisabled;

        const hour = value.hour()
        const minute = value.minute()

        if ((hour > startHour) && (hour <= endHour)) {
          return false; // disabled
        } else {
          return true // non disabled
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
