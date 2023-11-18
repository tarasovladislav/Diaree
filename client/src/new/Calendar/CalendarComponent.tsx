import './CalendarComponent.css';
import { useState } from 'react'
import MonthComponent from '../Month/MonthComponent'
import { DiaryType } from '../../Types/Types'
import { useDiary } from '../../Utils/diary';

type Props = {
    setIsOpenNew: any
}

const CalendarComponent = (props: Props) => {
    // useEffect for getting data 
    const { diaries, setSelectedDate } = useDiary();
    

    //testing
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())

    return (
        <div className='Calendar'>
            <MonthComponent currentYear={currentYear} setCurrentYear={setCurrentYear} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} diaries={diaries} setSelectedDate={setSelectedDate} setIsOpenNew={props.setIsOpenNew} />
            {/* month 0 january */}
        </div>
    )
}

export default CalendarComponent

