import { useState } from "react";
import './Home.css'
import Navbar from "./Navbar/Navbar";
import CalendarComponent from "./Calendar/CalendarComponent";
import { useDiary } from "../Utils/diary";
import DiaryEntry from "./DiaryEntry/DiaryEntry";
import ExistingDay from "./ExistingDay/ExistingDay";
function Home() {

    const [tags, setTags] = useState([]);

    const { diariesByDate } = useDiary()
    console.log(diariesByDate)
    return (
        <>
            <div className="Home">
                <Navbar />
                <CalendarComponent />
                <DiaryEntry />
                <ExistingDay />
            </div>
        </>
    );
}

export default Home;
