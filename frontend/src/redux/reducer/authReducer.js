import axios from "axios";

import { SIGNUP_REQUEST, SIGNUP_ERROR, SIGNUP_SUCCESS, LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, RESET, SET_AUTH } from "../types/authActionTypes";
let initialState = {
  isAuth: false,
  signupLoading: false,
  signupError: false,
  signupSuccess: false,
  signupMessage: "",
  loginLoading: false,
  loginError: false,
  loginSuccess: false,
  loginMessage: "",
};


export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST: {
      return { ...state, signupLoading: true };
    }
    case SIGNUP_ERROR: {
      return { ...state, signupError: true, signupLoading: false, signupMessage: payload };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, signupLoading: false, signupError: false, signupSuccess: true, signupMessage: payload };
    }
    case LOGIN_REQUEST: {
      return { ...state, loginLoading: true };
    }
    case LOGIN_ERROR: {
      return { ...state, loginLoading: false, loginError: true, loginMessage: payload };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loginLoading: false, loginError: false, loginSuccess: true, loginMessage: payload, isAuth: true };
    }
    case SET_AUTH: {
      return { ...state, isAuth: payload };
    }
    case RESET: {
      return {
        isAuth: state.isAuth,
        signupLoading: false,
        signupError: false,
        signupSuccess: false,
        signupMessage: "",
        loginLoading: false,
        loginError: false,
        loginSuccess: false,
        loginMessage: "",
      };
    }
    default: {
      return state;
    }
  }
};
