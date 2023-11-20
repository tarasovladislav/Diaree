import './Account.css';
import NavbarBox from '../MemoryBox/MemoryBox';
import TagBox from '../TagBox/TagBox';
import DiaryLogo from '../../../assets/diary.png';
import User from '../../../assets/user.png';
import { useEffect, useState } from 'react';
import { useDiary } from '../../../Utils/diary';

const Account: React.FC<{ isDashboardOpen: boolean, setIsDashboardOpen: (isDashboardOpen: boolean) => void }> = ({ isDashboardOpen, setIsDashboardOpen }) => {
    const { diaries, tagList } = useDiary()
    const [recentEvents, setRecentEvents] = useState([])

    useEffect(() => {
        const recents = diaries.sort((a, b) => b._id - a._id)
        setRecentEvents(recents)
    }, [diaries])

    return (
        <div className="Account" id={isDashboardOpen ? 'fadeIn' : 'fadeOut'}>
            <div className="Account-Main">
                <div className="Title" style={{ paddingBlockEnd: '5px' }} >
                    <div className="Start">
                        <h2>Settings</h2>
                    </div>
                    <div className="End">
                        <img src={DiaryLogo} alt="Logo" style={{ height: '32px' }} />
                        <img src={User} alt="User" style={{ height: '24px', borderRadius: '0' }} onClick={() => { setIsDashboardOpen(!isDashboardOpen) }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account