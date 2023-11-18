import { useEffect, useState } from "react";
import { SearchResult } from "../../Types/Types";
import SearchBarComponent from "./SearchBarComponent";
import SearchResultComponent from "./SearchResultComponent";
import { EventData } from "../../Types/Types";

type Props = {
    events: EventData[];
}

const SearchComponent = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const handleSearch = (query: string) => {
        if(query !== ''){
            const filteredResults = props.events.filter((result) =>
                result.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <>
        
        <div>
            <SearchBarComponent onSearch={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <SearchResultComponent results={searchResults} />
        </div>
        </>
    );
};

export default SearchComponent;