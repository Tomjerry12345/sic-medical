import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { log } from "../values/Utilitas";
import FirebaseServices from "./FirebaseServices";

const SocketContext = createContext();

const socket = io("http://localhost:5000");
// const socket = io("https://warm-wildwood-81069.herokuapp.com");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  const fs = FirebaseServices();

  useEffect(() => {
    onGetId();
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const onGetId = () => {
    socket.on("me", (id) => {
      setMe(id);
      updateCallId(id);
    });
  };

  const updateCallId = async (id) => {
    const user = await fs.getCurrentUser();
    const resultPasien = await fs.getDataQuery("user", "email", user.email);
    const resultDokter = await fs.getDataQuery("dokter", "email", user.email);

    if (resultPasien.length > 0) {
      await fs.updateDocX("user", resultPasien[0].id, {
        id_call: id,
      });
    } else {
      await fs.updateDocX("dokter", resultDokter[0].id, {
        id_call: id,
      });
    }
  };

  const startStream = () => {
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);

          if (myVideo.current) {
            myVideo.current.srcObject = currentStream;
          }
        });
    } catch (e) {
      log({ e });
    }
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);

    if (connectionRef.current) {
      connectionRef.current = peer;
    }
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", { userToCall: id, signalData: data, from: me, name });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        log({ currentStream });
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    if (connectionRef.current) {
      connectionRef.current = peer;
    }
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        callUser,
        leaveCall,
        answerCall,
        startStream,
        onGetId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
