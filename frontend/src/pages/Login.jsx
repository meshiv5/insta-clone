import React from "react";
import Footer from "../components/Footer";
import Iphone from "../components/Login/Iphone";
import LoginForm from "../components/Login/LoginForm";
import useMedia from "../hooks/useMedia";
import styles from "../styles/Login/Login.module.css";

export default function Login() {
  const isSmallWidth = useMedia("(max-width: 800px)");
  const isSmallHeight = useMedia("(max-height: 750px)");
  return (
    <div className={styles.mainDiv}>
      {isSmallWidth || <Iphone />}
      <LoginForm />
      {isSmallHeight || <Footer />}
    </div>
  );
}
