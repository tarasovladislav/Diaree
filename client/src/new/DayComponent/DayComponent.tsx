import React, { useState } from 'react';
import Modal from '../DayModal/DayModal';
import './DayComponent.css'
import DayEventListItem from '../DayEventListItem/DayEventListItem';
type Props = {
    title: string,
    description: string,
    date: string,
    image: string
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
                    <DayEventListItem title={props.title} description={props.description} date={props.date} image={props.image} />
                    <DayEventListItem title={props.title} description={props.description} date={props.date} image={props.image} />
                    <DayEventListItem title={props.title} description={props.description} date={props.date} image={props.image} />
                    <DayEventListItem title={props.title} description={props.description} date={props.date} image={props.image} />

                </div>
            </Modal>
        </>

        // </div>
    )
}

export default DayComponent