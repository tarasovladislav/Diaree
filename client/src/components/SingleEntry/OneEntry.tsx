import Modal from '../Modal/Modal';
import { useSingleEntry } from '../../Utils/singleEntry';
import './OneEntry.css'
type Props = {}

const OneEntry = (props: Props) => {

    const { isShowSingleEvent, setIsShowSingleEvent, selectedEntry } = useSingleEntry();
    return (
        isShowSingleEvent && (
            <Modal onClose={() => setIsShowSingleEvent(false)}>
                <div className="oneEntryContent">
                    <div className="Header">
                        <h1>{selectedEntry.title}</h1>
                    </div>
                    <div className='description-container'>
                        {selectedEntry.imageUrl && <img src={selectedEntry.imageUrl} />}
                        <p>{selectedEntry.text}</p>
                    </div>
                </div>
            </Modal>
        )
    )
}

export default OneEntry;