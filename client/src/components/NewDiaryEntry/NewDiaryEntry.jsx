import React, { useState } from "react";
import { addDiaryEntry } from "../../ApiService";
import "./NewDiaryEntry.css";

function NewDiaryEntry({ isOpen, onClose, selectedDate, setDiaries, diaries }) {
  const [newDiaryEntry, setNewDiaryEntry] = useState({
    title: "",
    text: "",
    date: "",
  });

  React.useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      setNewDiaryEntry({
        ...newDiaryEntry,
        date: formattedDate,
      });
    }
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDate) {
      const localMidnight = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );

      const timeZoneOffsetMs = selectedDate.getTimezoneOffset() * 60000;

      const adjustedDate = new Date(localMidnight.getTime() - timeZoneOffsetMs);

      const newEntryData = {
        ...newDiaryEntry,
        date: adjustedDate.toISOString(),
      };

      addDiaryEntry(newEntryData)
        .then((data) => {
          console.log("New diary entry added:", data);

          setDiaries((prevDiaries) => [data, ...prevDiaries]);

          onClose();
        })
        .catch((error) => {
          console.error("Error adding diary entry:", error);
        });
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Create New Diary Entry</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={newDiaryEntry.title}
                onChange={(e) =>
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    title: e.target.value,
                  })
                }
                required
              />
            </label>
            <label>
              Text:
              <textarea
                value={newDiaryEntry.text}
                onChange={(e) =>
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    text: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Date:
              <input type="text" value={newDiaryEntry.date} readOnly />
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    )
  );
}

export default NewDiaryEntry;
