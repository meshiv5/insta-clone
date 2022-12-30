import React from "react";
import styles from "../styles/Footer/Footer.module.css";
export default function Footer() {
  return (
    <div className={styles.FooterDiv}>
      <div className={styles.links}>
        <a href="/">Meta</a>
        <a href="/">About</a>
        <a href="/">Blog</a>
        <a href="/">Jobs</a>
        <a href="/">API</a>
        <a href="/">Privacy</a>
        <a href="/">Terms</a>
        <a href="/">Top</a>
        <a href="/">Accounts</a>
        <a href="/">Locations</a>
        <a href="/">Instagram</a>
        <a href="/">Lite</a>
        <a href="/">Contact</a>
        <a href="/">Uploading & Non-Users</a>
      </div>
      <div className={styles.copyright}>
        <p>© 2022 Instagram from Meta</p>
      </div>
    </div>
  );
}
