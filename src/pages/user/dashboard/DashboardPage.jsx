import { Grid, Stack, Toolbar, Typography, } from "@mui/material";
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
const DashboardPage = () => {
  return (
    <>
      {/* <Toolbar /> */}

      {/* tulisan dashboard */}
      <Stack>
        <Typography
          style={{
            fontFamily: "lato",
            lineHeight: "43px",
            fontSize: "35px",
          }}
        >
          Dashboard
        </Typography>
      </Stack>

      <Stack style={{
        display: "flex"
      }} direction="row">
        {/* images */}
        <Grid style={{
          margin: "auto",
        }}>
          <img src="images/gambar.png" width="350px" height="350px"  />
        </Grid>
        {/* lorem */}
        <Grid style={{
          width: "405px",
          margin: "auto"            
          }}>
          <Typography style={{
            fontFamily: "lato",
            fontSize: "24px"
          }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type</Typography>
        </Grid>
      </Stack>

      <Stack >
        {/* Feature */}
        <Typography style={{
          fontFamily: "lato",
          fontSize: "32px",
          marginTop: "-20px"
        }} mb={4}>Feature</Typography>

        <Stack direction="row" spacing={14} style={{
          justifyContent: "space-around",
          
         
        }}>
          {/* icon */}
          <Stack style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            width: "180px",
            height: "140px",

          }}>
          <VideoCameraFrontOutlinedIcon style={{
             width: "100px",
             height: "70px",
             margin: "auto",
          }} /><h3 style={{
            textAlign: "center",
            marginTop: "-10px",
            fontFamily: "lato"
            
          }}>Lorem Ipsum</h3>
          </Stack>

          {/* icon 2 */}
          <Stack style={{
             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
             width: "180px",
             height: "140px",

          }}>
          <VideoCameraFrontOutlinedIcon style={{
             width: "100px",
             height: "70px",
             margin: "auto",
          }} /><h3 style={{
            textAlign: "center",
            marginTop: "-10px",
            fontFamily: "lato"
            
          }}>Lorem Ipsum</h3>
          </Stack>

          {/* icon 3 */}
          <Stack style={{
             boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
             width: "180px",
             height: "140px",

          }}>
          <VideoCameraFrontOutlinedIcon style={{
             width: "100px",
             height: "70px",
             margin: "auto",
          }} /><h3 style={{
            textAlign: "center",
            marginTop: "-10px",
            fontFamily: "lato"
            
          }}>Lorem Ipsum</h3>
          </Stack>
         
        </Stack>
      </Stack>
    </>
  );
};

export default DashboardPage;
