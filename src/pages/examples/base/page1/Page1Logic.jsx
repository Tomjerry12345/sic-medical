import { useState } from "react";
const Page1Logic = () => {
  const [test, setTest] = useState("");

  const onClicked = () => {
    setTest("onClicked....");
  };

  return {
    test,
    onClicked,
  };
};

export { Page1Logic };
