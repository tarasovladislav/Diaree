import './MemoryBox.css';

type MemoryBoxType = {
    data: {
        title: string,
        description: string
    }[]
}

type MemoryBoxItemType = {
    title: string,
    description: string
}

const MemoryBoxItem: React.FC<MemoryBoxItemType> = ({ title, description }: MemoryBoxItemType) => {
    return (
        <div className="MemoryBox-Item">
            <p>{title}</p>
            <span>{description}</span>
        </div>
    );
};

const MemoryBox: React.FC<MemoryBoxType> = ({ data }: MemoryBoxType) => {
    return (
        <div className="MemoryBox">
            {data && Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <MemoryBoxItem key={index} title={item.title} description={item.description} />
                ))
            ) : (
                <h4>No recent memories yet</h4>
            )}
        </div>
    );
};

export default MemoryBox;
