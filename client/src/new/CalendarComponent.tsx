import React from 'react'
import MonthComponent from './MonthComponent'

type Props = {

}

const CalendarComponent = (props: Props) => {
    // useEffect for getting data 



    return (
        <div>
            <MonthComponent currentYear={2023} currentMonth={10} /> 
            {/* month 0 january */}
        </div>
    )
}

export default CalendarComponent

