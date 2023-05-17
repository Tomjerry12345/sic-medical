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
            fontSize: "24px",
          }}
        >
          Dashboard
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
                  sm: "344px",
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
                  md: "24px",
                },
                margin: "auto",
              }}
            >
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when
              an unknown printer took a galley of type and scrambled it to make a type
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
              md: "32px",
            },
            marginTop: "-20px",
          }}
          mb={4}
        >
          Feature
        </Typography>

        <Stack
          direction="row"
          spacing={14}
          style={{
            justifyContent: "space-around",
          }}
        >
          <CarditemDashboard
            text={"Video Call"}
            icon={<VideoCameraFrontOutlinedIcon style={styleIcon} />}
          />

          <CarditemDashboard
            text={"Konsultasi"}
            icon={<VideoCameraFrontOutlinedIcon style={styleIcon} />}
          />
          <CarditemDashboard
            text={"Rumah sakit"}
            icon={<VideoCameraFrontOutlinedIcon style={styleIcon} />}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default DashboardPage;
