import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/App";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
