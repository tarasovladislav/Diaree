import './SearchbarResult.css';
import { SearchResultsProps } from "../../Types/Types";
import {useSingleEntry} from '../../Utils/singleEntry'

const SearchResultComponent: React.FC<SearchResultsProps> = ({ results }) => {
    const {isShowSingleEvent, setIsShowSingleEvent, setSelectedEntry  } = useSingleEntry();

    const handleClick = (result) => {
        console.log('here')
        setSelectedEntry(result);
        setIsShowSingleEvent(true);
    };

    return (
        <div className="search-result-container">
            {results.map((result, index) => (
                <div key={index}>
                    <p onClick={()=>{handleClick(result)}}>{result.title}</p>
                </div>
            ))}
            
        </div>
    );
};

export default SearchResultComponent;