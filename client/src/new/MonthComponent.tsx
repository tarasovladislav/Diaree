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
    // const [events, setEvents] = useState<EventData[]>([])
    const events = [{
        title: 'Title',
        text: 'descriptions',
        date: '2023-11-17',
        imageUrl: 'string',
    },
    {
        title: 'Vlads Birthday',
        text: 'descriptions',
        date: '2023-11-29',
        imageUrl: 'string',
    },
    {
        title: 'Sosi sosi time',
        text: 'descriptions',
        date: '2023-11-18',
        imageUrl: 'string',
    },{
        title: 'Vlads Birthday',
        text: 'descriptions',
        date: '2023-11-30',
        imageUrl: 'string',
    },

]
    // useEffect(() => {
    //     setEvents([
    //         {
    //             title: 'Title',
    //             text: 'descriptions',
    //             date: '2023-11-17',
    //             imageUrl: 'string',
    //         }
    //     ])
    // }, [])




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
    const trailingDaysCount = 35 - (firstDayOfMonth + daysInMonth);
    const trailingDays = Array.from({ length: trailingDaysCount }, (_, i) => i + 1);
    const grid = [...leadingDays, ...currentMonthDays, ...trailingDays];

    const eventsMap = new Map(
        events.map(event => [event.date, event])
    );



    return (
        <div className="month-view">
            {grid.map((day, index) => {
                const dateKey = `${props.currentYear}-${String(props.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                console.log(dateKey)
                const dayEvents = eventsMap.get(dateKey);
                console.log(dayEvents)
                return (
                    <div key={index} className={`day ${index < leadingDays.length || index >= leadingDays.length + daysInMonth ? 'other-month' : ''}`}>
                        {day}
                        {/* {dayEvents && dayEvents.map(event => ( */}
                        {dayEvents && <div key={dayEvents.title} className="event">
                            <h4>{dayEvents.title}</h4>
                            {/* <img src={dayEvents.imageUrl} alt={dayEvents.title} /> */}
                            {/* <p>{dayEvents.text}</p> */}
                        </div>}
                        {/* ))} */}
                    </div>
                );
            })}
        </div>
    )
}

export default MonthComponent