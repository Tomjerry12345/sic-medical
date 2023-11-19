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
import ChatPasienLogic from "./ChatPasienLogic";
const ChatPasien = () => {
  const { value, func } = ChatPasienLogic();
  return (
    <div>
      {/* monkey D luffy */}
      <Box>
        <Typography
          style={{ marginTop: "-15px", fontStyle: "lato", fontSize: "28px" }}
        >
          {value.displayName}
        </Typography>
        {/* icon */}
        <Grid
          container
          justifyContent="flex-end"
          style={{ marginTop: "-40px" }}
        >
          <IconButton
            style={{
              width: "40px",
              height: "55px",
              marginTop: "-12px",
              marginRight: "10px",
            }}
            onClick={func.onClickVideoCall}
            disabled
          >
            {/* <VideocamIcon /> */}
          </IconButton>

          <IconButton
            style={{ width: "50px", height: "30px" }}
            onClick={func.onClickResep}
          >
            <StickyNote2Icon />
          </IconButton>
        </Grid>
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

export default ChatPasien;
