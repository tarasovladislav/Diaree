import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Utils/auth';
import Home from './new/Home';
import Authenticate from './new/Authenticate/Authenticate';

const RedirectToAuthenticate = () => <Navigate to="/authenticate" />;

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
                    {/* <Route path='*' element={<ErrorPage />} /> */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
