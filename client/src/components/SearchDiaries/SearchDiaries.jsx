import React, { useState } from "react";
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

    if (query.length >= 3) {
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
  };

  const handleSearchBarClick = () => {
    setPopupVisible(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Diaries"
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
            <h2>Search Results</h2>
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
