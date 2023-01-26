import { SIGNUP_REQUEST, SIGNUP_ERROR, SIGNUP_SUCCESS, LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, RESET, SET_AUTH } from "../types/authActionTypes";
import axios from "axios";
export const signup = (data) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    let response = await axios.post(process.env.REACT_APP_SERVER + "user/signup", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data.message });
  } catch (e) {
    console.log(e);
    dispatch({ type: SIGNUP_ERROR, payload: e.response.data.message });
  }
};
export const login = (data) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    let response = await axios.post(process.env.REACT_APP_SERVER + "user/login", JSON.stringify(data), {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.cookie = `access_token=${response.data.token};SameSite=None;Secure`;
    localStorage.setItem("token", JSON.stringify(response.data.token));
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.message });
  } catch (e) {
    console.log(e);
    dispatch({ type: LOGIN_ERROR, payload: e.response.data.message });
  }
};
export const resetState = () => {
  return { type: RESET };
};
export const setAuth = (payload) => {
  return { type: SET_AUTH, payload };
};
