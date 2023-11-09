import React from "react";
import "./Navbar.css";
import logo from "../../assets/diarylogo.png";
import search from "../../assets/search.svg";

function Navbar() {
  return (
    <div className="header-container">
        <h2>Dιαɾҽҽ</h2>
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="search">
        <img src={search} />
        <input type="text" name="input" id="input" />
      </div>
    </div>
  );
}

export default Navbar;
