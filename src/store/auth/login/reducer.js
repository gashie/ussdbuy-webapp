import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  RESET_LOGIN_FLAG,
  GET_ME_SUCCESS,
  GET_ME_FAIL
} from "./actionTypes";

const initialState = {
  errorMsg: "",
  loading: false,
  error: false,
  userInfo: {},
  isloggedIn:false,
  loggedIn:false,
  errorUserinfo:null,
  loadingUserinfo:true,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        loggedIn:true,
        error: false,
      };
      break;
    case LOGOUT_USER:
      state = { ...state, isUserLogout: false };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state, isUserLogout: true };
      break;
    case GET_ME_SUCCESS:
        return {
          ...state,
          loadingUserinfo: false,
          userInfo: action.payload,
          isloggedIn:true,
          errorUserinfo: null,
        };
    case GET_ME_FAIL:
          return {
            ...state,
            loadingUserinfo: false,
            errorUserinfo: action.payload,
          };
    case API_ERROR:
      state = {
        ...state,
        errorMsg: action.payload,
        loading: true,
        error: true,
        isUserLogout: false,
      };
      break;
    case RESET_LOGIN_FLAG:
      state = {
        ...state,
        errorMsg: null,
        loading: false,
        error: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
