import './Login.css';
import User from '../../assets/user.png';
import Lock from '../../assets/lock.png';

const Login = () => {
    const handleLogin = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className="Login">
                <form className="Login-Form" onSubmit={handleLogin}>
                    <div className="Title">
                        <h2>Welcome to <span>Diaree</span>.</h2>
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
    )
}

export default Login