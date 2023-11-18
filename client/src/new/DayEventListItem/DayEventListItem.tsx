import React from 'react'
import './DayEventListItem.css'
type Props = {
    title: string,
    description: string,
    date: string,
    image: string
}

const DayEventListItem = (props: Props) => {
    return (
        <>
            <div className="eventListItem">
                {props.image && <img src={props.image} alt={props.title} />}
                <div className="eventData">
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
                </div>
            </div>
        </>
    )
}

export default DayEventListItem