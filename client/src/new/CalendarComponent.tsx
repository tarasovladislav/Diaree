import React from 'react'
import MonthComponent from './MonthComponent'
import { DiaryType } from '../Types/Types'

type Props = {
    diaries: DiaryType[]
}

const CalendarComponent = (props: Props) => {
    // useEffect for getting data 



    return (
        <div>
            <MonthComponent currentYear={2023} currentMonth={10} diaries={props.diaries} />
            {/* month 0 january */}
        </div>
    )
}

export default CalendarComponent

