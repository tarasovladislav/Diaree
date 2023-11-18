import React, { useState } from 'react'
import { SearchBarProps } from '../../Types/Types';


const SearchBarComponent = ({ onSearch, searchQuery, setSearchQuery }) => {
  // const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };


  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBarComponent;