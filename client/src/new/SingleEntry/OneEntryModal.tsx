import Modal from '../Modal/Modal';
import { useSingleEntry } from '../../Utils/singleEntry';

type Props = {}

const OneEntryModal = (props: Props) => {

    const {isShowSingleEvent, setIsShowSingleEvent, selectedEntry  } = useSingleEntry();
    console.log('entry in modal',selectedEntry);
    return (
        isShowSingleEvent && (
            <Modal onClose={() => setIsShowSingleEvent(false)}>
                <div className="Header">
                    <h1>{selectedEntry?.title}</h1>
                </div>
                <div className='description-container'>
                    <img src={selectedEntry?.imageUrl} />
                    <p>{selectedEntry?.text}</p>
                </div>
            </Modal>
        )
    )
}

export default OneEntryModal;