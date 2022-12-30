import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Signup/Signup.module.css";

export default function SignupForm() {
  return (
    <div>
      <div className={styles.formDiv}>
        <img src={require("../../images/LoginPage/insta_log.png")} alt="logo" />
        <p className={styles.desc}>Sign up to see photos and videos from your friends.</p>
        <form className={styles.signupForm}>
          <input type="text" value="" placeholder="Mobile Number or Email" />
          <input type="text" value="" placeholder="Full Name" />
          <input type="text" value="" placeholder="Username" />
          <input type="text" value="" placeholder="Password" />
          <p>
            People who use our service may have uploaded your contact information to Instagram. <span className={styles.spanTag}>Learn More</span>
          </p>
          <p>
            By signing up, you agree to our <span className={styles.spanTag}>Terms , Privacy Policy</span> and{" "}
            <span className={styles.spanTag}>Cookies Policy .</span>
          </p>
          <button>Sign up</button>
        </form>
      </div>
      <div className={styles.signupLinkTab}>
        <p>
          Have an account? <Link to={"/login"}>Log in</Link>
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
