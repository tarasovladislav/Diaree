import { useDiary } from '../../Utils/diary'
import './ExistingDay.css';
import DayEventListItem from '../DayEventListItem/DayEventListItem';
import Modal from '../Modal/Modal';

const ExistingDay = () => {

    const { isShowDayEvents, setIsShowDayEvents, selectedDate, diariesByDate, setIsAddNewEvent } = useDiary()

    return (
        isShowDayEvents && selectedDate && (
            <Modal onClose={() => setIsShowDayEvents(false)}>
                <div className="Header">
                    <h1>{selectedDate}</h1>
                </div>
                <button className='button' onClick={() => {
                    setIsShowDayEvents(false)
                    setIsAddNewEvent(true)
                }}>Add New Event</button>
                <div className='EventList'>
                    {diariesByDate[selectedDate] && diariesByDate[selectedDate].map((event) => {
                        return <DayEventListItem event={event} />
                    })}
                </div>
            </Modal>

        )
    )
}

export default ExistingDay