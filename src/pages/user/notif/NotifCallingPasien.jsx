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
const NotifCallingPasien = () => {
  return (
    <div>
      {/* monkey D luffy */}
      <Box>
        <Typography
          style={{ marginTop: "-15px", fontStyle: "lato", fontSize: "28px" }}
        >
          Monkey D Luffy
        </Typography>
        {/* icon */}
        <Grid
          container
          justifyContent="flex-end"
          style={{ marginTop: "-40px" }}
        >
          <VideocamIcon
            style={{
              width: "40px",
              height: "55px",
              marginTop: "-12px",
              marginRight: "10px",
            }}
          />
          <StickyNote2Icon style={{ width: "50px", height: "30px" }} />
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
        <Box display="flex" justifyContent="flex-start" mt={6}>
          <CardChat nama="Adakah" />
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={6}>
          <CardChat nama="Adakah" background="#F0F8FF" />
        </Box>
      </div>

      {/* tulis pesan */}
      <Stack mt={3}>
        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Tulis pesan...
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
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

export default NotifCallingPasien;
