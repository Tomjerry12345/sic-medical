import { Box, Grid, Stack, Typography } from "@mui/material";

const DashboardPage = () => {

  return (
    <>
      <Stack>
        <Typography
          sx={{
            fontFamily: "lato",
            fontSize: {
              sm: "24px",
              md: "30px",
            },
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
    </>
  );
};

export default DashboardPage;
