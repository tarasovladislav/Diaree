import './Register.css';
import User from '../../../assets/user.png';
import Lock from '../../../assets/lock.png';
import { postRegister } from '../../../ApiService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Utils/auth';

const Register: React.FC<{ isOnLogin: boolean, setIsOnLogin: (isOnLogin: boolean) => void }> = ({ isOnLogin, setIsOnLogin }) => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [formData, setFormData] = useState({
        password: '',
        isFirstPasswordValid: false,
        isSecondPasswordMatching: false,
        borderColor: '',
    });

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password, confirmPassword } = e.currentTarget;
        if (password.value !== confirmPassword.value) {
            password.value = '';
            confirmPassword.value = '';
            return alert("Passwords don't match");
        }

        const response = await postRegister(username.value, password.value);

        if (response.token) {
            setToken(response.token);
            localStorage.setItem('token', response.token)
            navigate('/home');

        } else {
            alert(response.error);
            username.value = '';
            password.value = '';
            confirmPassword.value = '';
        }
    };

    const handleFirstPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setFormData({
            ...formData,
            password,
            isFirstPasswordValid: password.length >= 4,
        });
    };

    const handleSecondPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _password = e.target.value;
        if (_password.length === 0) return setFormData({ ...formData, borderColor: '1px solid rgba(0, 0, 0, 0.1)' })
        if (_password.length < 3) return;
        setFormData({
            ...formData,
            isSecondPasswordMatching: _password !== formData.password,
            borderColor: _password !== formData.password ? '1px solid red' : '1px solid green',
        });
    };


    return (
        <div className="Register" id={isOnLogin ? 'fadeIn' : 'fadeOut'}>
            <div className="Register-Main">
                <div className="Switch">
                    <button>Register</button>
                    <button onClick={() => { setIsOnLogin(true) }} className='Button-Focused'>Log In</button>
                </div>
                <form className="Register-Form" onSubmit={handleRegister}>
                    <div className="Title">
                        <div className="State">
                            <h2>Welcome to <span>Dιαɾҽҽ</span>.</h2>
                            <h2>Register</h2>
                        </div>
                        <p>No, not Diarrhea...</p>
                    </div>
                    <div className="Credentials">
                        <div className="Username">
                            <img src={User} />
                            <input type="text" name='username' placeholder='Username' required={true} />
                        </div>
                        <div className="Password">
                            <img src={Lock} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required={true}
                                minLength={4}
                                onChange={handleFirstPassword}
                                style={formData.isFirstPasswordValid ? { borderBottom: '1px solid green' } : {}}
                            />
                        </div>
                        <div className="Confirm-Password">
                            <img src={Lock} />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                required={true}
                                minLength={4}
                                onChange={handleSecondPassword}
                                style={{ borderBottom: formData.borderColor }}
                            />
                        </div>
                        <div className="Submit">
                            <a href='#' onClick={() => { setIsOnLogin(true) }}>or log in</a>
                            <button>Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register