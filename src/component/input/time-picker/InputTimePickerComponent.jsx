import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";

const InputTimePickerComponent = ({
  label,
  defaultValue,
  style,
  onAccept,
  timeDisabled = null,
}) => {
  const shouldDisableTime = (value, view) => {
    if (timeDisabled !== null) {
      if (view === "hours") {
        const hour = value.hour();
        const minute = value.minute();

        for (let i = 0; i < timeDisabled.length; i++) {
          const { startHour, startMinute, endHour, endMinute } =
            timeDisabled[i];

          if (
            (hour > startHour ||
              (hour === startHour && minute >= startMinute)) &&
            (hour < endHour || (hour === endHour && minute < endMinute))
          ) {
            return true;
          }
        }
      }
      return false;
    }

    return false;
  };
  return (
    <LocalizationProvider style={style} dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          defaultValue={dayjs(`2022-04-17T${defaultValue}`)}
          label={label}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          shouldDisableTime={shouldDisableTime}
          onAccept={onAccept}
        />{" "}
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default InputTimePickerComponent;
