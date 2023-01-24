import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Iphone from "../components/Login/Iphone";
import LoginForm from "../components/Login/LoginForm";
import useMedia from "../hooks/useMedia";
import { setAuth } from "../redux/actions/authActions";
import styles from "../styles/Login/Login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallWidth = useMedia("(max-width: 800px)");
  const isSmallHeight = useMedia("(max-height: 750px)");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "user", { withCredentials: true })
      .then((res) => {
        dispatch(setAuth(true));
        navigate("/");
      })
      .catch((e) => {
        dispatch(setAuth(false));
      });
  }, []);
  return (
    <div className={styles.mainDiv}>
      {isSmallWidth || <Iphone />}
      <LoginForm />
      {isSmallHeight || <Footer />}
    </div>
  );
}
