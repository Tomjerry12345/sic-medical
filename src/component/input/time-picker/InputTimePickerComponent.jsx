import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

const InputTimePickerComponent = ({ label, style }) => {
    const disabledTimeRanges = [
        { startHour: 12, endHour: 13 },
        { startHour: 15, endHour: 16 },
    ];

    const shouldDisableTime = (value, view) => {
        if (view === 'hours') {
            const hour = value.hour();

            for (let i = 0; i < disabledTimeRanges.length; i++) {
                if (hour >= disabledTimeRanges[i].startHour && hour < disabledTimeRanges[i].endHour) {
                    return true;
                }
            }
        }
        return false;
    };

    return <LocalizationProvider style={style} dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
            <TimePicker
                label={label}
                viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                }}
            // shouldDisableTime={shouldDisableTime}
            />
        </DemoContainer>
    </LocalizationProvider>;
}

export default InputTimePickerComponent;