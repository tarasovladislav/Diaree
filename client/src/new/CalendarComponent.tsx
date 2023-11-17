import './CalendarComponent.css';
import React, { useState } from 'react'
import MonthComponent from './MonthComponent'
import { DiaryType } from '../Types/Types'

type Props = {
    diaries: DiaryType[],
    setSelectedDate: any,
    setIsOpenNew: any
}

const CalendarComponent = (props: Props) => {
    // useEffect for getting data 

    //testing
    const [currentYear, setCurrentYear] = useState(2023)
    const [currentMonth, setCurrentMonth] = useState(10)

    return (
        <div className='Calendar'>
            <MonthComponent currentYear={currentYear} setCurrentYear={setCurrentYear} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} diaries={props.diaries} setSelectedDate={props.setSelectedDate} setIsOpenNew={props.setIsOpenNew} />
            {/* month 0 january */}
        </div>
    )
}

export default CalendarComponent

