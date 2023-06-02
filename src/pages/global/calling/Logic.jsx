import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { log } from "../../../values/Utilitas";
import { SocketContext } from "../../../services/Context";

const Logic = () => {
  const [state, setState] = useState("");

  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    startStream,
    callUser,
    answerCall,
  } = useContext(SocketContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    log("location.state", location.state);
    if (location.state === null) {
      // answerCall();
    } else {
      callUser(location.state.idCall);
      setState(location.state);
    }
    startStream();
  }, []);
  return {
    value: { state, name, myVideo, userVideo, callEnded, stream, call, callAccepted },
    func: {},
  };
};

export default Logic;
