import { Button } from "antd";
import { Page1Logic } from "./Page1Logic";

const Page1 = () => {
  const { test, onClicked } = Page1Logic();
  return (
    <div>
      <h2>Page1</h2>
      <h5>{test}</h5>
      <Button onClick={onClicked}>Clicked</Button>
    </div>
  );
};

export default Page1;
