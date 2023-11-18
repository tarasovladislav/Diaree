import { useEffect, useState } from "react";
import { SearchResult } from "../../Types/Types";
import SearchBarComponent from "./SearchBarComponent";
import SearchResultComponent from "./SearchResultComponent";
import { EventData } from "../../Types/Types";

type Props = {
    events: EventData[];
}

const SearchComponent = (props: Props) => {
    console.log('prop.event: ',props.events)

    const titles = props.events.map(event => event.title)

    console.log('title', titles)
    
    const [allResults, setAllResults] = useState<SearchResult[]>([]);

    useEffect(()=>{
        setAllResults(titles.map((title)=> ({title})))
    }, [titles])

    console.log("all results",allResults)

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const handleSearch = (query: string) => {
        if(query !== ''){

            const filteredResults = allResults.filter((result) =>
                result.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div>
            <SearchBarComponent onSearch={handleSearch} />
            <SearchResultComponent results={searchResults} />
        </div>
    );
};

export default SearchComponent;