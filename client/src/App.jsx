import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DiaryList from "./components/DiaryList/DiaryList";
import Diary from "./components/Diary/Diary";
import Calendar from "./components/Calendar/Calendar";
import Popup from "./components/Popup/Popup";
import { getAllDiaryEntries, deleteDiaryEntry } from "./ApiService";
import NewDiaryEntry from "./components/NewDiaryEntry/NewDiaryEntry";

function App() {
  const [diaries, setDiaries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryEntry, setDiaryEntry] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [recentDiaries, setRecentDiaries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllDiaryEntries()
      .then((data) => {
        const sortedEntries = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const recentEntries = sortedEntries.slice(0, 3);

        setRecentDiaries(recentEntries);
        setDiaries(sortedEntries);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];

      const foundEntry = diaries.find(
        (entry) => entry.date.split("T")[0] === formattedDate
      );

      setDiaryEntry(foundEntry);

      if (!foundEntry) {
        setShowPopup(true);
      }
    }
  }, [selectedDate, diaries]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (_id) => {
    deleteDiaryEntry(_id)
      .then(() => {
        setDiaries((prevDiaries) =>
          prevDiaries.filter((entry) => entry._id !== _id)
        );
        setRecentDiaries((prevRecentDiaries) =>
        prevRecentDiaries.filter((entry) => entry._id !== _id)
      );
        console.log("Deleted entry from db");
      })
      .catch((error) => {
        console.error("Error deleting diary entry:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <DiaryList recentDiaries={recentDiaries} onDelete={handleDelete} />
      <Calendar onSelectDate={setSelectedDate} />
      {diaryEntry ? <Diary {...diaryEntry} onDelete={handleDelete} /> : null}
      {showPopup && !isModalOpen ? (
        <Popup
          message="No entry for the selected date. Create a new one?"
          onClose={() => setShowPopup(false)}
          onNewEntryClick={() => {
            setShowPopup(false);
            setIsModalOpen(true);
          }}
        />
      ) : (
        <NewDiaryEntry
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
          setDiaries={setDiaries}
          diaries={diaries}
        />
      )}
    </div>
  );
}

export default App;
