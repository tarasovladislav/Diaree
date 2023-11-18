import React, { useEffect, useState } from 'react';
import Modal from '../DayModal/DayModal';
import './DayComponent.css'
import DayEventListItem from '../DayEventListItem/DayEventListItem';
import { getAllDiaryEntriesByDate } from '../../ApiService'
import { DiaryType } from '../../Types/Types'

type Props = {
    title: string,
    description: string,
    date: string,
    imageUrl: string
    dayEvents: DiaryType[]
}


const DayComponent = (props: Props) => {


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (): void => {
        setIsModalOpen(true);
    };

    const handleCloseModal = (): void => {
        setIsModalOpen(false);
    };


    return (
        // <div style={{ display: 'flex',  }}>
        <>
            <div className='dayComponent' onClick={handleClick} style={{ backgroundColor: '#eee', flex: 1 }}>
                {props.imageUrl && <img src={props.imageUrl} style={{ width: '40px', height: '40px' }} alt='day event' />}
                <span>{props.title}</span>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="modalComponent">
                    <div className="header">
                        <h1>{props.date}</h1>
                        <button>Add New Event</button>
                    </div>
                    {props.dayEvents && props.dayEvents.map((event) => <DayEventListItem title={event.title} description={event.description} date={event.date} imageUrl={event.imageUrl} />)}
                </div>
            </Modal>
        </>

    )
}

export default DayComponent