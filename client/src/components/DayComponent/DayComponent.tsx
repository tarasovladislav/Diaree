import './DayComponent.css'
import { DiaryType } from '../../Types/Types'
import { useDiary } from '../../Utils/diary';
type Props = {
    title: string,
    imageUrl: string,
    tags: [],
    dayEvents: DiaryType[],
    _id: string
}

//TODO rename this component
const DayComponent = (props: Props) => {
    const { isShowDayEvents, setIsShowDayEvents, selectedTag } = useDiary();
    return (
        <div
            className={`DayComponent ${props.tags.findIndex(el => el.title === selectedTag) !== -1 ? "tagIncluded" : ""}`}
            onClick={() => setIsShowDayEvents(true)} >
            <span>{props.title}</span>
        </div>
    )
}

export default DayComponent