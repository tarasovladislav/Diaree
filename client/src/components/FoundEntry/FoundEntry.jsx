import React, { useEffect } from "react";
import "./FoundEntry.css";

function FoundEntry({ entry, onClose }) {
  useEffect(() => {
    // Add an event listener for the ESC key
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("keydown", handleEscKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [onClose]);

  return (
    <div className="found-entry-container">
      <div className="found-entry">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Found Entry:</h2>
        <div>
          <h3>{entry.title}</h3>
          <p>{entry.text}</p>
          <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default FoundEntry;
