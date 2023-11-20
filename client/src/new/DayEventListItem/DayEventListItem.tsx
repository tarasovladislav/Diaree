import React from 'react'
import './DayEventListItem.css'
import { MdDelete } from "react-icons/md";
import { useDiary } from '../../Utils/diary';
import { useSingleEntry } from '../../Utils/singleEntry';


type Props = {
    title: string,
    text: string,
    date: string,
    imageUrl: string,
    _id: string
}

const DayEventListItem = (props: Props) => {
    const { deleteEntry } = useDiary()
    const { setIsShowSingleEvent, setSelectedEntry } = useSingleEntry();

    // const handleClick = (entry)=>{
    //     console.log(entry);
    //     setSelectedEntry(entry);
    //     setIsShowSingleEvent(true);
    // } //
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
                <div className='deleteButton'
                    onClick={() => {
                        deleteEntry(props._id)
                    }}
                ><MdDelete size={24} /></div>


            </div>
        </>
    )
}

export default DayEventListItem