import './MemoryBox.css';
import { useSingleEntry } from '../../../Utils/singleEntry';
import { DiaryType } from '../../../Types/Types';
type MemoryBoxType = {
    data: {
        title: string,

    }[]
}

type MemoryBoxItemType = {
    title: string,
    item: DiaryType
}

const MemoryBoxItem: React.FC<MemoryBoxItemType> = ({ title,item }: MemoryBoxItemType) => {
    const { setIsShowSingleEvent, setSelectedEntry } = useSingleEntry();



    return (
        <div className="MemoryBox-Item" onClick={() => {
            setSelectedEntry(item);
            setIsShowSingleEvent(true);
        }} >
            <p>{title}</p>
        </div>
    );
};

const MemoryBox: React.FC<MemoryBoxType> = ({ data }: MemoryBoxType) => {




    return (
        <div className="MemoryBox">
            {data && Array.isArray(data) && data.length > 0 ? (
                data.slice(0, 4).map((item, index) => (
                    <MemoryBoxItem key={index} item={item} title={item.title} text={item.text} />
                ))
            ) : (
                <h4>No recent memories</h4>
            )}
        </div>
    );
};

export default MemoryBox;
