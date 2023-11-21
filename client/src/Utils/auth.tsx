import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, getValidateToken } from '../ApiService';
import Loading from '../Components/Loading/Loading';



type AuthContextType = {
    authenticated: boolean;
    user: any; //User type (dont know how it looks) TODO: add
    setUser: React.Dispatch<React.SetStateAction<any>>;
    login: () => Promise<void>;
    logout: () => void;
    token: string | null;
    setToken: (token: string | null) => void;
}


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
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
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