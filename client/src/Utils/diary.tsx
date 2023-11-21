import { createContext, useContext, useEffect, useState } from 'react';
import { getAllDiaryEntries, deleteDiaryEntry } from '../ApiService';

import { useAuth } from './auth';
import { DiaryType, TagType } from '../Types/Types';

type DiaryContextType = {
    diaries: DiaryType[];
    setDiaries: React.Dispatch<React.SetStateAction<DiaryType[]>>;
    isAddNewEvent: boolean;
    setIsAddNewEvent: React.Dispatch<React.SetStateAction<boolean>>;
    isShowDayEvents: boolean;
    setIsShowDayEvents: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDate: string | undefined;
    setSelectedDate: React.Dispatch<React.SetStateAction<string | undefined>>;
    isEditEntry: boolean;
    setIsEditEntry: React.Dispatch<React.SetStateAction<boolean>>;
    tagList: TagType[];
    setTagList: React.Dispatch<React.SetStateAction<TagType[]>>;
    selectedTag: string | undefined;
    setSelectedTag: React.Dispatch<React.SetStateAction<string | undefined>>;
    diariesByDate: Record<string, DiaryType[]>;
    setDiariesByDate: React.Dispatch<React.SetStateAction<Record<string, DiaryType[]>>>;
    editableEntry: DiaryType | undefined;
    setEditableEntry: React.Dispatch<React.SetStateAction<DiaryType | undefined>>;
    deleteEntry?: (id: string) => Promise<void>;
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
            if (typeof token === 'string') {
                const response = await getAllDiaryEntries(token)
                setDiaries(response);
            };
        })();
    }, [authenticated])


    useEffect(() => {
        const newEventsMap: { [date: string]: DiaryType[] } = {};
        diaries.forEach(event => {
            if (!newEventsMap[event.date]) {
                newEventsMap[event.date] = [];
            }
            newEventsMap[event.date].push(event);
        });
        setDiariesByDate(newEventsMap);
    }, [diaries]);

    useEffect(() => {
        const transformTags = (data: DiaryType[]) => {
            const tagCounts: { [tag: string]: number } = {};
            data.forEach(item => {
                item.tags.forEach(tag => {
                    if (tag && tag.title) {
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

        if (typeof token === 'string') {
            await deleteDiaryEntry(_id, token)
            setDiaries(diaries.filter(diary => {
                return diary._id !== _id
            }))
        }

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