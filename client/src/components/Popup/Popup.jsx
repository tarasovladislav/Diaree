import React, { useEffect } from "react";
import "./Popup.css";

function Popup({ message, onClose, onNewEntryClick }) {
  // Define a function to handle ESC key press
  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  // Add an event listener when the component mounts
  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onClose}>No</button>
          <button
            onClick={() => {
              onClose();
              onNewEntryClick();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
