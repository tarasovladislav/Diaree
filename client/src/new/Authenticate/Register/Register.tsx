import './Register.css';
import User from '../../../assets/user.png';
import Lock from '../../../assets/lock.png';
import { postLogin } from '../../../ApiService';

type RegisterType = {
    isOnLogin: boolean,
    setIsOnLogin: () => { }
}

const Register: React.FC<RegisterType> = ({ isOnLogin, setIsOnLogin }: RegisterType) => {
    const handleLogin = async (e: any) => {
        e.preventDefault();
        const username = e.currentTarget.username.value;
        const password = e.currentTarget.password.value;

        const response = await postLogin(username, password);

        if (response.token) return localStorage.setItem('token', response.token);
        alert(response.error);
    }


    return (
        <div className="Register" id={isOnLogin ? 'fadeIn' : 'fadeOut' }>
            <div className="Register-Main">
                <div className="Switch">
                    <button onClick={() => { setIsOnLogin(true) }}>Log In</button>
                    <button className='Button-Disabled'>Register</button>
                </div>
                <form className="Register-Form" onSubmit={handleLogin}>
                    <div className="Title">
                        <h2>Welcome toas <span>Dιαɾҽҽ</span>.</h2>
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

export default Register