import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './Utils/auth';
import Home from './new/Home';
import Authenticate from './new/Authenticate/Authenticate';

const App = () => {
    const { authenticated, login } = useAuth();

    useEffect(() => {
        (async () => {
            if (authenticated) await login();
        })();
    }, [authenticated]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path='/authenticate' element={<Authenticate />} />
                    {/* <Route path='*' element={<ErrorPage />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;