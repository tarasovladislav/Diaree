import './Searchbar.css';
import { useState } from "react";
import SearchResultComponent from "./SearchbarResult";
import { useDiary } from '../../Utils/diary';
import { DiaryType } from '../../Types/Types';

type Props = {

}

const Searchbar = (props: Props) => {
    const { diaries } = useDiary()
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<DiaryType[]>([]);

    const handleSearch = (query: string): void => {
        if (query !== '') {
            const filteredResults = diaries.filter((result) =>
                result.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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