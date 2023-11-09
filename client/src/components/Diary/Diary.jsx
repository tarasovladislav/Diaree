import React from "react";
import "./Diary.css";

function Diary({ id, title, text, date }) {
  //formats the date and removes time
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replace(/\//g, " – ");

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
    </div>
  );
}

export default Diary;
