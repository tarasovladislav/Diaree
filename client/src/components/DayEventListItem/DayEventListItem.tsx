import './DayEventListItem.css'
import { MdDelete } from "react-icons/md";
import { useDiary } from '../../Utils/diary';
import { useSingleEntry } from '../../Utils/singleEntry';
import { MdEditCalendar } from "react-icons/md";
import { DiaryType } from '../../Types/Types';

type Props = {
    event: DiaryType
}

const DayEventListItem = (props: Props) => {
    const { deleteEntry, setEditableEntry, setIsEditEntry, setIsShowDayEvents } = useDiary()
    const { setIsShowSingleEvent, setSelectedEntry } = useSingleEntry();

    return (
        <>
            <div className="eventListItem">
                <div className='eventListContent' onClick={() => {
                    setSelectedEntry(props.event);
                    setIsShowSingleEvent(true);
                    setIsShowDayEvents(false)
                }} >
                    {props.event.imageUrl && <img src={props.event.imageUrl} alt={props.event.title} />}
                    <div className="eventData" >
                        <h2>{props.event.title}</h2>
                        <p style={{ maxWidth: "95%" }}>{props.event.text}</p>
                    </div>
                </div>
                <div className="controlContainer">
                    <div className='controlButton'
                        onClick={() => {
                            deleteEntry(props.event._id)
                        }}
                    ><MdDelete size={24} /></div>
                    <div className='controlButton'
                        onClick={() => {
                            setEditableEntry(props.event);
                            setIsEditEntry(true)
                            setIsShowDayEvents(false)
                        }}
                    ><MdEditCalendar size={24} /></div>
                </div>
            </div>
        </>
    )
}

export default DayEventListItem