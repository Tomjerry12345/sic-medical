import { combineReducers } from "redux";
import notifSlice from "./action/action.reducer";

const RootRedux = () =>
  combineReducers({
    notif: notifSlice
  });

export default RootRedux;
