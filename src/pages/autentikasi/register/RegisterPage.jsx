import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, Stack, TextField, MenuItem } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

const RegisterPage = () => {
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

      {/* Typography */}
      <Grid
        style={{
          marginLeft: "35px",
          marginTop: "-10px",
        }}
        xs={4.5}
      >
        <Typography
          fontSize={36}
          style={{ fontFamily: "lato", fontWeight: "900" }}
        >
          <p>Selamat datang</p>
        </Typography>
        <Typography
          fontSize={26}
          style={{ width: "60%", fontFamily: "lato", marginTop: "-30px" }}
        >
          <p>Silahkan lengkapi form di bawah ini </p>
        </Typography>

        {/* images */}
        <Stack
          mb={2}
          style={{
            alignItems: "center",
            borderRadius: "30%",
            marginTop: "-40px",
          }}
        >
          <img
            src="images/luffy.png"
            width="110px"
            style={{
              position: "relative",
              marginBottom: "14px",
              zIndex: 0,
            }}
          />
          <AddAPhotoOutlinedIcon
            style={{
              background: "#8BD7EF",
              position: "absolute",
              marginTop: "70px",
              marginLeft: "77px",
              fontSize: "20px",
              padding: "10px",
              borderRadius: "5px",
              color: "white",
            }}
          />
        </Stack>

        {/* TextField */}
        <Stack spacing={2} style={{}}>
          <TextField label="Email" variant="outlined" size="small" fullWidth />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            size="small"
          />
          <TextField label="Nama lengkap" variant="outlined" size="small" />
          <TextField label="Gender" select fullWidth size="small">
            <MenuItem value="laki-laki">Laki-laki</MenuItem>
            <MenuItem value="perempuan">Perempuan</MenuItem>
          </TextField>
        </Stack>

        {/* Button */}
        <Stack
          mt={4}
          style={{
            width: "100%",
          }}
        >
          <Button
            style={{
              marginLeft: "130px",
              background: "#8BD7EF",
              fontFamily: "lato",
              width: "50%",
              height: "50px",
              fontSize: "20px",
              color: "#FFFFFF",
            }}
          >
            Register
          </Button>
        </Stack>

        {/* sudah punya akun */}
        <Stack
          style={{ alignItems: "center", fontSize: "25px", marginTop: "-10px" }}
        >
          <p
            style={{
              fontFamily: "lato",
            }}
          >
            Sudah punya akun ?{" "}
            <a
              href="#"
              style={{
                color: "#8BD7EF",
                fontWeight: "900",
                textDecoration: "none",
              }}
            >
              Login
            </a>
          </p>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
