import { useState, useEffect } from "react";
import './Home.css'
import Navbar from "./Navbar/Navbar";
import { getAllDiaryEntries } from "../ApiService";
import { DiaryType } from '../Types/Types'
import CalendarComponent from "./Calendar/CalendarComponent";



function Home() {
    const [diaries, setDiaries] = useState<DiaryType[]>([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        getAllDiaryEntries()
            .then((data) => {
                setDiaries(data);
            })
            .catch((error) => console.error(error));
    }, []);



    const [isOpenNew, setIsOpenNew] = useState(false)

    return (
        <>
            <div className="Home">
                <Navbar />
                <CalendarComponent diaries={diaries} setSelectedDate={setSelectedDate} setIsOpenNew={setIsOpenNew} />
            </div>
        </>
    );
}

export default Home;
