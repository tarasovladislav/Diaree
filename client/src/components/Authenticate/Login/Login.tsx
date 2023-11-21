import './Login.css';
import React from 'react';
import User from '../../../assets/user.png';
import Lock from '../../../assets/lock.png';
import { postLogin } from '../../../ApiService';
import { redirect, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Utils/auth';

const Login: React.FC<{ isOnLogin: boolean, setIsOnLogin: (isOnLogin: boolean) => void }> = ({ isOnLogin, setIsOnLogin }) => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const handleLogin = async (e: any) => {
        e.preventDefault();
        const username = e.currentTarget.username;
        const password = e.currentTarget.password;

        const response = await postLogin(username.value, password.value);

        if (response.token) {
            setToken(response.token);
            localStorage.setItem('token', response.token)
            navigate('/home');
        } else {
            alert(response.error);
            username.value = '';
            password.value = '';
        }
    }




    return (
        <div className="Login" id={isOnLogin ? 'fadeIn' : 'fadeOut'}>
            <div className="Login-Main">
                <div className="Switch">
                    <button onClick={() => { setIsOnLogin(false) }}>Register</button>
                    <button className='Button-Disabled'>Log In</button>
                </div>
                <form className="Login-Form" onSubmit={handleLogin}>
                    <div className="Title">
                        <div className="State">
                            <h2>Welcome <span>back</span>!</h2>
                            <h2>Log In</h2>
                        </div>
                        <p>We missed you!</p>
                    </div>
                    <div className="Credentials">
                        <div className="Username">
                            <img src={User} />
                            <input type="text" name='username' placeholder='Username' required={true} />
                        </div>
                        <div className="Password">
                            <img src={Lock} />
                            <input type="password" name='password' placeholder='Password' required={true} />
                        </div>
                        <div className="Submit">
                            <a href='#' onClick={() => { setIsOnLogin(false) }}>or register</a>
                            <button>Log in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login