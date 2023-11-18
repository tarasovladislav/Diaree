import { useState } from 'react';
import 
import Login from './Login/Login';
import Register from './Register/Register';

const Authenticate = () => {
    const [isOnLogin, setIsOnLogin] = useState(true);

    return isOnLogin ? <Login setIsOnLogin={setIsOnLogin} /> : <Register setIsOnLogin={setIsOnLogin} />
}

export default Authenticate