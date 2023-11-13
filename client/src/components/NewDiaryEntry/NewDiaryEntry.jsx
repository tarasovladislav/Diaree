import React, { useState } from "react";
import { addDiaryEntry } from "../../ApiService";
import "./NewDiaryEntry.css";

function NewDiaryEntry({ isOpen, onClose, selectedDate, setDiaries, diaries }) {
  const [newDiaryEntry, setNewDiaryEntry] = useState({
    title: "",
    text: "",
    date: "",
    imageUrl: "",
  });

  const [isUploading, setIsUploading] = useState(false);

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

  const BASE_URL = "http://localhost:3000";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);

    fetch(`${BASE_URL}/upload-image`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Image upload failed: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Image uploaded successfully:", data);

        setIsUploading(false);

        setNewDiaryEntry({ ...newDiaryEntry, imageUrl: data.imageUrl });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
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
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                disabled={isUploading}
              />
              {isUploading && <div className="spinner"></div>}
            </label>
            <button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default NewDiaryEntry;
