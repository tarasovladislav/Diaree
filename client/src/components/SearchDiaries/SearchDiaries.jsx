import React, { useState, useEffect } from "react";
import "./SearchDiaries.css";
import Fuse from "fuse.js";

function SearchDiaries({ diaries }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const fuseOptions = {
    keys: ["title", "text"],
    threshold: 0.3,
  };

  const fuse = new Fuse(diaries, fuseOptions);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(new Date(date))
      .replace(/\//g, " – ");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  
    if (query === "/all") {
      setSearchResults(diaries);
      setPopupVisible(true);
    } else if (query.length >= 3) {
      const results = fuse.search(query);
      setSearchResults(results.map((result) => result.item));
      setPopupVisible(true);
    } else {
      setSearchResults([]);
    }
  };
  

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchBarClick = () => {
    setPopupVisible(true);
  };

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      setPopupVisible(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter at least 3 characters to search. Enter '/all' to show all entries."
        value={searchQuery}
        onClick={handleSearchBarClick}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {isPopupVisible && (
        <div className="overlay">
          <div className="popup">
            <button onClick={handleClosePopup} className="close-button">
              X
            </button>
            <h2>Fuzzy Search Results:</h2>
            <input
              type="text"
              placeholder="Enter search query"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
            <ul className="results-container">
              {searchResults.map((result) => (
                <li key={result._id}>
                  <h3>{result.title}</h3>
                  <p>
                    <span className="diary-entry">Diary Entry: </span>
                    {result.text}
                  </p>
                  <p>
                    <span className="diary-date">Date: </span>
                    {formatDate(result.date)}
                  </p>
                  {result.tags && result.tags.length > 0 && (
                    <p>
                      <span className="diary-tags">Tags: </span>
                      {result.tags.map((tag) => (tag ? tag : "")).join(", ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchDiaries;
