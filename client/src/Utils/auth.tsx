import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { getUser, getValidateToken } from '../ApiService';
import Loading from '../new/Loading/Loading';
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

    const login = async () => {
        if (token) {
            const validToken = await getValidateToken(token);
            if (validToken.status === 401) {
                localStorage.removeItem('token'); //Remove corrupted token
                window.location.reload();
            } else {
                setAuthenticated(true);
                const response = await getUser(token);
                setUser(response);
                setLoading(false);
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
        setUser(mockUser);
        setToken(null);
    }

    if (loading) {
        return (
            <Loading />
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