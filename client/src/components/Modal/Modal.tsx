import React, { useRef, useEffect, useState } from 'react'
import './Modal.css'
type Props = {
    onClose: () => void;
}
const Modal = ({ children, onClose }: Props) => {
    const modalRef = useRef(null);
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                if (isModified) {
                    const confirmClose = window.confirm(
                        'You have unsaved changes. Are you sure you want to close?'
                    );
                    if (confirmClose) {
                        onClose();
                    }
                } else {
                    onClose();
                }
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose, isModified]);

    const handleInputChange = () => {
        setIsModified(true);
    };

    return (
        <>
            <div className="ModalBox">
                <div className="Modal-Overlay">
                    <div className="Modal" ref={modalRef}>
                        <button
                            className="close-button"
                            onClick={() => {
                                if (isModified) {
                                    const confirmClose = window.confirm(
                                        'You have unsaved changes. Are you sure you want to close?'
                                    );
                                    if (confirmClose) {
                                        onClose();
                                    }
                                } else {
                                    onClose();
                                }
                            }}
                            title="Close Modal"
                        >
                            CLOSE
                        </button>
                        {React.Children.map(children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, {
                                    onChange: handleInputChange,
                                });
                            }
                            return child;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};


export default Modal