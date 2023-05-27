import {
GET_CONTACT_FAIL,
GET_CONTACT_REQUEST,
GET_CONTACT_SUCCESS,
ADD_CONTACT_FAIL,
ADD_CONTACT_REQUEST,
ADD_CONTACT_SUCCESS,
UPDATE_CONTACT,
UPDATE_CONTACT_FAIL,
UPDATE_CONTACT_SUCCESS,
DELETE_CONTACT,
DELETE_CONTACT_FAIL,
DELETE_CONTACT_SUCCESS,
} from "./actionType";

// common success
export const getCategoryActionResponseSuccess = (data) => ({
  type: GET_CONTACT_SUCCESS,
  payload: data,
});
// common error
export const getCategoryActionResponseError = (error) => ({
  type: GET_CONTACT_FAIL,
  payload: error,
});

export const getCategoryAction = () => ({
  
  type: GET_CONTACT_REQUEST,
});



export const updateCategory = customer => ({
  type: UPDATE_CONTACT,
  payload: customer,
});

export const updateCategorySuccess = customer => ({
  type: UPDATE_CONTACT_SUCCESS,
  payload: customer,
});

export const updateCategoryFail = error => ({
  type: UPDATE_CONTACT_FAIL,
  payload: error,
});

export const addNewCategory = payload => ({
  type: ADD_CONTACT_REQUEST,
  payload: payload,
});

export const addCategorySuccess = customer => ({
  type: ADD_CONTACT_SUCCESS,
  payload: customer,
});

export const addCategoryFail = error => ({
  type: ADD_CONTACT_FAIL,
  payload: error,
});

export const deleteCustomer = customer => ({
  type: DELETE_CONTACT,
  payload: customer,
});

export const deleteCustomerSuccess = customer => ({
  type: DELETE_CONTACT_SUCCESS,
  payload: customer,
});

export const deleteCustomerFail = error => ({
  type: DELETE_CONTACT_FAIL,
  payload: error,
});