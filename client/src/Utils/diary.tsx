import { createContext, useContext, useEffect, useState } from 'react';
import { getAllDiaryEntries } from '../ApiService';
import { DiaryContextType } from '../Types/Types';
import { useAuth } from './auth';

const defaultDiaryContext: DiaryContextType = {
    diaries: [],
    setDiaries: () => { },
    selectedDate: undefined,
    setSelectedDate: () => { },
    isAddNewEvent: Boolean,
    setIsAddNewEvent: () => { },
    isShowDayEvents: Boolean,
    setIsShowDayEvents: () => { },
};

const DiaryContext = createContext(defaultDiaryContext);

export const DiaryProvider = ({ children }: { children: React.ReactNode }) => {
    const { authenticated } = useAuth();
    const [diaries, setDiaries] = useState([]);
    const [isAddNewEvent, setIsAddNewEvent] = useState(false);
    const [isShowDayEvents, setIsShowDayEvents] = useState(false);
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [diariesByDate, setDiariesByDate] = useState({})
    const [tagList, setTagList] = useState([])
    const [selectedTag, setSelectedTag] = useState('')

    useEffect(() => {
        (async () => {
            if (!authenticated) return
            const response = await getAllDiaryEntries();
            setDiaries(response);
        })();
    }, [authenticated])


    useEffect(() => {
        const newEventsMap = {};
        diaries.forEach(event => {
            if (!newEventsMap[event.date]) {
                newEventsMap[event.date] = [];
            }
            newEventsMap[event.date].push(event);
        });
        setDiariesByDate(newEventsMap);
    }, [diaries]);
    useEffect(() => {
        const transformTags = (data) => {
            const tagCounts = {};
            data.forEach(item => {
                item.tags.forEach(tag => {
                    if (tag && tag.title) { // Check if tag and tag.title exist
                        if (tag.title in tagCounts) {
                            tagCounts[tag.title]++;
                        } else {
                            tagCounts[tag.title] = 1;
                        }
                    }
                });

            });
            return Object.entries(tagCounts).map(([title, count]) => ({ title, count }));
        };
        const transformedTags = transformTags(diaries).sort((a, b) => b.count - a.count);
        setTagList(transformedTags);
        console.log(tagList)
    }, [diaries])

    return (
        <DiaryContext.Provider value={{ diaries, setDiaries, selectedDate, setSelectedDate, isAddNewEvent, setIsAddNewEvent, isShowDayEvents, setIsShowDayEvents, diariesByDate, setDiariesByDate, tagList, selectedTag, setSelectedTag }} >
            {children}
        </DiaryContext.Provider>
    );
};

export const useDiary = () => {
    return useContext(DiaryContext);
}