import './TagBox.css';

type TagBoxType = {
  data: {
    title: string
  }[]
}

type TagBoxItemType = {
  title: string,
}

const TagBoxItem: React.FC<TagBoxItemType> = ({ title }: TagBoxItemType) => {
  return (
      <div className="TagBox-Item">
          <p>{title}</p>
      </div>
  );
};

const TagBox: React.FC<TagBoxType> = ({ data }: TagBoxType) => {
  return (
    <div className="TagBox">
      {data && Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <TagBoxItem key={index} title={item.title} />
        ))
      ) : (
        <h4>No tags yet</h4>
      )}
    </div>
  )
}

export default TagBox