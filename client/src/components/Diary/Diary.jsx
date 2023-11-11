import React from "react";
import "./Diary.css";

function Diary({ _id, title, text, date, onDelete }) { 
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replace(/\//g, " – ");

  console.log("Diary is rendering with _id:", _id); 

  const handleDeleteClick = () => {
    console.log("Delete button clicked for _id:", _id); 
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
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}

export default Diary;
