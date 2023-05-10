import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/App";
import LoginPage from "../pages/autentikasi/login/LoginPage";
import RegisterPage from "../pages/autentikasi/register/RegisterPage";
import UserPage from "../pages/user/UserPage";
import DashboardPage from "../pages/user/dashboard/DashboardPage";
import AppointmentPage from "../pages/user/appointment/AppointmentPage";
import AddAppointment from "../pages/user/appointment/section/AddAppointmentPage";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} >
          <Route index element={<DashboardPage />} />
          <Route path="appointment" element={<AppointmentPage />} />
          <Route path="add-appointment" element={<AddAppointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
