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
    image: string
}


const DayComponent = (props: Props) => {
    const [dayDiaries, setDayDiaries]=useState([])

    useEffect(() => {
        getAllDiaryEntriesByDate(props.date)
            .then((data) => {
                setDayDiaries(data);
            })
            .catch((error) => console.error(error));
    }, []);



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
                <span>{props.title}</span>
                {/* <img src={props.image} alt='day event' /> */}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="modalComponent">
                    <div className="header">
                        <h1>{props.date}</h1>
                        <button>Add New Event</button>

                    </div>
                    {/* array.map and each  */}
                    {dayDiaries.map((event)=><DayEventListItem title={event.title} description={event.description} date={event.date} image={event.image} />)}

                </div>
            </Modal>
        </>

        // </div>
    )
}

export default DayComponent