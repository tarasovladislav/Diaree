import './App.css';
import { useEffect } from 'react';
import { useAuth } from './Utils/auth';
import Home from './new/Home';

const App = () => {
    const { authenticated, login } = useAuth();
    useEffect(() => {
        (async () => {
            if (authenticated) await login();
        })();
    }, [authenticated]);

    return (
        <>
            <div className="App">
              <Home />
            </div>
        </>
    );
}

export default App;