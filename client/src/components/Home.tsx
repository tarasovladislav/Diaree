import './Home.css'
import Navbar from "./Navbar/Navbar";
import CalendarComponent from "./Calendar/CalendarComponent";
import DiaryEntry from "./DiaryEntry/DiaryEntry";
import ExistingDay from "./ExistingDay/ExistingDay";
import OneEntry from "./SingleEntry/OneEntry";
import EditEntry from "./EditEntry/EditEntry";

function Home() {
    return (
        <>
            <div className="Home">
                <Navbar />
                <CalendarComponent />
                <DiaryEntry />
                <ExistingDay />
                <OneEntry />
                <EditEntry />
            </div>
        </>
    );
}

export default Home;
