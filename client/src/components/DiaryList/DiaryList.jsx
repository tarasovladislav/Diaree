import React from "react";
import "./DiaryList.css"
import Diary from "../Diary/Diary"

function DiaryList({diaries}) {
  return (
    <div className="diarylist-section">
      {/* <h2 style={{display : "block"}}>My Recent Diary Entries</h2> */}
      <div className="diaries">
        {diaries.map((diary) => {
          return (
            <Diary
              key={diary._id}
              id={diary._id}
              title={diary.title}
              text={diary.text}
              date={diary.date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DiaryList;
