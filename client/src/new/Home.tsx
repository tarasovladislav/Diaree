import { useState } from "react";
import './Home.css'
import Navbar from "./Navbar/Navbar";
import CalendarComponent from "./Calendar/CalendarComponent";
import NewDiaryEntry from "../components/NewDiaryEntry/NewDiaryEntry";
import { useDiary } from "../Utils/diary";

function Home() {
    const [isOpenNew, setIsOpenNew] = useState(false)
    const [tags, setTags] = useState([]);
    const { diaries, setDiaries, selectedDate } = useDiary()


    return (
        <>
            <div className="Home">
                <Navbar />
                <CalendarComponent setIsOpenNew={setIsOpenNew} />
                <NewDiaryEntry
                isOpen={isOpenNew}
                setIsOpenNew={setIsOpenNew}
                onClose={() => {setIsOpenNew(false)}}
                selectedDate={selectedDate}
                setDiaries={setDiaries}
                diaries={diaries}
                tags={tags}
                />
            </div>
        </>
    );
}

export default Home;
