import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/App";
import LoginPage from "../pages/autentikasi/login/LoginPage";
import RegisterPage from "../pages/autentikasi/register/RegisterPage";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
