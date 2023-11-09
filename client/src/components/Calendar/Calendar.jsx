import React from "react";
import "./Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

function Calendar() {
  const [startDate, setStartDate] = useState(new Date());
  const handleCalendarClose = () => {console.log("lol")

  };

  return (
    <div className="date-picker">
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        maxDate={new Date()}
        placeholderText="Select a past date!"
        onCalendarClose={handleCalendarClose}
      />
    </div>
  );
}

export default Calendar;

//Date Mon Oct 16 2023 15:56:15 GMT+0200 (Mitteleuropäische Sommerzeit)
