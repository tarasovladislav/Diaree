import React from "react";
import "./Navbar.css";
import logo from "../../assets/diarylogo.png";

function Navbar() {
  return (
    <div className="header-container">
      <h2>Dιαɾҽҽ</h2>
      <div className="logo">
        <img src={logo} />
      </div>
    </div>
  );
}

export default Navbar;