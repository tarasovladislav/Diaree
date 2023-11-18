import React from "react";
import './DayModal.css'
import { useDiary } from '../../Utils/diary';

interface ModalProps {
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const { isShowDayEvents, setIsShowDayEvents } = useDiary()


    return (
        isShowDayEvents && <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button"
                    onClick={() => setIsShowDayEvents(false)}
                    title="Close Modal">
                    &times; CLOSE
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;