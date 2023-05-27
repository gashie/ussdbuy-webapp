import { useEffect, useState } from "react";
import { LoggedinUser } from "../../helpers/api_helper";
import { useSelector, useDispatch } from "react-redux";
const useProfile = () => {
  const userProfileSession = LoggedinUser();
    const { userInfo, isloggedIn,loadingUserinfo,errorUserinfo } = useSelector((state) => ({
    userInfo: state.Login.userInfo.data,
    loadingUserinfo: state.Login.loadingUserinfo,
    errorUserinfo: state.Login.errorUserinfo,
    isloggedIn:state.Login.isloggedIn
  }));
  var token = userProfileSession

  useEffect(() => {
    const userProfileSession = LoggedinUser();
  }, []);


  return { userInfo, loadingUserinfo,isloggedIn };
};

export { useProfile };

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import { getMe } from "../../store/auth/login/actions";

// const useProfile = () => {
//   const dispatch = useDispatch();
//   const { userInfo, isloggedIn,loadingUserinfo,errorUserinfo } = useSelector((state) => ({
//     userInfo: state.Login.userInfo.data,
//     loadingUserinfo: state.Login.loadingUserinfo,
//     errorUserinfo: state.Login.errorUserinfo,
//     isloggedIn:state.Login.isloggedIn
//   }));
//   dispatch(getMe());
//   const [loading, setLoading] = useState(loadingUserinfo);
//   const [userProfile, setUserProfile] = useState(userInfo);

//   useEffect(() => {
   
//     dispatch(getMe());
//     setUserProfile(userInfo);
//     setLoading(loadingUserinfo);
//   }, [dispatch,userInfo,loadingUserinfo]);


//   return { userProfile, loading,isloggedIn };
// };

// export { useProfile };