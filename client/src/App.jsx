import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DiaryList from "./components/DiaryList/DiaryList";
import AddButton from "./components/AddButton/AddButton";
import { useState, useEffect } from "react";
import Calendar from "./components/Calendar/Calendar";

function App() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recent")
      .then((res) => res.json())
      .then((data) => setDiaries(data));
  }, []);

  // console.log(diaries);

  return (
    <div>
      <Navbar />
      <DiaryList diaries={diaries} />
      <Calendar/>
      <AddButton/>
    </div>
  );
}

export default App;
