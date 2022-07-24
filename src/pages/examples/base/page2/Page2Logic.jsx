import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadUsersAsync from "../../../../redux/users/users.thunks";

const Page2Logic = () => {
  const dispatch = useDispatch();
  const { isLoading, users, errorMessage } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadUsersAsync());
  }, [dispatch]);

  return { isLoading, users, errorMessage };
};

export default Page2Logic;
