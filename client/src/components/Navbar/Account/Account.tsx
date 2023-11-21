import './Account.css';
import DiaryLogo from '../../../assets/diary.png';
import User from '../../../assets/user.png';
import Lock from '../../../assets/lock.png';
import { useAuth } from '../../../Utils/auth';
import { useState } from 'react';
import { postLogin, putUpdate } from '../../../ApiService';
import { log } from 'console';
import { MdPassword } from 'react-icons/md';

const Account: React.FC<{ isDashboardOpen: boolean, setIsDashboardOpen: (isDashboardOpen: boolean) => void }> = ({ isDashboardOpen, setIsDashboardOpen }) => {
    const { token, logout, user, setUser } = useAuth();
    const [isDisabled, setIsDisabled] = useState(true);

    const handleLogout = () => {
        const shouldReset = window.confirm('Are you sure you want to log out?');
        if (shouldReset) logout();
    }

    const handleConfirmPassword = (e) => {
        const password = e.target.value;
        setIsDisabled(password.length === 0 ? true : false);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const newUsername = e.target.username.value;
        const newPassword = e.target.password.value;
        const currentPassword = e.target.currentPassword.value;
        
        if (newUsername === '' && newPassword === '') {
            e.target.username.value = '';
            e.target.password.value = '';
            e.target.currentPassword.value = '';
            return alert('Please provide a new username and/or password');

        }

        if (newUsername === user.username) {
            e.target.username.value = '';
            e.target.password.value = '';
            e.target.currentPassword.value = '';
            return alert('New username and current suername cannot be the same');
        }

        if (newPassword === currentPassword) {
            e.target.password.value = '';
            e.target.currentPassword.value = '';
            return alert('New password and current password cannot be the same');
        }

        const validUser = await postLogin(user.username, currentPassword);
        if (validUser.token) {
            const response = await putUpdate(newUsername === '' ? user.username : newUsername, newPassword === '' ? undefined : newPassword, token);
            if (response.status === 200) {
                setUser({
                    ...user,
                    username: newUsername
                })
                e.target.username.value = '';
                e.target.password.value = '';
                e.target.currentPassword.value = '';
                return alert(response.message);
            }
        } else {
            e.target.username.value = '';
            e.target.password.value = '';
            e.target.currentPassword.value = '';
            return alert('Invalid password provided');
        }
        
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
                        <img src={User} alt="User" style={{ height: '24px', borderRadius: '0', cursor: 'not-allowed' }} />
                    </div>
                </div>
                <form className="Update" onSubmit={handleSave}>
                    <h4>Settings</h4>
                    <div className="Credentials">
                        <div className="Update-Item">
                            <img src={User} alt="User" />
                            <input type="text" name='username' placeholder='New username' />
                        </div>
                        <div className="Update-Item">
                            <img src={Lock} alt="Lock" />
                            <input type="password" name='password' placeholder='New password' />
                        </div>
                    </div>
                    <br />
                    <div className="Border"></div>
                    <br />
                    <div className="Validation">
                        <div className="Update-Item">
                            <img src={Lock} alt="Lock" />
                            <input type="password" name='currentPassword' placeholder='Current password' onChange={handleConfirmPassword} />
                        </div>
                        <button type='submit' disabled={isDisabled}>Save</button>
                    </div>
                </form>
                <div className="Border"></div>
                <footer>
                    <button>Reset Diary</button>
                    <button onClick={handleLogout}>Log out</button>
                </footer>
            </div>
        </div>
    )
}

export default Account