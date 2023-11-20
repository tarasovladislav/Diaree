import './Dashboard.css';
import NavbarBox from '../MemoryBox/MemoryBox';
import TagBox from '../TagBox/TagBox';
import DiaryLogo from '../../../assets/diary.png';
import User from '../../../assets/user.png';
import { useEffect, useState } from 'react';
import { useDiary } from '../../../Utils/diary';

const Dashboard: React.FC<{ isDashboardOpen: boolean, setIsDashboardOpen: (isDashboardOpen: boolean) => void }> = ({ isDashboardOpen, setIsDashboardOpen }) => {
    const { diaries, tagList } = useDiary()
    const [recentEvents, setRecentEvents] = useState([])

    useEffect(() => {
        const recents = diaries.sort((a, b) => b._id - a._id)
        setRecentEvents(recents)
    }, [diaries])

    return (
        <div className="Dashboard" id={isDashboardOpen ? 'fadeIn' : 'fadeOut'}>
            <div className="Dashboard-Main">
                <div className="Title" style={{ paddingBlockEnd: '5px' }} >
                    <div className="Start">
                        <h2>Dιαɾҽҽ</h2>
                    </div>
                    <div className="End">
                        <img src={DiaryLogo} alt="Logo" style={{ height: '32px' }} />
                        <img src={User} alt="User" style={{ height: '24px', borderRadius: '0' }} onClick={() => { setIsDashboardOpen(!isDashboardOpen) }} />
                    </div>
                </div>
                <div className="Recent-Memories">
                    <h4>Recent memories</h4>
                    <NavbarBox data={recentEvents} />
                </div>
                <div className="Border"></div>
                <div className="Random-Memorie">
                    <button>Random memory</button>
                </div>
                <div className="Border" style={{ paddingBlockStart: '0px' }}></div>
                <div className="Tags">
                    <h4>Tags</h4>
                    <TagBox data={tagList} />
                </div>
                <footer>
                    <div className="Border" style={{ marginBottom: '15px' }}></div>
                    <p>&copy; Diarrhea<br />All toilet paper reserved.</p>
                </footer>
            </div>
        </div>
    )
}

export default Dashboard