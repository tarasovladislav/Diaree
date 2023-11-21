import { createContext, useContext, useEffect, useState } from 'react';
import { getAllDiaryEntries, deleteDiaryEntry } from '../ApiService';
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
    const { authenticated, token } = useAuth();
    const [diaries, setDiaries] = useState([]);
    const [isAddNewEvent, setIsAddNewEvent] = useState(false);
    const [isShowDayEvents, setIsShowDayEvents] = useState(false);
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [diariesByDate, setDiariesByDate] = useState({})
    const [tagList, setTagList] = useState([])
    const [selectedTag, setSelectedTag] = useState('')


    //editgin
    const [isEditEntry, setIsEditEntry] = useState(false)
    const [editableEntry, setEditableEntry] = useState(undefined)


    useEffect(() => {
        (async () => {
            if (!authenticated) return
            const response = await getAllDiaryEntries(token);
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
    }, [diaries])

    //add funciton which delete from diaries
    const deleteEntry = async (_id: string) => {
        console.log(_id, token)
        await deleteDiaryEntry(_id, token)
        setDiaries(diaries.filter(diary => {
            return diary._id !== _id
        }))
    }
    return (
        <DiaryContext.Provider value={{ diaries, setDiaries, selectedDate, setSelectedDate, isAddNewEvent, setIsAddNewEvent, isShowDayEvents, setIsShowDayEvents, diariesByDate, setDiariesByDate, tagList, selectedTag, setSelectedTag, deleteEntry, isEditEntry, setIsEditEntry, editableEntry, setEditableEntry }} >
            {children}
        </DiaryContext.Provider>
    );
};

export const useDiary = () => {
    return useContext(DiaryContext);
}