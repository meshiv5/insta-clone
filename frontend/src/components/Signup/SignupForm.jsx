import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetState, signup } from "../../redux/actions/authActions";
import styles from "../../styles/Signup/Signup.module.css";

export default function SignupForm() {
  const [formData, setFormData] = useState({ email: "", name: "", username: "", password: "" });
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { signupLoading, signupError, signupSuccess, signupMessage } = useSelector((store) => store.auth);
  useEffect(() => {
    if (signupSuccess) {
      toast({
        title: "Signed Up Successfully !",
        description: "redirecting to login page",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else if (signupError) {
      toast({
        title: "Something Went Wrong !",
        description: signupMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    return () => dispatch(resetState());
  }, [signupSuccess, signupError]);
  function handleFormChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    dispatch(signup(formData));

    setFormData({ email: "", name: "", username: "", password: "" });
  }
  return (
    <div>
      <div className={styles.formDiv}>
        <img src={require("../../images/LoginPage/insta_log.png")} alt="logo" />
        <p className={styles.desc}>Sign up to see photos and videos from your friends.</p>
        <form autocomplete="off" action="post" className={styles.signupForm} onSubmit={handleFormSubmit}>
          <input required type="email" onChange={handleFormChange} name="email" value={formData.email} placeholder="Mobile Number or Email" />
          <input pattern="[a-Z]{4,}" required type="text" onChange={handleFormChange} name="name" value={formData.name} placeholder="Full Name" />
          <input
            pattern="[a-Z0-9].{4,}"
            required
            type="text"
            onChange={handleFormChange}
            name="username"
            value={formData.username}
            placeholder="Username"
          />
          <input
            pattern="(?=.*\d)(?=.*[a-z]).{6,}"
            required
            type="password"
            onChange={handleFormChange}
            name="password"
            value={formData.password}
            placeholder="Password"
          />
          <p>
            People who use our service may have uploaded your contact information to Instagram. <span className={styles.spanTag}>Learn More</span>
          </p>
          <p>
            By signing up, you agree to our <span className={styles.spanTag}>Terms , Privacy Policy</span> and{" "}
            <span className={styles.spanTag}>Cookies Policy .</span>
          </p>
          <button disabled={signupLoading}>Sign up</button>
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
