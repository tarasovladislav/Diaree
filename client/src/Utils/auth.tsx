import { createContext, useContext, useEffect, useState } from 'react';
import { getUser } from '../ApiService';
import { AuthContextType } from '../Types/Types';

const defaultAuthContext: AuthContextType = {
    authenticated: false,
    user: { name: '', username: '' },
    setUser: () => { },
    login: async () => { },
    logout: () => { },
    token: null,
    setToken: () => { },
};

const mockUser = {
    name: 'Bob',
    username: 'bob_the_destroyer'
}

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(mockUser);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        token ? login() : setLoading(false);
    }, [token]);
    useEffect(() => {

    }, [token])
    const login = async () => {
        if (!token) return; //Tries to log in to fast before setting token TODO: FIX!!!
        setAuthenticated(true);
        setLoading(false);
        const response = await getUser(token);
        console.log(response)
        setUser(response);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
        setUser(mockUser);
        setToken(null);
    }

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <AuthContext.Provider value={{ authenticated, user, setUser, login, logout, token, setToken }} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}