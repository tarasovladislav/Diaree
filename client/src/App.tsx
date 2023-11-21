import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Utils/auth';
import Authenticate from './Components/Authenticate/Authenticate';
import Error from './Components/Error/Error';
import Home from './Components/Home';

const App = () => {
    const { authenticated, login, logout } = useAuth();

    useEffect(() => {
        (async () => {
            if (!authenticated) await login();
        })();
    }, [authenticated, login]);

    window.addEventListener('storage', (event) => {
        if (event.key === 'token' && !localStorage.getItem('token')) logout();
    });

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={authenticated ? <Navigate to="/home" /> : <Navigate to="/authenticate" />}
                    />
                    <Route
                        path="/home"
                        element={authenticated ? <Home /> : <Navigate to="/authenticate" />}
                    />
                    <Route
                        path="/authenticate"
                        element={authenticated ? <Navigate to="/home" /> : <Authenticate />}
                    />
                    <Route path='*' element={<Error />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
