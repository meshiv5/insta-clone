import React from "react";
import Footer from "../components/Footer";
import SignupForm from "../components/Signup/SignupForm";
import useMedia from "../hooks/useMedia";
import styles from "../styles/Signup/Signup.module.css";

export default function Signup() {
  const isSmallHeight = useMedia("(max-height: 900px)");
  return (
    <div className={styles.mainDiv}>
      <SignupForm />
      {isSmallHeight || <Footer />}
    </div>
  );
}
