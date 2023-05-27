import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useSelector, useDispatch } from "react-redux";

// import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser,getMe } from "../store/actions";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  // const { userInfo, loadingUserinfo, isloggedIn } = useProfile();
  const { userInfo, isloggedIn,loadingUserinfo,errorUserinfo } = useSelector((state) => ({
    userInfo: state.Login.userInfo,
    loadingUserinfo: state.Login.loadingUserinfo,
    errorUserinfo: state.Login.errorUserinfo,
    isloggedIn:state.Login.isloggedIn
  }));


  /*
    Navigate is un-auth access protected routes via url
    */
    if (!loadingUserinfo && !isloggedIn) {
      return (
        <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
      );
    }
  
    if (errorUserinfo) {
      return (
        <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
      );
    }


  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };