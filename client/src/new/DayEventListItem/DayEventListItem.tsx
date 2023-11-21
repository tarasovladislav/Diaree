import React from 'react'
import './DayEventListItem.css'
import { MdDelete } from "react-icons/md";
import { useDiary } from '../../Utils/diary';
import { useSingleEntry } from '../../Utils/singleEntry';
import { MdEditCalendar } from "react-icons/md";


type Props = {
    title: string,
    text: string,
    date: string,
    imageUrl: string,
    _id: string,
    tags: [],
    event: {}
}

const DayEventListItem = (props: Props) => {
    const { deleteEntry, setEditableEntry, setIsEditEntry, setIsShowDayEvents } = useDiary()
    const { setIsShowSingleEvent, setSelectedEntry } = useSingleEntry();
    console.log(props)
    return (
        <>
            <div className="eventListItem">

                <div className='eventListContent' onClick={() => {
                    setSelectedEntry(props);
                    setIsShowSingleEvent(true);
                }} >
                    {props.imageUrl && <img src={props.imageUrl} alt={props.title} />}
                    <div className="eventData" >
                        <h2>{props.title}</h2>
                        <p>{props.text}</p>
                    </div>
                </div>
                <div className="controlContainer">
                    <div className='controlButton'
                        onClick={() => {
                            deleteEntry(props._id)
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