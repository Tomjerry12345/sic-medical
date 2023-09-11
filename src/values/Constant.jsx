import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export const menuAdmin = [
  {
    title: "Tambah Dokter",
    router: "/admin/tambah-dokter",
    icon: <MeetingRoomIcon style={{ fontSize: "2em", color: "black" }} />,
  },
  {
    title: "Sign out",
    router: "",
    icon: <LogoutIcon style={{ fontSize: "2em", color: "black" }} />,
  },
];

export const menuDokter = [
  {
    title: "Appointment",
    router: "/dokter/appointment",
    icon: <MeetingRoomIcon style={{ fontSize: "2em", color: "black" }} />,
  },
  {
    title: "Konsultasi",
    router: "/dokter/konsultasi",
    icon: <QuestionAnswerIcon style={{ fontSize: "2em", color: "black" }} />,
  },
  {
    title: "Rekam Medis",
    router: "/dokter/rekam-medis",
    icon: <ChatIcon style={{ fontSize: "2em", color: "black" }} />,
  },
  {
    title: "Sign out",
    router: "",
    icon: <LogoutIcon style={{ fontSize: "2em", color: "black" }} />,
  },
];

export const menuPasien = [
  {
    title: "Dashboard",
    router: "/pasien",
    icon: <DashboardIcon style={{ fontSize: "2em", color: "black" }} />,
  },
  {
    title: "Appointment",
    router: "/pasien/appointment",
    icon: <MeetingRoomIcon style={{ fontSize: "2em", color: "black" }} />,
  },
  {
    title: "Konsultasi",
    router: "/pasien/konsultasi",
    icon: <QuestionAnswerIcon style={{ fontSize: "2em", color: "black" }} />,
  },
  {
    title: "Sign out",
    router: "",
    icon: <LogoutIcon style={{ fontSize: "2em", color: "black" }} />,
  },
];
