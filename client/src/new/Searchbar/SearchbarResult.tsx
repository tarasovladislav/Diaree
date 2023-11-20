import './SearchbarResult.css';
import { useState } from "react";
import { SearchResultsProps } from "../../Types/Types";
import { useDiary } from "../../Utils/diary";


const SearchResultComponent: React.FC<SearchResultsProps> = ({ results }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {setIsShowDayEvents, setSelectedDate}   = useDiary();
    const handleClick = (date) => {
        console.log('here')
        setSelectedDate(date);
        setIsShowDayEvents(true);
    };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    // };
    return (
        <div className="Searchbar-Result">
            {results.map((result, index) => (
                <div className='Searchbar-Result-Item' key={index}>
                    <p onClick={()=>{handleClick(result.date)}}>{result.title}</p>
                </div>
            ))}
            {/* {isModalOpen && <ExistingDay />} */}
        </div>
    );
};

export default SearchResultComponent;