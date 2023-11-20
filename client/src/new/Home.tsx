import { useState } from "react";
import './Home.css'
import Navbar from "./Navbar/Navbar";
import CalendarComponent from "./Calendar/CalendarComponent";
import { useDiary } from "../Utils/diary";
import DiaryEntry from "./DiaryEntry/DiaryEntry";
import ExistingDay from "./ExistingDay/ExistingDay";
import Modal from "./Modal/Modal";
import OneEntryModal from "./SingleEntry/OneEntryModal";
function Home() {
    return (
        <>
            <div className="Home">
                <Navbar />
                <CalendarComponent />
                <DiaryEntry />
                <ExistingDay />
                <OneEntryModal />
                {/* <Modal>
                    THIS IS MHY CHILDER
                </Modal> */}
            </div>
        </>
    );
}

export default Home;
