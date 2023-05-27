import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Ecoomerce Redux States
import {
GET_CONTACT_REQUEST,
UPDATE_CONTACT,
ADD_CONTACT_REQUEST,
DELETE_CONTACT
} from "./actionType";

import {
getCategoryActionResponseError,
getCategoryActionResponseSuccess,
updateCategoryFail,
updateCategorySuccess,
addCategoryFail,
addCategorySuccess,
deleteCustomerFail,
deleteCustomerSuccess
} from "./action";

//Include Both Helper File with needed methods
import {
 getcategoryAPICALL,
 addcategoryAPICALL,
 updatecategoryAPICALL,
 deletecontactAPICALL
} from "../../helpers/fakebackend_helper";

function* getCategories() {
  try {
    const response = yield call(getcategoryAPICALL);
    if (response && response?.data?.status === 1) {
      yield put(getCategoryActionResponseSuccess(response?.data?.data));
    }else{
      yield put(getCategoryActionResponseError(response?.data?.message));

    }
  } catch (error) {
    yield put(getCategoryActionResponseError(error));
  }
}


function* onAddNewCategory({ payload: reqbody }) {
  try {
    const response = yield call(addcategoryAPICALL, reqbody);
    if (response && response?.data?.status === 1) {
      yield put(addCategorySuccess(response));
      toast.success("Saved Successfully", { autoClose: 3000 });
    }else{
      yield put(addCategoryFail(response?.data?.message));
      toast.error(response?.data?.message, { autoClose: 3000 });
    }
  } catch (error) {
    yield put(addCategoryFail(error));
    toast.error("Failed to save record", { autoClose: 3000 });
  }
}
function* onDeleteCustomer({ payload: reqbody }) {
  try {
    const response = yield call(deletecontactAPICALL, reqbody);
    if (response && response?.data?.status === 1) {
      yield put(deleteCustomerSuccess(response?.data?.data));
      toast.success("Updated Successfully", { autoClose: 3000 });
    }else{
      yield put(deleteCustomerFail(response?.data?.message));
      toast.error(response?.data?.message, { autoClose: 3000 });
    }
  } catch (error) {
    yield put(deleteCustomerFail(error));
    toast.error("Failed to update record", { autoClose: 3000 });
  }
}

function* onUpdateCategory({ payload: reqbody }) {
  try {
    const response = yield call(updatecategoryAPICALL, reqbody);
    if (response && response?.data?.status === 1) {
      yield put(updateCategorySuccess(response?.data?.data));
      toast.success("Updateded Successfully", { autoClose: 3000 });
    }else{
      yield put(updateCategoryFail(response?.data?.message));
      toast.error(response?.data?.message, { autoClose: 3000 });
    }
  } catch (error) {
    yield put(updateCategoryFail(error));
    toast.error("Failed to update record", { autoClose: 3000 });
  }
}



export function* watchGetCategory() {
  yield takeEvery(GET_CONTACT_REQUEST, getCategories);
}


export function* watchUpdateCategory() {
  yield takeEvery(UPDATE_CONTACT, onUpdateCategory);
}

export function* watchAddNewCategory() {
  yield takeEvery(ADD_CONTACT_REQUEST, onAddNewCategory);
}

export function* watchDeleteCustomer() {
  yield takeEvery(DELETE_CONTACT, onDeleteCustomer);
}

function* categorySaga() {
  yield all([
    fork(watchGetCategory),
    fork(watchUpdateCategory),
    fork(watchAddNewCategory),
    fork(watchDeleteCustomer),
  ]);
}

export default categorySaga;
