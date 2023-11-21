import React, { useState } from 'react'
import './MonthComponent.css'
import DayComponent from '../DayComponent/DayComponent'
import SearchComponent from '../Searchbar/Searchbar'
import { useDiary } from '../../Utils/diary'


type Props = {
    currentYear: number,
    currentMonth: number,

    setCurrentMonth: React.Dispatch<React.SetStateAction<number>>,
    setCurrentYear: React.Dispatch<React.SetStateAction<number>>,
}


const MonthComponent = (props: Props) => {

    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const { setSelectedDate, diaries, setIsAddNewEvent, diariesByDate } = useDiary()

    const [isClickable, setIsClickable] = useState(false);
    const getDaysInMonth = (year: number, month: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number): number => {
        const dayOfWeek = new Date(year, month, 1).getDay();
        // Adjust day of the week so that Monday is 0, Sunday is 6
        return (dayOfWeek + 6) % 7;
    };
    // Days in the current month
    const daysInMonth = getDaysInMonth(props.currentYear, props.currentMonth);
    // First day of the current month
    const firstDayOfMonth = getFirstDayOfMonth(props.currentYear, props.currentMonth);
    // Days in the previous month
    const daysInPreviousMonth = getDaysInMonth(props.currentYear, props.currentMonth - 1);
    const leadingDays = Array.from({ length: firstDayOfMonth }, (_, i) => daysInPreviousMonth - i).reverse();
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const totalDays = firstDayOfMonth + daysInMonth;

    const totalCells = totalDays > 35 ? 42 : 35;

    const trailingDaysCount = totalCells - (firstDayOfMonth + daysInMonth);
    const trailingDays = Array.from({ length: trailingDaysCount }, (_, i) => i + 1);
    const grid = [...leadingDays, ...currentMonthDays, ...trailingDays];


    // Helper function to create the date string in 'YYYY-MM-DD' format
    const formatDateKey = (year: number, month: number, day: number): string => {
        // Correctly adjust month number for JavaScript Date (0-11)
        month += 1;
        // Pad single digit month and day with leading zeros
        const paddedMonth = month.toString().padStart(2, '0');
        const paddedDay = day.toString().padStart(2, '0');
        // Return the date string
        return `${year}-${paddedMonth}-${paddedDay}`;
    };

    return (
        <div className='Month'>
            <div className="Right-Container">


                <div className="Month-Navbar">

                    <div className='Buttons'>


                        <button onClick={() => {
                            let year = props.currentYear;
                            let month = props.currentMonth - 1;
                            if (month < 0) {
                                year -= 1;
                                month = 11;
                            }

                            props.setCurrentMonth(month)
                            props.setCurrentYear(year)
                        }}>Previous Month</button >


                        <button onClick={
                            () => {
                                let year = props.currentYear;
                                let month = props.currentMonth + 1;
                                if (month > 11) {
                                    year += 1;
                                    month = 0;
                                }
                                props.setCurrentMonth(month)
                                props.setCurrentYear(year)
                            }}>Next Month</button>
                    </div>


                    <h1>{months[props.currentMonth]}, {props.currentYear}</h1>
                    <div className='Searchbar'>
                        <SearchComponent events={diaries} />
                    </div>

                </div>
                <div className="weekDay">
                    <h4 className="dayOfTheWeek">Monday</h4>
                    <h4 className="dayOfTheWeek">Tuesday</h4>
                    <h4 className="dayOfTheWeek">Wednesday</h4>
                    <h4 className="dayOfTheWeek">Thursday</h4>
                    <h4 className="dayOfTheWeek">Friday</h4>
                    <h4 className="dayOfTheWeek">Saturday</h4>
                    <h4 className="dayOfTheWeek">Sunday</h4>
                </div>
                <div className="Month-View">

                    {grid.map((day, index) => {
                        let year = props.currentYear;
                        let month = props.currentMonth;
                        // Adjust for leading days
                        if (index < leadingDays.length) {
                            month -= 1;
                            if (month < 0) {
                                year -= 1;
                                month = 11;
                            }
                            day = daysInPreviousMonth - leadingDays.length + index + 1;
                        }
                        // Adjust for trailing days
                        else if (index >= leadingDays.length + daysInMonth) {
                            month += 1;
                            if (month > 11) {
                                year += 1;
                                month = 0;
                            }
                            day = index - (leadingDays.length + daysInMonth) + 1;
                        }
                        const dateKey = formatDateKey(year, month, day);
                        const dayEvents = diariesByDate[dateKey];
                        setIsClickable(new Date(Date.now()) < new Date(dateKey))
                        console.log('check', isClickable)
                        return (dayEvents ?
                            <div
                                onClick={() => {
                                    setSelectedDate(dateKey)
                                }}
                                key={index} className={`day ${index < leadingDays.length || index >= leadingDays.length + daysInMonth ? 'other-month' : ''}`}>
                                <span style={{ alignSelf: 'center' }}>
                                    {day}
                                </span>
                                <div className="dayEventList">
                                    {dayEvents.map(event => <DayComponent _id={event._id} dayEvents={dayEvents} title={event.title} imageUrl={event.imageUrl} tags={event.tags} />)}

                                </div>

                            </div>
                            :
                            <div
                                onClick={() => {
                                    setSelectedDate(dateKey)
                                    setIsAddNewEvent(true);
                                    console.log('dateKey',dateKey)
                                }}
                                key={index}
                                className={`day ${index < leadingDays.length || index >= leadingDays.length + daysInMonth ? 'other-month' : ''}`}>
                                <span style={{ alignSelf: 'center' }}>
                                    {day}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>

    )
}

export default MonthComponent