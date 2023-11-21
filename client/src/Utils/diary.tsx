import { createContext, useContext, useEffect, useState } from 'react';
import { getAllDiaryEntries, deleteDiaryEntry } from '../ApiService';

import { useAuth } from './auth';
import { DiaryType, TagType } from '../Types/Types';

type DiaryContextType = {
    diaries: DiaryType[];
    setDiaries: (diaries: DiaryType[]) => void;
    isAddNewEvent: boolean;
    setIsAddNewEvent: (value: boolean) => void;
    isShowDayEvents: boolean;
    setIsShowDayEvents: (value: boolean) => void;
    selectedDate: string | undefined;
    setSelectedDate: (date: string | undefined) => void;
    isEditEntry: boolean;
    setIsEditEntry: (value: boolean) => void;
    tagList: TagType[];
    setTagList: (tags: TagType[]) => void;
    selectedTag: string | undefined;
    setSelectedTag: (tag: string | undefined) => void;
    diariesByDate: Record<string, DiaryType[]>;
    setDiariesByDate: (diariesByDate: Record<string, DiaryType[]>) => void;
    editableEntry: DiaryType | undefined;
    setEditableEntry: (diary: DiaryType | undefined) => void;
    deleteEntry: (id: string) => Promise<void>;
}



const defaultDiaryContext: DiaryContextType = {
    diaries: [],
    setDiaries: () => { },
    isAddNewEvent: false,
    setIsAddNewEvent: () => { },
    isShowDayEvents: false,
    setIsShowDayEvents: () => { },
    selectedDate: undefined,
    setSelectedDate: () => { },
    isEditEntry: false,
    setIsEditEntry: () => { },
    tagList: [],
    setTagList: () => { },
    selectedTag: undefined,
    setSelectedTag: () => { },
    diariesByDate: {},
    setDiariesByDate: () => { },
    editableEntry: undefined,
    setEditableEntry: () => { },
    deleteEntry: function (id: string): Promise<void> {
        throw new Error('Function not implemented.');
    }
    //TODO no idea how to do this
};

const DiaryContext = createContext(defaultDiaryContext);

export const DiaryProvider = ({ children }: { children: React.ReactNode }) => {
    const { authenticated, token } = useAuth();

    const [isAddNewEvent, setIsAddNewEvent] = useState(false);
    const [isShowDayEvents, setIsShowDayEvents] = useState(false);
    const [isEditEntry, setIsEditEntry] = useState(false)

    const [diaries, setDiaries] = useState<DiaryType[]>([]);
    const [tagList, setTagList] = useState<TagType[]>([])

    const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined)
    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

    const [diariesByDate, setDiariesByDate] = useState<Record<string, DiaryType[]>>({});

    const [editableEntry, setEditableEntry] = useState<DiaryType | undefined>(undefined)






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
    const deleteEntry = async (_id: string): Promise<void> => {
        console.log(_id, token)
        await deleteDiaryEntry(_id, token)
        setDiaries(diaries.filter(diary => {
            return diary._id !== _id
        }))
    }
    return (
        <DiaryContext.Provider value={{ diaries, setDiaries, selectedDate, setSelectedDate, isAddNewEvent, setIsAddNewEvent, isShowDayEvents, setIsShowDayEvents, diariesByDate, setDiariesByDate, tagList, setTagList, selectedTag, setSelectedTag, deleteEntry, isEditEntry, setIsEditEntry, editableEntry, setEditableEntry }} >
            {children}
        </DiaryContext.Provider>
    );
};

export const useDiary = () => {
    return useContext(DiaryContext);
}