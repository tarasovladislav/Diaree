import { useState } from "react";
import './Home.css'
import Navbar from "./Navbar/Navbar";
import CalendarComponent from "./Calendar/CalendarComponent";
import NewDiaryEntry from "../components/NewDiaryEntry/NewDiaryEntry";
import { useDiary } from "../Utils/diary";
import DiaryEntry from "./DiaryEntry/DiaryEntry";
import Modal from "./DayModal/DayModal";
import DayEventListItem from "./DayEventListItem/DayEventListItem";
import ExistingDay from "./ExistingDay/ExistingDay";
function Home() {

    const [tags, setTags] = useState([]);

    const { diaries, setDiaries, selectedDate, diariesByDate } = useDiary()
    console.log(diariesByDate)
    return (
        <>
            <div className="Home">
                <Navbar />
                <CalendarComponent />
                <DiaryEntry />
                <ExistingDay />

                {/* {selectedDate && diariesByDate && <Modal  >
                    <div className="modalComponent">
                        <div className="header">
                            <h1>{selectedDate}</h1>
                            <button>Add New Event</button>
                        </div>
                        {diariesByDate[selectedDate] && diariesByDate[selectedDate].map((event) => {
                            return <DayEventListItem title={event.title} description={event.description} date={event.date} imageUrl={event.imageUrl} />
                        }

                        )}
                    </div>
                </Modal >} */}

            </div>
        </>
    );
}

export default Home;
