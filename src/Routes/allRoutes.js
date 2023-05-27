import React from "react";
import { Navigate } from "react-router-dom";


//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";



//MANAGE
import ManageCategories from "../pages/Manage/customers/customers";


const authProtectedRoutes = [
 //Manage routes
 { path: "/manage-contacts", component: <ManageCategories /> },


  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/manage-contacts" />,
  },
  { path: "*", component: <Navigate to="/manage-contacts" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  
];

export { authProtectedRoutes, publicRoutes };
