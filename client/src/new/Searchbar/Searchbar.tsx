import './Searchbar.css';
import { useState } from "react";
import { SearchResult } from "../../Types/Types";
import SearchResultComponent from "./SearchbarResult";
import { EventData } from "../../Types/Types";

type Props = {
    events: EventData[];
}

const Searchbar = (props: Props) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleSearch = (query: string) => {
        if (query !== '') {
            const filteredResults = props.events.filter((result) =>
                result.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    return (
        <div className="Searchbar">
            <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <SearchResultComponent results={searchResults} />
        </div>
    );
};

export default Searchbar;