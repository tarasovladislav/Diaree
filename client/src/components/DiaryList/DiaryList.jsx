import React from "react";
import "./DiaryList.css";
import Diary from "../Diary/Diary";

function DiaryList({ recentDiaries, onDelete }) {
  return (
    <div className="diarylist-section">
      <div className="recent-diaries">
        {recentDiaries.map((diary, index) => {
          return (
            <Diary
              key={diary._id + index}
              _id={diary._id}
              title={diary.title}
              text={diary.text}
              date={diary.date}
              onDelete={onDelete}
              tags={diary.tags} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default DiaryList;
