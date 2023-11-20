import './Account.css';
import DiaryLogo from '../../../assets/diary.png';
import User from '../../../assets/user.png';
import { useAuth } from '../../../Utils/auth';

const Account: React.FC<{ isDashboardOpen: boolean, setIsDashboardOpen: (isDashboardOpen: boolean) => void }> = ({ isDashboardOpen, setIsDashboardOpen }) => {
    const { logout } = useAuth();

    return (
        <div className="Account" id={isDashboardOpen ? 'fadeIn' : 'fadeOut'}>
            <div className="Account-Main">
                <div className="Title" style={{ paddingBlockEnd: '5px' }} >
                    <div className="Start">
                        <h2>Account</h2>
                    </div>
                    <div className="End">
                        <img src={DiaryLogo} alt="Logo" style={{ height: '32px' }} />
                        <img src={User} alt="User" style={{ height: '24px', borderRadius: '0' }} onClick={() => { setIsDashboardOpen(!isDashboardOpen) }} />
                    </div>
                </div>
                <footer>
                    <button>Reset Diary</button>
                    <button onClick={() => { logout() }}>Log out</button>
                </footer>
            </div>
        </div>
    )
}

export default Account