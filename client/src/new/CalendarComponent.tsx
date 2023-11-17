import './CalendarComponent.css';
import MonthComponent from './MonthComponent'
import { DiaryType } from '../Types/Types'

type Props = {
    diaries: DiaryType[],
    setSelectedDate: any,
    setIsOpenNew: any
}

const CalendarComponent = (props: Props) => {
    // useEffect for getting data 

    return (
        <div className='Calendar'>
            <MonthComponent currentYear={2023} currentMonth={10} diaries={props.diaries} setSelectedDate={props.setSelectedDate} setIsOpenNew={props.setIsOpenNew} />
            {/* month 0 january */}
        </div>
    )
}

export default CalendarComponent

