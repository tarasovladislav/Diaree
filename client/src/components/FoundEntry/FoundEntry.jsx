// FoundEntry.jsx
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
          &times;
        </button>
        <h2>{entry.title}</h2>
        <p className="entry-text">{entry.text}</p>
        <p><span className="date">Date: </span>{new Date(entry.date).toLocaleDateString()}</p>
        {entry.tags && entry.tags.length > 0 && (
          <p>
            <span className="found-entry-label">Tags:</span>{" "}
            {entry.tags.map((tag) => (tag ? tag : "")).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

export default FoundEntry;
