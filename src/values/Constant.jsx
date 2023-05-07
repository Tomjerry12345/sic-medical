import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export const namedMenu = [
  {
    title: "Dashboard",
    router: "/",
    icon: <InboxIcon />,
  },
  {
    title: "Appointment",
    router: "/appointment",
    icon: <MailIcon />,
  },
  {
    title: "Messages",
    router: "/messages",
    icon: <MailIcon />,
  },
];
