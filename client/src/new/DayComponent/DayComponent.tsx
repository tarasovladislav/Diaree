import './DayComponent.css'
import { DiaryType } from '../../Types/Types'
import { useDiary } from '../../Utils/diary';
type Props = {
    title: string,
    imageUrl: string,
    tags: [],
    dayEvents: DiaryType[],
    _id:string
}


const DayComponent = (props: Props) => {
    const { isShowDayEvents, setIsShowDayEvents, selectedTag } = useDiary();
    return (
        <div
            className={`DayComponent ${props.tags.findIndex(el => el.title === selectedTag) !== -1 ? "tagIncluded" : ""}`}
            onClick={() => setIsShowDayEvents(true)} >
            {props.imageUrl && <img src={props.imageUrl} style={{ width: '40px', height: '40px' }} alt='day event' />}
            <span>{props.title}</span>
        </div>
    )
}

export default DayComponent