import './Account.css';
import DiaryLogo from '../../../assets/diary.png';
import User from '../../../assets/user.png';
import Lock from '../../../assets/lock.png';
import { useAuth } from '../../../Utils/auth';
import { useState } from 'react';
import { postLogin, putUpdate } from '../../../ApiService';

type Props = {
    isDashboardOpen: boolean,
    setIsDashboardOpen: (isDashboardOpen: boolean) => void
}

const Account = ({ isDashboardOpen, setIsDashboardOpen }: Props) => {
    const { token, logout, user, setUser } = useAuth();
    const [isDisabled, setIsDisabled] = useState(true);

    const handleLogout = (): void => {
        const shouldReset = window.confirm('Are you sure you want to log out?');
        if (shouldReset) logout();
    }

    const handleConfirmPassword = (e:React.ChangeEvent<HTMLInputElement>): void => {
        const password = e.target.value;
        setIsDisabled(password.length === 0 ? true : false);
    }

    const handleSave = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const newUsername = e.target.username.value;
        const newPassword = e.target.password.value;
        const currentPassword = e.target.currentPassword.value;

        const resetFields = (e: React.ChangeEvent<HTMLFormElement>) => {
            e.target.username.value = '';
            e.target.password.value = '';
            e.target.currentPassword.value = '';
        }

        if (newUsername === '' && newPassword === '') {
            resetFields(e);
            alert('Please provide a new username and/or password');
            return
        }

        if (newUsername === user.username) {
            resetFields(e);
            alert('New username and current username cannot be the same');
            return
        }

        if (newPassword === currentPassword) {
            resetFields(e);
            alert('New password and current password cannot be the same');
            return
        }

        const validUser = await postLogin(user.username, currentPassword);
        if (validUser.token && typeof token === 'string') {
            const response = await putUpdate(newUsername === '' ? user.username : newUsername, newPassword === '' ? undefined : newPassword, token);
            if (response.status === 200) {
                setUser({
                    ...user,
                    username: newUsername
                })
                resetFields(e);
                alert(response.message);
                return
            }
        } else {
            resetFields(e);
            alert('Invalid password provided');
            return
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
                    <h4>{`${user.username}'s settings`}</h4>
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