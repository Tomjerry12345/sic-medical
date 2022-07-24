import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasePage from "../pages/examples/base/BasePage";
import Page1 from "../pages/examples/base/page1/Page1";
import Page2 from "../pages/examples/base/page2/Page2";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route index element={<Page1 />} />
          <Route path="page2" element={<Page2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
