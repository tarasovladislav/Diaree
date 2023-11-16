import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DiaryList from "./components/DiaryList/DiaryList";
import Calendar from "./components/Calendar/Calendar";
import Popup from "./components/Popup/Popup";
import { getAllDiaryEntries, deleteDiaryEntry } from "./ApiService";
import NewDiaryEntry from "./components/NewDiaryEntry/NewDiaryEntry";
import SearchDiaries from "./components/SearchDiaries/SearchDiaries";
import FoundEntry from "./components/FoundEntry/FoundEntry";
import TagManagement from "./components/TagManagement/TagManagement"

type AppProps = {

}


function App():React.FC{
  const [diaries, setDiaries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryEntry, setDiaryEntry] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [recentDiaries, setRecentDiaries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState([]);

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
      const selectedDateUTC = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        )
      );

      const formattedDate = selectedDateUTC.toISOString().split("T")[0];

      const foundEntry = diaries.find(
        (entry) => entry.date.split("T")[0] === formattedDate
      );

      setDiaryEntry(foundEntry);

      if (!foundEntry) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
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

  const addTag = (tag) => {
    setTags([...tags, tag]);
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  return (
    <div>
      <Navbar />
      <SearchDiaries diaries={diaries} onDelete={handleDelete} />
      <div className="tags-container">
        <TagManagement tags={tags} setTags={setTags} />
        <DiaryList
          diaries={diaries}
          onDelete={handleDelete}
          tags={tags}
          recentDiaries={recentDiaries}
        />
      </div>
      <div className="calendar-container">
        <Calendar onSelectDate={setSelectedDate} />
      </div>
      {diaryEntry && (
        <FoundEntry
          entry={diaryEntry}
          onDelete={handleDelete}
          onClose={() => setDiaryEntry(null)}
        />
      )}
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
          tags={tags}
        />
      )}
    </div>
  );
}

export default App;
