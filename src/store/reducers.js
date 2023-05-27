import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";


//API Key
import Category from "./category/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  Category,
});

export default rootReducer;
