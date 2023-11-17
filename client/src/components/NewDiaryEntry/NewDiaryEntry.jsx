import React, { useState, useEffect } from "react";
import { postDiaryEntry } from "../../ApiService";
import "./NewDiaryEntry.css";

function NewDiaryEntry({
  isOpen,
  onClose,
  selectedDate,
  setDiaries,
  diaries,
  tags,
}) {
  const [newDiaryEntry, setNewDiaryEntry] = useState({
    title: "",
    text: "",
    date: "",
    imageUrl: "",
    tags: [],
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleTagChange = (tagId, isSelected) => {
    if (isSelected) {
      const tagObj = tags.find((tag) => tag._id === tagId);
      if (tagObj) {
        setSelectedTags([...selectedTags, tagObj]);
      }
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag._id !== tagId));
    }
  };

  useEffect(() => {
    if (selectedDate) {
    //   const formattedDate = selectedDate.toLocaleDateString("en-US", {
    //     weekday: "short",
    //     year: "numeric",
    //     month: "short",
    //     day: "numeric",
    //   });
      const formattedDate = selectedDate.toISOString().split('T')[0]
      console.log(formattedDate)
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
        // date: adjustedDate.toISOString(),
        date: adjustedDate.toISOString().split('T')[0],
        tags: selectedTags.map((tag) => tag.name),
      };

      postDiaryEntry(newEntryData)
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
            <div className="tags-container">
              <p>TAGS</p>
              {tags.map((tag) => {
                console.log(tag);
                return (
                  <label key={tag._id}>
                    <input
                      type="checkbox"
                      value={tag._id}
                      checked={selectedTags.includes(tag)}
                      onChange={(e) =>
                        handleTagChange(tag._id, e.target.checked)
                      }
                    />
                    {tag.name}{" "}
                  </label>
                );
              })}
            </div>

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
