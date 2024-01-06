import CardChat from "../../../component/card/CardChat";
import {
  Box,
  Typography,
  OutlinedInput,
  Grid,
  IconButton,
  InputLabel,
  InputAdornment,
  FormControl,
  Stack,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import SendIcon from "@mui/icons-material/Send";
import Logic from "./Logic";
const ChatDokter = () => {
  const { value, func } = Logic();
  return (
    <div>
      {/* monkey D luffy */}
      <Box display="flex">
        <Typography
          style={{ fontStyle: "lato", fontSize: "28px", width: "100%" }}
        >
          {value.displayName}
        </Typography>
        {/* icon */}
        <Grid
          container
          justifyContent="flex-end"

        >
          <IconButton
            onClick={func.onClickVideoCall}
          >
            <VideocamIcon />
          </IconButton>

          <IconButton
            onClick={func.onClickResep}
          >
            <StickyNote2Icon />
          </IconButton>
        </Grid>
      </Box>

      <Box style={{
        background: "red",
        color: "white",
      }}>
        <Typography
          style={{ fontStyle: "lato", fontSize: "18px" }}
        >
          {value.countDownRoom}
        </Typography>
      </Box>
      {/* chat */}
      <div
        style={{
          height: "72vh",
          overflow: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
          padding: "32px",
        }}
      >
        {value.messages &&
          value.messages.map((m) => (
            <Box
              display="flex"
              justifyContent={
                value.u.email === m.sender ? "flex-end" : "flex-start"
              }
              mt={6}
            >
              <CardChat
                nama={m.message}
                background={value.u.email === m.sender ? "#8BD7EF" : "#fff"}
              />
            </Box>
          ))}
      </div>

      {/* tulis pesan */}
      <Stack mt={3}>
        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="message">Tulis pesan...</InputLabel>
          <OutlinedInput
            id="message"
            name="message"
            value={value.input.message}
            onChange={func.onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={func.sendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Stack>
    </div>
  );
};

export default ChatDokter;
