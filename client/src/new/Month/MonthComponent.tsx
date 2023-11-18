import React, { useEffect, useState } from 'react'
import './MonthComponent.css'
import DayComponent from '../DayComponent/DayComponent'
import { getAllDiaryEntries } from '../../ApiService'
import { DiaryType } from '../../Types/Types'

type Props = {
    currentYear: number,
    currentMonth: number,
    diaries: DiaryType[],
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>,
    setIsOpenNew: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentMonth: React.Dispatch<React.SetStateAction<number>>,
    setCurrentYear: React.Dispatch<React.SetStateAction<number>>,
}

const MonthComponent = (props: Props) => {
    const [eventsMap, setEventsMap] = useState({})
    useEffect(() => {
        const newEventsMap = {};
        props.diaries.forEach(event => {
            // const dateKey = formatDateKey(event.date.getFullYear(), event.date.getMonth(), event.date.getDate());
            if (!newEventsMap[event.date]) {
                newEventsMap[event.date] = [];
            }
            newEventsMap[event.date].push(event);
        });
        setEventsMap(newEventsMap);
    }, [props.diaries]);

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
    const handleDayClick = (dateKey: string): void => {
        console.log(dateKey);
        props.setSelectedDate(dateKey)
        props.setIsOpenNew(true)
    }

    return (
        <>
            <div className="rightContainer">

                <div className="buttonContainer">

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
                <div className="month-view">


                    {grid.map((day, index) => {
                        let year = props.currentYear;
                        let month = props.currentMonth;
                        // Adjust for leading days
                        if (index < leadingDays.length) {
                            month -= 1;
                            if (month < 0) {
                                year -= 1;
                                month = 11; // December of the previous year
                            }
                            day = daysInPreviousMonth - leadingDays.length + index + 1;
                        }
                        // Adjust for trailing days
                        else if (index >= leadingDays.length + daysInMonth) {
                            month += 1;
                            if (month > 11) {
                                year += 1;
                                month = 0; // January of the next year
                            }
                            day = index - (leadingDays.length + daysInMonth) + 1;
                        }
                        const dateKey = formatDateKey(year, month, day);
                        const dayEvents = eventsMap[dateKey];
                        console.log(dayEvents)
                        return (dayEvents ?
                            <div key={index} className={`day ${index < leadingDays.length || index >= leadingDays.length + daysInMonth ? 'other-month' : ''}`}>
                                <span style={{ alignSelf: 'center' }}>
                                    {day}
                                </span>
                                {dayEvents.map(event => <DayComponent dayEvents={dayEvents} title={event.title} description={event.text} date={event.date} imageUrl={event.imageUrl} />)}
                            </div>
                            :
                            <div
                                onClick={() => handleDayClick(dateKey)}
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

        </>

    )
}

export default MonthComponent