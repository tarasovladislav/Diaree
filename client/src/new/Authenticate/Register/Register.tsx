import './Register.css';
import User from '../../../assets/user.png';
import Lock from '../../../assets/lock.png';
import { postLogin } from '../../../ApiService';
import { useState } from 'react';

type RegisterType = {
    isOnLogin: boolean,
    setIsOnLogin: (isOnLogin: boolean) => {}
}

const Register: React.FC<RegisterType> = ({ isOnLogin, setIsOnLogin }: RegisterType) => {
    const [password, setPassword] = useState('');
    const [isFirstPasswordValid, setisFirstPasswordValid] = useState(false);
    const [isSecondPasswordMatching, setIsSecondPasswordMatching] = useState(false);
    const [color, setColor] = useState('')

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const username = e.currentTarget.username.value;
        const password = e.currentTarget.password.value;

        const response = await postLogin(username, password);

        if (response.token) return localStorage.setItem('token', response.token);
        alert(response.error);
    }

    const handleFirstPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _password = e.target.value;
        setPassword(_password)
        setisFirstPasswordValid(_password.length >= 4);
    };

    const handleSecondPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _password = e.target.value;
        setIsSecondPasswordMatching(_password !== password);
        if (_password.length >= 3) setColor(_password !== password ? '1px solid red' : '1px solid green')
    };


    return (
        <div className="Register" id={isOnLogin ? 'fadeIn' : 'fadeOut'}>
            <div className="Register-Main">
                <div className="Switch">
                    <button onClick={() => { setIsOnLogin(true) }}>Log In</button>
                    <button className='Button-Disabled'>Register</button>
                </div>
                <form className="Register-Form" onSubmit={handleLogin}>
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
                                style={isFirstPasswordValid ? { borderBottom: '1px solid green' } : {}}
                            />
                        </div>
                        <div className="Confirm-Password">
                            <img src={Lock} />
                            <input
                                type="password"
                                name="confirm-password"
                                placeholder="Confirm password"
                                required={true}
                                minLength={4}
                                onChange={handleSecondPassword}
                                style={{ borderBottom: color }}
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