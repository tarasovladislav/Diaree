import './MemoryBox.css';
import { useSingleEntry } from '../../../Utils/singleEntry';
import { DiaryType } from '../../../Types/Types';

type MemoryBoxType = {
    data: DiaryType[]
}

type MemoryBoxItemType = {
    item: DiaryType
}

const MemoryBoxItem = ({ item }: MemoryBoxItemType) => {
    const { setIsShowSingleEvent, setSelectedEntry } = useSingleEntry();

    return (
        <div className="MemoryBox-Item" onClick={() => {
            setSelectedEntry(item);
            setIsShowSingleEvent(true);
        }} >
            <p>{item.title}</p>
        </div>
    );
};

const MemoryBox = ({ data }: MemoryBoxType) => {

    return (
        <div className="MemoryBox">
            {data && Array.isArray(data) && data.length > 0 ? (
                data.slice(0, 4).map((item, index) => (
                    <MemoryBoxItem key={index} item={item} />
                ))
            ) : (
                <h4>No recent memories</h4>
            )}
        </div>
    );
};

export default MemoryBox;
