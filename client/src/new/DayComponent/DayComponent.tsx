import React, { useEffect, useState } from 'react';
import Modal from '../DayModal/DayModal';
import './DayComponent.css'
import DayEventListItem from '../DayEventListItem/DayEventListItem';
import { DiaryType } from '../../Types/Types'
import { useDiary } from '../../Utils/diary';

type Props = {
    title: string,
    imageUrl: string
    dayEvents: DiaryType[]
}


const DayComponent = (props: Props) => {
    const { isShowDayEvents, setIsShowDayEvents } = useDiary()

    return (
        <>
            <div className='dayComponent' onClick={() => setIsShowDayEvents(true)} style={{ backgroundColor: '#eee', flex: 1 }}>
                {props.imageUrl && <img src={props.imageUrl} style={{ width: '40px', height: '40px' }} alt='day event' />}
                <span>{props.title}</span>
            </div>

            {/* <Modal>
                <div className="modalComponent">
                    <div className="header">
                        <h1>{props.date}</h1>
                        <button>Add New Event</button>
                    </div>
                    {props.dayEvents && props.dayEvents.map((event) => <DayEventListItem title={event.title} description={event.description} date={event.date} imageUrl={event.imageUrl} />)}
                </div>
            </Modal > */}
        </>

    )
}

export default DayComponent