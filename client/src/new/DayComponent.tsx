import React, { useState } from 'react';
import Modal from './DayModal';
type Props = {
  title: string,
  description: string,
  date: string,
  image: string
}

//object -> id, date, whats happening, image

const DayComponent = (props: Props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div>
      <div className='dayComponent' onClick={handleClick}>
        <span>{props.title}</span>
        {/* <img src={props.image} alt='day event' /> */}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>{props.title}</h2>
        <img src={props.image} alt={props.title} />
        <p>{props.description}</p>
      </Modal>

    </div>
  )
}

export default DayComponent