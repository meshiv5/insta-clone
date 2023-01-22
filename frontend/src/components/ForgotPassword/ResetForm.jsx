import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Password/Reset.module.css";

export default function ResetForm() {
  const [email, setEmail] = useState("");
  const toast = useToast();
  function resetPassword(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SERVER + "user/resetpassword", { email: email })
      .then((res) => {
        toast({
          title: "Reset Password Success !",
          description: "Check Your Email To Find New Password !",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((e) => {
        console.log(e.response);
        toast({
          title: "Something Went Wrong !",
          description: e.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setEmail("");
      });
  }
  return (
    <div>
      <div className={styles.formDiv}>
        <img src={require("../../images/LoginPage/reset-password.png")} alt="logo" />
        <form action="post" onSubmit={resetPassword} className={styles.resetForm}>
          <p className={styles.desc}>Enter your email and we'll send you a link to get back into your account.</p>
          <input
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            required
            type="email"
            value={email}
            placeholder="Email"
          />
          <button>Send Login Link</button>
        </form>
        <div className={styles.orDiv}>
          <div></div>
          <p>OR</p>
          <div></div>
        </div>
        <Link className={styles.newAccount} to={"/signup"}>
          Create new Account
        </Link>
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
