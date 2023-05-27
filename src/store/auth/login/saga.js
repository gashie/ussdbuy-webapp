import { call, put, select, takeEvery, all,fork } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER,GET_ME} from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess,getMeSuccess,getMeError } from "./actions";

//Include Both Helper File with needed methods
import {
  LoginAPICALL,
  getLoggedInUser
} from "../../../helpers/fakebackend_helper";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(LoginAPICALL, user);
    if (response && response?.data?.status === 1) {
      
      history('/dashboard')
      try {
        const response = yield call(getLoggedInUser);
        yield put(getMeSuccess(response?.data?.data));
    
      } catch (error) {
        yield put(getMeError(error.response?.data?.message));
      }
      yield put(loginSuccess(response?.data?.message));
    } else if(response && response?.data?.status === 0) {
      console.log('orr zero');
      yield put(apiError(response?.data?.message));
    } else {
      console.log('or failed');
      yield put(apiError(response?.data?.message));
    }
  } catch (error) {
    console.log('nad request');
    yield put(apiError(error.response.data.message));
  }
}
function* getLoggedUserSaga() {
  try {
    const response = yield call(getLoggedInUser);
    yield put(getMeSuccess(response?.data?.data));

  } catch (error) {
    yield put(getMeError(error.response?.data?.message));
  }
}

function* logoutUser() {
  // try {
  //   sessionStorage.removeItem("authUser");
  //   if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //     const response = yield call(fireBaseBackend.logout);
  //     yield put(logoutUserSuccess(LOGOUT_USER, response));
  //   } else {
  //     yield put(logoutUserSuccess(LOGOUT_USER, true));
  //   }
  // } catch (error) {
  //   yield put(apiError(LOGOUT_USER, error));
  // }
}

function* authSagaCaller() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(GET_ME, getLoggedUserSaga);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* authSaga() {
  yield all([
    fork(authSagaCaller),
  ]);
}

export default authSaga;
