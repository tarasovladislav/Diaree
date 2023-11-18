import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Utils/auth';
import Authenticate from './new/Authenticate/Authenticate';
import Error from './new/Error/Error';

const App = () => {
    const { authenticated, login } = useAuth();

    useEffect(() => {
        (async () => {
            if (!authenticated) await login();
        })();
    }, [authenticated, login]);

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
                        element={authenticated ? <Navigate to="/home" /> : <Navigate to="/authenticate" />}
                    />
                    <Route path="/authenticate" element={<Authenticate />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
