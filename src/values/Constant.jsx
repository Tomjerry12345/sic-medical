import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const namedMenu = [
  {
    title: "Dashboard",
    router: "/",
    icon: <DashboardIcon style={{ fontSize: "2em", color: "black" }} />,
  },
  {
    title: "Appointment",
    router: "/appointment",
    icon: <MeetingRoomIcon style={{ fontSize: "2em", color: "black" }} />,
  },
  {
    title: "Konsultasi",
    router: "/konsultasi",
    icon: <ChatIcon style={{ fontSize: "2em", color: "black" }} />,
  },
  {
    title: "Sign out",
    router: "/messages",
    icon: <LogoutIcon style={{ fontSize: "2em", color: "black" }} />,
  },
];
