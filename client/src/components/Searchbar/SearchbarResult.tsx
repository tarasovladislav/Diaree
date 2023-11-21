import './SearchbarResult.css';
import { SearchResultsProps } from "../../Types/Types";
import { useSingleEntry } from '../../Utils/singleEntry'

const SearchResultComponent: React.FC<SearchResultsProps> = ({ results }) => {
    const { isShowSingleEvent, setIsShowSingleEvent, setSelectedEntry } = useSingleEntry();

    const handleClick = (result) => {
        console.log('here')
        setSelectedEntry(result);
        setIsShowSingleEvent(true);
    };

    return (
        <div className="Searchbar-Result">
            {results.map((result, index) => (
                <div className='Searchbar-Result-Item' key={index} onClick={() => { handleClick(result) }}>
                    <p >{result.title}</p>
                </div>
            ))}

        </div>
    );
};

export default SearchResultComponent;