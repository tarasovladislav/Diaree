import './Account.css';
import DiaryLogo from '../../../assets/diary.png';
import User from '../../../assets/user.png';
import { useAuth } from '../../../Utils/auth';

const Account: React.FC<{ isDashboardOpen: boolean, setIsDashboardOpen: (isDashboardOpen: boolean) => void }> = ({ isDashboardOpen, setIsDashboardOpen }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        const shouldReset = window.confirm('Are you sure you want to log out?');
        if (shouldReset) logout();
    }

    return (
        <div className="Account" id={isDashboardOpen ? 'fadeIn' : 'fadeOut'}>
            <div className="Account-Main">
                <div className="Title" style={{ paddingBlockEnd: '5px' }} >
                    <div className="Start">
                        <h2>Account</h2>
                    </div>
                    <div className="End">
                        <img src={DiaryLogo} alt="Logo" style={{ height: '32px' }} onClick={() => { setIsDashboardOpen(!isDashboardOpen) }} />
                        <img src={User} alt="User" style={{ height: '24px', borderRadius: '0' }} />
                    </div>
                </div>
                <footer>
                    <button>Reset Diary</button>
                    <button onClick={handleLogout}>Log out</button>
                </footer>
            </div>
        </div>
    )
}

export default Account