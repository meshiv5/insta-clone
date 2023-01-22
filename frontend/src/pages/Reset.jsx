import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import ResetForm from "../components/ForgotPassword/ResetForm";
import useMedia from "../hooks/useMedia";
import { setAuth } from "../redux/actions/authActions";
import styles from "../styles/Signup/Signup.module.css";
export default function Reset() {
  const isSmallHeight = useMedia("(max-height: 900px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <ResetForm />
      {isSmallHeight || <Footer />}
    </div>
  );
}
