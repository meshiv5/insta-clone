import React from "react";
import { useState } from "react";
import styles from "../../styles/Navbar/Navbar.module.css";
import { ReactComponent as SearchLogoSvg } from "../../svg/searchLogo.svg";
import SearchResults from "./SearchResults";
export default function SearchBar() {
  const [openSearchRes, setOpenSearchRes] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <div className={styles.searchBar}>
      <SearchLogoSvg className={styles.searchLogoSvg} />
      <input
        autoComplete="off"
        onInput={({ target }) => {
          setQuery(target.value);
        }}
        onFocus={() => {
          setOpenSearchRes(true);
        }}
        type="text"
        name="searchBar"
        placeholder="Search"
      />
      <div
        onClick={() => {
          setOpenSearchRes(false);
        }}
        className={styles.crossBar}
        style={{ cursor: "pointer" }}
      ></div>
      {openSearchRes && <SearchResults setOpenSearchRes={setOpenSearchRes} query={query} />}
    </div>
  );
}
