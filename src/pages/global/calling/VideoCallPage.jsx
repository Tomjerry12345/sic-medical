import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";
import { SocketContext } from "services/Context";
import { log } from "values/Utilitas";
import { useLocation } from "react-router-dom";
import FirebaseServices from "services/FirebaseServices";
import { Box, Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    // [theme.breakpoints.down("xs")]: {
    //   width: "90%",
    // },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const VideoCallPage = () => {
  const classes = useStyles();
  const { startStream, callUser, answerCall, stream, leaveCall } = useContext(SocketContext);

  const [data, setData] = useState();

  const location = useLocation();

  const [i, setI] = useState(0);
  const fs = FirebaseServices();

  useEffect(() => {
    startStream();
  }, []);

  useEffect(() => {
    window.history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function (event) {
      //  window.location.replace(`YOUR URL`);
      leaveCall();
      window.location.replace("http://localhost:3000/");
    });
  }, []);

  useEffect(() => {
    if (i === 3) {
      if (location.state !== null) {
        if (location.state.type === "answer") {
          answerCall();
        } else {
          callUser(location.state.idCall);
        }
        setData(location.state);
      }
    }

    setI((prev) => prev + 1);
  }, [stream]);

  return (
    <div className={classes.wrapper}>
      <VideoPlayer data={data} />
      <Box display="flex">
        <Button variant="outlined" color="error">
          Matikan
        </Button>
      </Box>
    </div>
  );
};

export default VideoCallPage;
