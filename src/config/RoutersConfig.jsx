import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "pages/App";
import LoginPage from "pages/autentikasi/login/LoginPage";
import RegisterPage from "pages/autentikasi/register/RegisterPage";
import DashboardPage from "pages/pasien/dashboard/DashboardPage";
import AppointmentPage from "pages/pasien/appointment/AppointmentPage";
import AddAppointment from "pages/pasien/appointment/section/add/AddAppointmentPage";
import KonsultasiPasien from "pages/pasien/konsultasi/KonsultasiPasien";
import ChatPasien from "pages/pasien/chat/ChatPasien";
import ConnectPasien from "pages/pasien/connect/ConnectPasien";
import NotifCallingPasien from "pages/pasien/notif/NotifCallingPasien";
import ResepPasien from "pages/pasien/resep/ResepPasien";
import DokterPage from "pages/dokter/DokterPage";
import KonsultasiDokter from "pages/dokter/konsultasi/KonsultasiDokter";
import ChatDokter from "pages/dokter/chat/ChatDokter";
import ConnectDokter from "pages/dokter/connect/ConnectDokter";
import NotifCallingDokter from "pages/dokter/notif/NotifCallingDokter";
import ResepDokter from "pages/dokter/resep/ResepDokter";
import AppointmentPageDokter from "pages/dokter/appointment/AppointmentPageDokter";
import PasienPage from "pages/pasien/PasienPage";
import EditAppointment from "pages/pasien/appointment/section/edit/EditAppointmentPage";
import VideoCallPage from "pages/global/calling/VideoCallPage";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pasien" element={<PasienPage />}>
          <Route index element={<DashboardPage />} />
          <Route path="appointment">
            <Route index element={<AppointmentPage />} />
            <Route path="add" element={<AddAppointment />} />
            <Route path="edit" element={<EditAppointment />} />
          </Route>

          <Route path="konsultasi">
            <Route index element={<KonsultasiPasien />} />
            <Route path="chat" element={<ChatPasien />} />
            <Route path="calling" element={<VideoCallPage />} />
            <Route path="connect" element={<ConnectPasien />} />
            <Route path="notif" element={<NotifCallingPasien />} />
            <Route path="resep" element={<ResepPasien />} />
          </Route>
        </Route>
        <Route path="/dokter" element={<DokterPage />}>
          <Route index path="appointment" element={<AppointmentPageDokter />} />
          <Route path="konsultasi">
            <Route index element={<KonsultasiDokter />} />
            <Route path="chat" element={<ChatDokter />} />
            {/* <Route path="calling" element={<CallingPage />} /> */}
            <Route path="calling" element={<VideoCallPage />} />
            <Route path="connect" element={<ConnectDokter />} />
            <Route path="notif" element={<NotifCallingDokter />} />
            <Route path="resep" element={<ResepDokter />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
