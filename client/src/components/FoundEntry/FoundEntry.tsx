import React, { useEffect } from "react";
import "./FoundEntry.css";
import Diary from "../Diary/Diary.js";

function FoundEntry({ entry, onClose, onDelete }) {
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
        <Diary
          _id={entry._id}
          title={entry.title}
          text={entry.text}
          date={entry.date}
          tags={entry.tags}
          imageUrl={entry.imageUrl}
          onDelete={() => onDelete(entry._id)}
        />
      </div>
    </div>
  );
}

export default FoundEntry;
