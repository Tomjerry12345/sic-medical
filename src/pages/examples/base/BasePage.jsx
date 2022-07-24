import { Outlet } from "react-router-dom";
import NavComponent from "../../../component/NavComponent";

const BasePage = () => {
  return (
    <div>
      <NavComponent />
      <hr />
      <Outlet />
    </div>
  );
};

export default BasePage;
