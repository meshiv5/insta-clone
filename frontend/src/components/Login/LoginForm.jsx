import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, resetState, setAuth } from "../../redux/actions/authActions";
import styles from "../../styles/Login/Login.module.css";
export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { loginLoading, loginError, loginSuccess, loginMessage } = useSelector((store) => store.auth);
  useEffect(() => {
    if (loginSuccess) {
      toast({
        title: "Logged In Successfully !",
        description: "Redirecting to Home page",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      dispatch(setAuth(true));
      navigate("/");
    } else if (loginError) {
      toast({
        title: "Something Went Wrong !",
        description: loginMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    return () => dispatch(resetState());
  }, [loginError, loginSuccess]);
  function handleFormChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }
  function handleLogin() {
    dispatch(login(formData));
    setFormData({ username: "", password: "" });
  }
  return (
    <div>
      <div className={styles.formDiv}>
        <img src={require("../../images/LoginPage/insta_log.png")} alt="logo" />
        <form autoComplete="false" className={styles.loginForm}>
          <input required onChange={handleFormChange} name="username" type="text" value={formData.username} placeholder="Username" />
          <input required onChange={handleFormChange} name="password" type="password" value={formData.password} placeholder="Password" />
          <button onClick={handleLogin} disabled={loginLoading}>
            Log in
          </button>
        </form>
        <div className={styles.orDiv}>
          <div></div>
          <p>OR</p>
          <div></div>
        </div>
        <div className={styles.forgetPassword}>
          <Link to={"/reset-password"}>Forgot Password ?</Link>
        </div>
      </div>
      <div className={styles.signupLinkTab}>
        <p>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </p>
      </div>
      <div className={styles.getAppTab}>
        <p>Get the app.</p>
        <div className={styles.getAppLinks}>
          <img
            onClick={() => {
              window.open("https://play.google.com/store/apps/details?id=com.instagram.android");
            }}
            src={require("../../images/LoginPage/googleplay.png")}
            alt="google play"
          />
          <img
            onClick={() => {
              window.open(
                "ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1040"
              );
            }}
            src={require("../../images/LoginPage/microsoft.png")}
            alt="microsoft"
          />
        </div>
      </div>
    </div>
  );
}
