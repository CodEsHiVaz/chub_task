import axios from "axios";

import {
  GET_DATA_ERROR,
  GET_DATA_LOADING,
  GET_DATA_SUCCESS,
  GET_LOGIN_ERROR,
  GET_LOGIN_LOADING,
  GET_LOGIN_SUCCESS,
  GET_SEARCH_ERROR,
  GET_SEARCH_LOADING,
  GET_SEARCH_SUCCESS,
  GET_SIGNUP_ERROR,
  GET_SIGNUP_LOADING,
  GET_SIGNUP_SUCCESS,
  LOGOUT,
  POST_DATA_ERROR,
  POST_DATA_LOADING,
  POST_DATA_SUCCESS,
  SET_DELETE_ERROR,
  SET_DELETE_LOADING,
  SET_DELETE_SUCCESS,
  SET_EDIT_ERROR,
  SET_EDIT_LOADING,
  SET_EDIT_SUCCESS,
  SORTING,
} from "../ActionType/action.type";

export const getsearch = () => (dispatch) => {
  dispatch({ type: GET_DATA_LOADING });
  axios
    .get(`https://api.escuelajs.co/api/v1/products`)
    .then((resp) => {
      dispatch({ type: GET_DATA_SUCCESS, payload: resp.data });
    })
    .catch((e) => {
      dispatch({ type: GET_DATA_ERROR });
    });
};

export const getdata = () => (dispatch) => {
  dispatch({ type: GET_DATA_LOADING });
  axios
    .get("https://api.escuelajs.co/api/v1/products")
    .then((resp) => {
      dispatch({ type: GET_DATA_SUCCESS, payload: resp.data });
    })
    .catch((e) => {
      dispatch({ type: GET_DATA_ERROR });
    });
};
export const login = (payload) => (dispatch) => {
  axios
    .get("https://fake-restful-api-production-aa88.up.railway.app/users")
    .then((resp) => {
      const data = resp.data;
      let flag = false;
      for (let i = 0; i < data.length; i++) {
        if (
          payload.email === data[i].email &&
          payload.password === data[i].password
        ) {
          flag = true;
        }
      }

      if (flag) {
        let token = 456876552566;
        localStorage.setItem("token", token);
        dispatch({ type: GET_LOGIN_SUCCESS });
      } else {
        console.log("user not found");
      }
    })
    .catch((e) => {
      // dispatch({ type: GET_DATA_ERROR });
    });
};
export const loguot = () => (dispatch) => {
  // let token = null;
  console.log("user logged out");
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};

export const signup = (payload) => (dispatch) => {
  // GET_SIGNUP_ERROR,
  //   GET_SIGNUP_LOADING,
  //   GET_SIGNUP_SUCCESS,
  axios
    .post("https://fake-restful-api-production-aa88.up.railway.app/users", {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    })
    .then((res) => {
      console.log(".then  res", res);
      dispatch({ type: GET_SIGNUP_SUCCESS });
    })
    .catch((err) => console.log(err));
};
export const deleteData = (id) => (dispatch) => {
  console.log("deleteData  id", id);

  dispatch({ type: SET_DELETE_LOADING });
  axios
    .delete(`https://api.escuelajs.co/api/v1/products/${id}`)
    .then((res) => {
      console.log(".then  res", res);

      dispatch({ type: SET_DELETE_SUCCESS, id });
    })
    .catch((err) => dispatch({ type: SET_DELETE_ERROR }));
};
export const editdata = (payload) => (dispatch) => {
  console.log("editdata  payload", payload);
  dispatch({ type: SET_EDIT_LOADING });
  axios
    .put(`https://api.escuelajs.co/api/v1/products/${payload.id}`, payload)
    .then((res) => {
      console.log(".then  res", res.data);
      dispatch({ type: SET_EDIT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: SET_EDIT_ERROR }));
};

export const sortby = (val) => (dispatch) => {
  console.log("editdata  payload", val);

  dispatch({ type: SORTING, val });
};

export const searchData = (searchby, query) => (dispatch) => {
  console.log("editdata  payload", searchby, query);
  axios
    .get(`https://api.escuelajs.co/api/v1/products/`)
    .then((res) => {
      console.log(".then  res", res.data);
      // dispatch({ type: SET_EDIT_SUCCESS, payload: res.data });
      dispatch({
        type: GET_SEARCH_SUCCESS,
        payload: res.data,
        searchby,
        query,
      });
    })
    .catch((err) => dispatch({ type: SET_EDIT_ERROR }));

  // axios
  //   .get(`https://api.escuelajs.co/api/v1/products/${payload.id}`, payload)
  //   .then((res) => {
  //     console.log(".then  res", res.data);
  //     dispatch({ type: SET_EDIT_SUCCESS, payload: res.data });
  //   })
  //   .catch((err) => dispatch({ type: SET_EDIT_ERROR }));
};
