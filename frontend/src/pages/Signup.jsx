import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import SignupForm from "../components/Signup/SignupForm";
import useMedia from "../hooks/useMedia";
import { setAuth } from "../redux/actions/authActions";
import styles from "../styles/Signup/Signup.module.css";

export default function Signup() {
  const { isAuth } = useSelector((store) => store.auth);
  const isSmallHeight = useMedia("(max-height: 900px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SERVER + "user",

        {
          headers: {
            access_token: JSON.parse(localStorage.getItem("token")),
          },
          withCredentials: true,
        }
      )
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
      <SignupForm />
      {isSmallHeight || <Footer />}
    </div>
  );
}
