import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Button,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import Logic from "./Logic";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const RegisterPage = () => {
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
          <img alt="" src="images/gambar.png" width="600" height="600" />
        </Stack>
      </Grid>

      <Grid
        sx={{
          padding: 2,
          overflow: "auto",
          height: "100vh",
        }}
        item
        xs={5}
      >
        <Typography
          fontSize={36}
          style={{ fontFamily: "lato", fontWeight: "900" }}
        >
          Selamat datang
        </Typography>
        <Typography fontSize={26} sx={{ mt: 2 }} style={{ fontFamily: "lato" }}>
          Silahkan lengkapi form di bawah ini
        </Typography>

        <Stack
          mb={2}
          mt={4}
          style={{
            alignItems: "center",
            borderRadius: "30%",
          }}
        >
          {value.img.previewImage == null ? (
            <img
              width="110"
              height="110"
              style={{
                position: "relative",
                marginBottom: "14px",
                zIndex: 0,
                background: "grey",
                borderRadius: "150px",
              }}
              alt=""
            />
          ) : (
            <img
              src={value.img.previewImage}
              width="110"
              height="110"
              style={{
                // position: "relative",
                marginBottom: "14px",
                borderRadius: "50%",
                zIndex: 0,
              }}
              alt=""
            />
          )}

          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            style={{
              background: "#8BD7EF",
              marginTop: "-39px",
              marginLeft: "77px",
              fontSize: "20px",
              padding: "10px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={func.onGetImage}
            />
            <AddAPhotoOutlinedIcon />
          </IconButton>
        </Stack>

        <Stack spacing={2} style={{}} component="form">
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

          <TextField
            name="nama_lengkap"
            label="Nama lengkap"
            variant="outlined"
            size="small"
            onChange={func.onChange}
          />
          <TextField
            name="gender"
            label="Jenis kelamin"
            select
            fullWidth
            size="small"
            onChange={func.onChange}
          >
            <MenuItem value="laki-laki">Laki-laki</MenuItem>
            <MenuItem value="perempuan">Perempuan</MenuItem>
          </TextField>
          <TextField
            name="nik"
            label="NIK"
            type="number"
            variant="outlined"
            size="small"
            onChange={func.onChange}
          />
          <TextField
            name="type_pasien"
            label="Tipe pasien"
            select
            fullWidth
            size="small"
            onChange={func.onChange}
          >
            <MenuItem value="umum">Umum</MenuItem>
            <MenuItem value="bpjs">Bpjs</MenuItem>
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Tanggal lahir" onChange={func.onChangeDate} />
          </LocalizationProvider>
          <TextField
            name="alamat"
            label="Alamat"
            variant="outlined"
            size="small"
            onChange={func.onChange}
          />
        </Stack>

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
            onClick={func.onRegister}
          >
            SIGN UP
          </LoadingButton>
        </Stack>

        <Stack sx={{ alignItems: "center", fontSize: "18px", mt: 4 }}>
          <p
            style={{
              fontFamily: "lato",
            }}
          >
            Sudah punya akun ?{" "}
            <Button
              style={{
                color: "#8BD7EF",
                fontWeight: "900",
                textDecoration: "none",
              }}
              onClick={func.onMoveToLogin}
            >
              Login
            </Button>
          </p>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
