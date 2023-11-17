import React, { useEffect, useState } from 'react'
import './MonthComponent.css'
type Props = {
    currentYear: number,
    currentMonth: number,
}

type EventData = {
    title: string,
    text: string,
    date: string,
    imageUrl: string,
}
const MonthComponent = (props: Props) => {

    const events = [{
        title: 'Title',
        text: 'descriptions',
        date: '2023-10-01',
        imageUrl: 'string',
    },
    {
        title: 'Vlads Birthday',
        text: 'descriptions',
        date: '2023-09-30',
        imageUrl: 'string',
    },
    {
        title: 'Vlads Birthday',
        text: 'descriptions',
        date: '2023-11-01',
        imageUrl: 'string',
    },
    {
        title: 'Vlads Birthday',
        text: 'descriptions',
        date: '2023-11-28',
        imageUrl: 'string',
    },
    {
        title: 'Vlads Birthday',
        text: 'descriptions',
        date: '2023-12-01',
        imageUrl: 'string',
    },

    ]




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

    //missing type def
    const eventsMap = new Map(
        events.map(event => [event.date, event])
    );
    // Helper function to create the date string in 'YYYY-MM-DD' format
    const formatDateKey = (year: number, month: number, day: number) => {
        // Correctly adjust month number for JavaScript Date (0-11)
        month += 1;
        // Pad single digit month and day with leading zeros
        const paddedMonth = month.toString().padStart(2, '0');
        const paddedDay = day.toString().padStart(2, '0');
        // Return the date string
        return `${year}-${paddedMonth}-${paddedDay}`;
    };

    return (
        <div className="month-view">
            {grid.map((day, index) => {
                // Determine the correct year, month, and day for the dateKey
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
                const dayEvents = eventsMap.get(dateKey);
                return (
                    <div key={index} className={`day ${index < leadingDays.length || index >= leadingDays.length + daysInMonth ? 'other-month' : ''}`}>
                        {day}
                        {dayEvents && (
                            <div className="event">
                                <h4>{dayEvents.title}</h4>

                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    )
}

export default MonthComponent