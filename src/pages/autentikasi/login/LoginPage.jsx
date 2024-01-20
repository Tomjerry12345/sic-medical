import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Logic from "./Logic"

const LoginPage = () => {
  const { value, func } = Logic();
  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: "100vh",
        marginTop: 0,
      }}
    >
      {/* Images */}
      <Grid
        item
        sx={{
          background: "#8BD7EF",
        }}
        xs={7}
      >
        <Stack
          sx={{
            height: "95vh",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <img alt="" src="images/gambar.png" width="640" height="640" />
        </Stack>
      </Grid>

      <Grid
        sx={{
          padding: 2,
        }}
        item
        xs={5}
      >
        <Typography
          sx={{ mt: 4 }}
          fontSize={36}
          style={{ fontFamily: "lato", fontWeight: "900" }}
        >
          Selamat datang
        </Typography>
        <Typography fontSize={26} sx={{ mt: 2 }} style={{ fontFamily: "lato" }}>
          Silahkan login terlebih dahulu
        </Typography>

        {/* TextField */}
        <Stack sx={{ mt: 4 }} spacing={2} component="form">
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            onChange={func.onChange}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={value.showPassword ? "text" : "password"}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={func.handleClickShowPassword}
                    edge="end"
                  >
                    {value.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={func.onChange}
            />
          </FormControl>
        </Stack>

        {/* Button */}
        <Stack
          mt={4}
          style={{
            width: "100%",
          }}
        >
          <LoadingButton
            loading={value.loading}
            loadingPosition="end"
            variant="outlined"
            style={{
              marginLeft: "130px",
              background: "#8BD7EF",
              fontFamily: "lato",
              width: "50%",
              height: "50px",
              fontSize: "20px",
              color: "#FFFFFF",
            }}
            onClick={func.onLogin}
          >
            Login
          </LoadingButton>
        </Stack>

        {/* sudah punya akun */}
        <Stack sx={{ alignItems: "center", fontSize: "18px", mt: 4 }}>
          <p
            style={{
              fontFamily: "lato",
            }}
          >
            belum punya akun ?{" "}
            <Button
              style={{
                color: "#8BD7EF",
                fontWeight: "900",
                textDecoration: "none",
              }}
              onClick={func.onMoveToRegister}
            >
              sign up
            </Button>
          </p>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
