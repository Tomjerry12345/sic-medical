import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ViewComfyAltIcon from '@mui/icons-material/ViewComfyAlt';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';

export const namedMenu = [
  {
    title: "Dashboard",
    router: "/",
    icon: <ViewComfyAltIcon style={{fontSize: "2em", color: "black"}} />,
  },
  {
    title: "Appointment",
    router: "/appointment",
    icon: <MeetingRoomIcon style={{fontSize: "2em", color: "black"}}/>,
  },
  {
    title: "Messages",
    router: "/messages",
    icon: <ChatIcon style={{fontSize: "2em", color: "black"}}/>,
  },
  {
    title: "Sign out",
    router: "/messages",
    icon: <LogoutIcon  style={{fontSize: "2em", color: "black"}} />,
  },
];

