import React from 'react'
import './DayEventListItem.css'
import { MdDelete } from "react-icons/md";
import { deleteDiaryEntry } from '../../ApiService'
import { useDiary } from '../../Utils/diary';

type Props = {
    title: string,
    description: string,
    date: string,
    imageUrl: string,
    _id: string
}

const DayEventListItem = (props: Props) => {
    const {deleteEntry} = useDiary()
    return (
        <>
            <div className="eventListItem">
                {props.imageUrl && <img src={props.imageUrl} alt={props.title} />}
                <div className="eventData">
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
                </div>
                <div className='deleteButton' 
                onClick={()=>{
                    deleteEntry(props._id)
                    //also delete from loaded diaries
                }}
                ><MdDelete size={24} /></div>
            </div>
        </>
    )
}

export default DayEventListItem