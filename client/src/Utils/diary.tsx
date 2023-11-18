import { createContext, useContext, useEffect, useState } from 'react';
import { getAllDiaryEntries } from '../ApiService';
import { DiaryContextType } from '../Types/Types';
import { useAuth } from './auth';

const defaultDiaryContext: DiaryContextType = {
    diaries: [],
    setDiaries: () => { },
    selectedDate: undefined,
    setSelectedDate: () => {}
};

const DiaryContext = createContext(defaultDiaryContext);

export const DiaryProvider = ({ children }: { children: React.ReactNode }) => {
    const { authenticated } = useAuth();
    const [diaries, setDiaries] = useState([]);
    const [selectedDate, setSelectedDate] = useState(undefined);

    useEffect(() => {
        (async() => {
            if (!authenticated) return;
            const response = await getAllDiaryEntries();
            setDiaries(response);
        })();
    })

    return (
        <DiaryContext.Provider value={{ diaries, setDiaries, selectedDate, setSelectedDate }} >
            {children}
        </DiaryContext.Provider>
    );
};

export const useDiary = () => {
    return useContext(DiaryContext);
}