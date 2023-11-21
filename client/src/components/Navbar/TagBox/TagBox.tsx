import { useDiary } from '../../../Utils/diary';
import './TagBox.css';

type TagBoxType = {
    data: TagBoxItemType[]
}

type TagBoxItemType = {
    title: string,
    count: number
}

const TagBoxItem = ({ title, count }: TagBoxItemType) => {
    const { setSelectedTag, selectedTag } = useDiary()

    return (
        <div className={`TagBox-Item ${selectedTag === title ? "TagBox-Item-Selected" : ""}`} onClick={() => {
            if (selectedTag === title) {
                setSelectedTag(undefined)
            } else {
                setSelectedTag(title)
            }
        }}>
            <p>{title} ({count})</p>
        </div>
    );
};

const TagBox = ({ data }: TagBoxType) => {
    return (
        <div className="TagBox">
            {data && Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <TagBoxItem key={index} title={item.title} count={item.count} />
                ))
            ) : (
                <h4>No tags yet</h4>
            )}
        </div>
    )
}

export default TagBox