// Diary.jsx
import React from "react";
import "./Diary.css";

function Diary({ _id, title, text, date, tags, onDelete }) {
  // console.log("Tags prop:", tags); // Add this line for debugging

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
      <h3>{title}</h3>
      <p>
        <span className="diary-entry">Diary Entry: </span>
        {text}
      </p>
      <p>
        <span className="diary-date">Date: </span>
        {formattedDate}
      </p>
      {tags && tags.length > 0 ? (
        <p>
          <span className="diary-tags">Tags: </span>
          {tags.map((tag) => (tag ? tag : "")).join(", ")}
        </p>
      ) : null}
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}

export default Diary;
