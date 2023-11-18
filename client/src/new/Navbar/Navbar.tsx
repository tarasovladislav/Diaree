import './Navbar.css';
import NavbarBox from './MemoryBox/MemoryBox';
import TagBox from './TagBox/TagBox';
import DiaryLogo from '../../assets/diary.png';
import { useEffect, useState } from 'react';
import { useDiary } from '../../Utils/diary';



const mockTags = [
    {
        title: 'Test - (4)'
    },
    {
        title: 'Test2 - (3)'
    },
    {
        title: 'Test2.5'
    },
    {
        title: 'Test3 - (14)'
    },
    {
        title: 'Test2 - (3)'
    },
    {
        title: 'Test2.5'
    },
    {
        title: 'Test2 - (3)'
    },
    {
        title: 'Test2.5'
    },
    {
        title: 'Test - (4)'
    },
    {
        title: 'Test2 - (3)'
    },
    {
        title: 'Test2.5'
    },
    {
        title: 'Test3 - (14)'
    },
    {
        title: 'Test2 - (3)'
    },
    {
        title: 'Test2.5'
    },
    {
        title: 'Test2 - (3)'
    },
    {
        title: 'Test2.5'
    },
    {
        title: 'Test - (4)'
    },
    {
        title: 'Test2 - (3)'
    },
    {
        title: 'Test2.5'
    },
    {
        title: 'Test3 - (14)'
    },
    {
        title: 'Test2 - (3)'
    },
    {
        title: 'Test2.5'
    },
    {
        title: 'Test2 - (3)'
    },
    {
        title: 'Test2.5'
    }
]

const Navbar = () => {
    const { diaries, tagList } = useDiary()
    const [recentEvents, setRecentEvents] = useState([])

    useEffect(() => {
        const recents = diaries.sort((a, b) => b._id - a._id)
        setRecentEvents(recents)
    }, [diaries])


    return (
        <div className="Navbar">
            <div className="Title" style={{ paddingBlockEnd: '5px' }} >
                <h2>Dιαɾҽҽ</h2>
                <img src={DiaryLogo} alt="Logo" style={{ height: '32px' }} />
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
    )
}

export default Navbar