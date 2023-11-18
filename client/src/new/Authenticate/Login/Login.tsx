import './Login.css';
import React from 'react';
import User from '../../../assets/user.png';
import Lock from '../../../assets/lock.png';
import { postLogin } from '../../../ApiService';

type LoginType = {
    setIsOnLogin: () => { }
}

const Login: React.FC<LoginType> = ({ setIsOnLogin }: LoginType) => {
    const handleLogin = async (e: any) => {
        e.preventDefault();
        const username = e.currentTarget.username.value;
        const password = e.currentTarget.password.value;

        const response = await postLogin(username, password);

        if (response.token) return localStorage.setItem('token', response.token);
        alert(response.error);
    }


    return (
        <div className="Login">
            <div className="Login-Main">
                <div className="Switch">
                    <button className='Button-Disabled'>Log In</button>
                    <button onClick={() => { setIsOnLogin(false) }}>Register</button>
                </div>
                <form className="Login-Form" onSubmit={handleLogin}>
                    <div className="Title">
                        <h2>Welcome to <span>Dιαɾҽҽ</span>.</h2>
                        <p>No, not Diarrhea...</p>
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
                            <a href='/register'>or register</a>
                            <button>Log in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login