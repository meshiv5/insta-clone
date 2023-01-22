import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/actions/authActions";

export default function PrivateRoutes({ children }) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "user", { withCredentials: true })
      .then((res) => {
        dispatch(setAuth(true));
      })
      .catch((e) => {
        dispatch(setAuth(false));
        navigate("/login");
      });
  }, []);

  return children;
}
