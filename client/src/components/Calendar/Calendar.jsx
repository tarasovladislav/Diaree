import React, { useState } from "react";
import "./Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar({ onSelectDate }) {
  const [startDate, setStartDate] = useState(null);

  const handleCalendarClose = () => {
    if (startDate) {
      const selectedDateUTC = new Date(
        Date.UTC(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
      );
      onSelectDate(selectedDateUTC);
      console.log(selectedDateUTC);
    }
  };
  

  return (
    <div className="date-picker">
      <DatePicker
        wrapperClassName="datePicker"
        className="custom-datepicker-input"
        showIcon
        // selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          onSelectDate(date);
        }}
        maxDate={new Date()}
        placeholderText="__Select a past date!"
        onCalendarClose={handleCalendarClose}
        isClearable
      />
    </div>
  );
}

export default Calendar;

//Date Mon Oct 16 2023 15:56:15 GMT+0200 (Mitteleuropäische Sommerzeit)
