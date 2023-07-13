import { Box, Grid, Stack, Typography } from "@mui/material";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import CarditemDashboard from "../../../component/card/CardItemDashboard";
const DashboardPage = () => {
  const styleIcon = {
    width: "100px",
    height: "calc(100vh - 635px)",
    margin: "auto",
  };
  return (
    <>
      {/* <Toolbar /> */}

      {/* tulisan dashboard */}
      <Stack>
        <Typography
          sx={{
            fontFamily: "lato",
            fontSize: {
              sm: "24px",
              md: "30px",
            },
            marginTop: "-20px",
          }}
        >
          Selamat datang di Klinik Hikmah versi Telemedicine
        </Typography>
      </Stack>

      <Grid container spacing={2} direction="row">
        {/* images */}
        <Grid item sm={12} md={6}>
          <Stack display="flex">
            <Box
              component="img"
              src="images/gambar.png"
              sx={{
                width: {
                  sm: "300px",
                  md: "380px",
                },
                margin: "auto",
              }}
              alt=""
            />
          </Stack>
        </Grid>
        {/* lorem */}
        <Grid item sm={12} md={6}>
          <Stack
            display="flex"
            sx={{
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "lato",
                fontSize: {
                  sm: "14px",
                  md: "20px",
                },
                margin: "auto",
              }}
            >
              Klinik Hikmah merupakan salah satu fasilitas kesehatan yang ada di
              Kabupaten Wajo. Saat ini kami hadir dengan versi telemedicine
              dimana pasien dapat berkonsultasi secara jarak jauh.
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Stack
        sx={{
          marginTop: {
            sm: "36px",
            md: "16px",
          },
        }}
      >
        {/* Feature */}
        <Typography
          sx={{
            fontFamily: "lato",
            fontSize: {
              sm: "24px",
              md: "25px",
            },
            marginTop: "-20px",
          }}
          mb={4}
        >
          Fitur
        </Typography>

        <Stack
          direction="row"
          spacing={14}
          style={{
            justifyContent: "space-around",
          }}
        >
          <CarditemDashboard
            text={"Appointment"}
            icon={<VideoCameraFrontOutlinedIcon style={styleIcon} />}
          />

          <CarditemDashboard
            text={"Konsultasi"}
            icon={<VideoCameraFrontOutlinedIcon style={styleIcon} />}
          />
          <CarditemDashboard
            text={"Resep Obat"}
            icon={<VideoCameraFrontOutlinedIcon style={styleIcon} />}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default DashboardPage;
