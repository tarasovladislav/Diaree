// Diary.jsx
import React from "react";
import "./Diary.css";

function Diary({ _id, title, text, date, tags, onDelete }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replace(/\//g, " – ");

  const handleDeleteClick = () => {
    onDelete(_id);
  };

  return (
    <div className="diary">
      <div className="diary-header">
        <h3 className="diary-title">{title}</h3>
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
      <p className="diary-entry">{text}</p>
      <p className="diary-date">{formattedDate}</p>
      {tags && tags.length > 0 && (
        <p className="diary-tags">
          Tags: {tags.map((tag) => (tag ? tag : "")).join(", ")}
        </p>
      )}
    </div>
  );
}

export default Diary;
