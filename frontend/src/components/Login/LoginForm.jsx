import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Login/Login.module.css";
export default function LoginForm() {
  return (
    <div>
      <div className={styles.formDiv}>
        <img src={require("../../images/LoginPage/insta_log.png")} alt="logo" />
        <form className={styles.loginForm}>
          <input type="text" value="" placeholder="Phone number , username or email" />
          <input type="text" value="" placeholder="Password" />
          <button>Log in</button>
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
