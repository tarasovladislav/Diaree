import { useState } from 'react';
import './Authenticate.css';
import Login from './Login/Login';
import Register from './Register/Register';

const Authenticate = () => {
    const [isOnLogin, setIsOnLogin] = useState(true);

    return (
        <div className='Authenticate'>
            <Login isOnLogin={isOnLogin} setIsOnLogin={() => setIsOnLogin(!isOnLogin)} />
            <Register isOnLogin={!isOnLogin} setIsOnLogin={() => setIsOnLogin(!isOnLogin)} />
        </div>
    );
}

export default Authenticate