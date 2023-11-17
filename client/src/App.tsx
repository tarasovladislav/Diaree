import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./new/Navbar/Navbar";
import DiaryList from "./components/DiaryList/DiaryList";
import Calendar from "./components/Calendar/Calendar";
import Popup from "./components/Popup/Popup";
import { getAllDiaryEntries, deleteDiaryEntry } from "./ApiService";
import NewDiaryEntry from "./components/NewDiaryEntry/NewDiaryEntry";
import SearchDiaries from "./components/SearchDiaries/SearchDiaries";
import FoundEntry from "./components/FoundEntry/FoundEntry";
import TagManagement from "./components/TagManagement/TagManagement"
import { DiaryType } from './Types/Types'
import CalendarComponent from "./new/CalendarComponent";
type AppProps = {

}


function App() {
    const [diaries, setDiaries] = useState<DiaryType[]>([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [diaryEntry, setDiaryEntry] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [recentDiaries, setRecentDiaries] = useState<DiaryType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getAllDiaryEntries()
            .then((data) => {
                const sortedEntries: DiaryType[] = data.sort(
                    (a: DiaryType, b: DiaryType) => new Date(b.date).getTime() - new Date(a.date).getTime());

                const recentEntries: DiaryType[] = sortedEntries.slice(0, 3);

                setRecentDiaries(recentEntries);
                setDiaries(data);
            })
            .catch((error) => console.error(error));
    }, []);


    const handleCloseModal = () => {
        setIsOpenNew(false);
    };

    const handleDelete = (_id) => {
        deleteDiaryEntry(_id)
            .then(() => {
                setDiaries((prevDiaries) =>
                    prevDiaries.filter((entry) => entry._id !== _id)
                );
                setRecentDiaries((prevRecentDiaries) =>
                    prevRecentDiaries.filter((entry) => entry._id !== _id)
                );
                console.log("Deleted entry from db");
            })
            .catch((error) => {
                console.error("Error deleting diary entry:", error);
            });
    };

    const addTag = (tag) => {
        setTags([...tags, tag]);
    };

    const removeTag = (tagToRemove) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(updatedTags);
    };


    const [isOpenNew, setIsOpenNew] = useState(false)

    return (
        <>
        <div className="App">
            <Navbar />
            <CalendarComponent diaries={diaries} setSelectedDate={setSelectedDate} setIsOpenNew={setIsOpenNew} />
            {/* <div className="calendar-container">
                <Calendar onSelectDate={setSelectedDate} setIsOpenNew={setIsOpenNew} />
            </div> */}
            <NewDiaryEntry
                isOpen={isOpenNew}
                setIsOpenNew={setIsOpenNew}
                onClose={handleCloseModal}
                selectedDate={selectedDate}
                setDiaries={setDiaries}
                diaries={diaries}
                tags={tags}
            />

            {/* <SearchDiaries diaries={diaries} onDelete={handleDelete} /> */}
            {/* <div className="tags-container">
                <TagManagement tags={tags} setTags={setTags} />
                <DiaryList
          diaries={diaries}
          onDelete={handleDelete}
          tags={tags}
          recentDiaries={recentDiaries}
        />
            </div> */}

            {/* {diaryEntry && (
        <FoundEntry
          entry={diaryEntry}
          onDelete={handleDelete}
          onClose={() => setDiaryEntry(null)}
        />
      )} */}
            {/* {showPopup && !isModalOpen ? (
        <Popup
          message="No entry for the selected date. Create a new one?"
          onClose={() => setShowPopup(false)}
          onNewEntryClick={() => {
            setShowPopup(false);
            setIsModalOpen(true);
          }}
        />
      ) : (
        <NewDiaryEntry
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
          setDiaries={setDiaries}
          diaries={diaries}
          tags={tags}
        />
      )} */}

        </div>
        </>
    );
}

export default App;
