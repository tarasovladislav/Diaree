import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, getValidateToken } from '../ApiService';
import Loading from '../Components/Loading/Loading';
import { UserType } from '../Types/Types';


type AuthContextType = {
    authenticated: boolean;
    setAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    loading?: boolean;
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    login: () => Promise<void>;
    logout: () => void;
}


const defaultAuthContext: AuthContextType = {
    authenticated: false,
    setAuthenticated: () => { },
    user: {
        user_id: '123',
        username: 'bob_the_destroyer',
        diary_entries: []
    },
    setUser: () => { },
    token: null,
    setToken: () => { },
    loading: true,
    setLoading: () => { },
    login: async () => { },
    logout: () => { },
};


const mockUser = {
    user_id: '123',
    username: 'bob_the_destroyer',
    diary_entries: []
}

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserType>(mockUser);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        token ? login() : setLoading(false);
    }, [token]);

    const login = async (): Promise<void> => {
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

    const logout = (): void => {
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