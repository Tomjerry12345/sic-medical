import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, Stack, TextField } from "@mui/material";

const LoginPage = () => {
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

      {/* Typography */}
      <Stack
        style={{
          marginLeft: "35px",
        }}
      >
        <Typography
          fontSize={36}
          style={{ fontFamily: "lato", fontWeight: "900" }}
        >
          <p>Selamat datang</p>
        </Typography>
        <Typography
          fontSize={29}
          style={{ width: "80%", fontFamily: "lato", marginTop: "-50px" }}
        >
          <p>Silahkan Login Terlebih Dahulu </p>
        </Typography>

        {/* TextField */}
        <Stack
          spacing={3}
          style={{
            width: "132%",
          }}
        >
          <TextField label="Email" variant="outlined" />
          <TextField label="Password" type="password" variant="outlined" />
        </Stack>

        {/* Login */}
        <Stack
          mt={7}
          style={{
            marginLeft: "100px",
            marginRight: "-40px",
          }}
        >
          <Button
            style={{
              background: "#8BD7EF",
              fontFamily: "lato",
              height: "50px",
              fontSize: "32px",
              color: "#FFFFFF",
              fontWeight: "400",
            }}
            direction={"row"}
            flexWrap="wrap"
          >
            Login
          </Button>
        </Stack>

        {/* blm punya akun */}
        <Stack mt={5} style={{ alignItems: "center" }}>
          <p
            style={{
              fontFamily: "lato",
              fontSize: "30px",
              marginRight: "-135px",
            }}
          >
            Belum punya akun ?{" "}
            <a
              href="#"
              style={{
                color: "#8BD7EF",
                fontWeight: "900",
              }}
            >
              Daftar
            </a>
          </p>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default LoginPage;
