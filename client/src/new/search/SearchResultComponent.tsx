import { useState } from "react";
import { SearchResultsProps } from "../../Types/Types";
import ExistingDay from "../ExistingDay/ExistingDay";
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
        <div>
            {results.map((result, index) => (
                <div key={index}>
                    <p onClick={()=>{handleClick(result.date)}}>{result.title}</p>
                </div>
            ))}
            {/* {isModalOpen && <ExistingDay />} */}
        </div>
    );
};

export default SearchResultComponent;