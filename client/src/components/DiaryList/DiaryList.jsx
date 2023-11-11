import React from "react";
import "./DiaryList.css";
import Diary from "../Diary/Diary";

function DiaryList({ recentDiaries, onDelete }) {
  return (
    <div className="diarylist-section">
      <div className="recent-diaries">
        {recentDiaries.map((diary) => {
          return (
            <Diary
              key={diary._id}
              _id={diary._id}
              title={diary.title}
              text={diary.text}
              date={diary.date}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DiaryList;
