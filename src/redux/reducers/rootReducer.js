import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import loginReducer from "./loginReducer";
// import auth from "./auth";

export default combineReducers({
  todos: todoReducer,
  auth: loginReducer,
});
