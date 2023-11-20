import './CalendarComponent.css';
import { useState } from 'react'
import MonthComponent from '../Month/MonthComponent'

const CalendarComponent = () => {
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())

    return (
        <div className='Calendar'>
            <MonthComponent
                currentYear={currentYear}
                setCurrentYear={setCurrentYear}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth} />
        </div>
    )
}

export default CalendarComponent

