import { Link } from "react-router-dom";

const NavComponent = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Page1</Link>
        </li>
        <li>
          <Link to="/page2">Page2</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavComponent;
