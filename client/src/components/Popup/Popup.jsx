import React from "react";
import "./Popup.css";

function Popup({ message, onClose, onNewEntryClick }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onClose}>No</button>
          <button onClick={onNewEntryClick}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
