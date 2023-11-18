import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './Utils/auth';
import Home from './new/Home';
import Login from './new/Login/Login';

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
                    <Route path='/login' element={<Login />} />
                    {/* <Route path='*' element={<ErrorPage />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

// { path: '/', element: <Navigate to={'/dashboard'} /> },
// { path: '/dashboard', element: <Home /> },
// { path: '/login', element: <Login /> },
// { path: '/register', element: <Register /> },
// { path: '/profile', element: <Profile /> },
// { path: '*', element: <ErrorPage /> }

export default App;