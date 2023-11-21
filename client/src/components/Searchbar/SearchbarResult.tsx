import './SearchbarResult.css';
import { useSingleEntry } from '../../Utils/singleEntry'
import { DiaryType } from '../../Types/Types';

type Props = {
    results: DiaryType[]
}

const SearchResultComponent = (props: Props) => {
    const { setIsShowSingleEvent, setSelectedEntry } = useSingleEntry();

    const handleClick = (result: DiaryType): void => {
        setSelectedEntry(result);
        setIsShowSingleEvent(true);
    };

    return (
        <div className="Searchbar-Result">
            {props.results.map((result, index) => (
                <div className='Searchbar-Result-Item' key={index} onClick={() => { handleClick(result) }}>
                    <p >{result.title}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResultComponent;