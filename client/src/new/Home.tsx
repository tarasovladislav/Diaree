import { useState } from "react";
import './Home.css'
import Navbar from "./Navbar/Navbar";
import CalendarComponent from "./Calendar/CalendarComponent";
import { useDiary } from "../Utils/diary";
import DiaryEntry from "./DiaryEntry/DiaryEntry";
import ExistingDay from "./ExistingDay/ExistingDay";
import Modal from "./Modal/Modal";
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
                {/* <Modal>
                    THIS IS MHY CHILDER
                </Modal> */}
            </div>
        </>
    );
}

export default Home;
