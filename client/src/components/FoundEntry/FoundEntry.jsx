import React, { useEffect } from "react";
import "./FoundEntry.css";

function FoundEntry({ entry, onClose }) {
  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKeyPress);

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
          {entry.tags && entry.tags.length > 0 ? (
            <p>
              <span className="found-entry-label">Tags: </span>
              {entry.tags.map((tag) => (tag ? tag : "")).join(", ")}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FoundEntry;
