import React from "react";
import styles from "../../styles/Navbar/Navbar.module.css";
import { ReactComponent as SearchLogoSvg } from "../../svg/searchLogo.svg";
export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <SearchLogoSvg className={styles.searchLogoSvg} />
      <input type="text" name="searchBar" placeholder="Search" />
      <div className={styles.crossBar} style={{ cursor: "pointer" }}></div>
    </div>
  );
}
