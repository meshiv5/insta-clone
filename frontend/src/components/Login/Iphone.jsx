import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Login/Login.module.css";
export default function Iphone() {
  let [imageState, setImageState] = useState(1);
  let intervalID = useRef(null);
  useEffect(() => {
    if (intervalID.current == null) {
      intervalID.current = setInterval(() => {
        setImageState((oldCount) => (oldCount === 4 ? oldCount - 3 : oldCount + 1));
      }, 3000);
    }
    return () => {
      clearInterval(intervalID.current);
    };
  }, []);
  return (
    <div className={styles.iphoneDiv}>
      <img
        onLoad={(e) => {
          e.target.style.opacity = 1;
        }}
        onTransitionEnd={(e) => (e.target.style.opacity = 0)}
        src={require(`../../images/LoginPage/login_page_${imageState}.png`)}
        alt=""
      />
    </div>
  );
}
