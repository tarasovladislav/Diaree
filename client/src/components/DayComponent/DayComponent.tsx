import './DayComponent.css'
import { DiaryType } from '../../Types/Types'
import { useDiary } from '../../Utils/diary';
type Props = {
    event: DiaryType;
    dayEvents: DiaryType[]
}

const DayComponent = (props:Props) => {
    const { isShowDayEvents, setIsShowDayEvents, selectedTag } = useDiary();
    
    return (
        <div
            className={`DayComponent ${props.event.tags.findIndex(el => el.title === selectedTag) !== -1 ? "tagIncluded" : ""}`}
            onClick={() => setIsShowDayEvents(true)} >
            <span>{props.event.title}</span>
        </div>
    )
}

export default DayComponent