import React from 'react'
import { useDiary } from '../../Utils/diary'
import './ExistingDay.css';
import DayEventListItem from '../DayEventListItem/DayEventListItem';
type Props = {}

const ExistingDay = (props: Props) => {

    const { isShowDayEvents, setIsShowDayEvents, selectedDate, diariesByDate } = useDiary()


    return (
        isShowDayEvents && (

            <div className="DiaryEntry">
                <div className="Modal-Overlay">
                    <div className="Modal">
                        <button className="Close" onClick={() => setIsShowDayEvents(false)}>Close</button>
                       

                        <div className="Title">
                            <div className="header">
                                <h1>{selectedDate}</h1>
                                <button>Add New Event</button>
                            </div>
                            {diariesByDate[selectedDate] && diariesByDate[selectedDate].map((event) => {
                                return <DayEventListItem title={event.title} description={event.description} date={event.date} imageUrl={event.imageUrl} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default ExistingDay