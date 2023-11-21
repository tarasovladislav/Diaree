import { createContext, useContext, useState } from 'react';
import { DiaryType } from '../Types/Types';

type SingleEntryContextType = {
    isShowSingleEvent: boolean;
    setIsShowSingleEvent: React.Dispatch<React.SetStateAction<boolean>>;
    selectedEntry: DiaryType | undefined;
    setSelectedEntry: React.Dispatch<React.SetStateAction<DiaryType | undefined>>;
}

const defaultEntryContext: SingleEntryContextType = {
    isShowSingleEvent: false,
    setIsShowSingleEvent: () => { },
    selectedEntry: undefined,
    setSelectedEntry: () => { },
};

const SingleEntryContext = createContext(defaultEntryContext);

export const SingleEntryProvider = ({ children }: { children: React.ReactNode }) => {
    const [isShowSingleEvent, setIsShowSingleEvent] = useState<boolean>(false);
    const [selectedEntry, setSelectedEntry] = useState<DiaryType | undefined>(undefined);

    return (
        <SingleEntryContext.Provider value={{ isShowSingleEvent, setIsShowSingleEvent, setSelectedEntry, selectedEntry }} >
            {children}
        </SingleEntryContext.Provider>
    );
};

export const useSingleEntry = () => {
    return useContext(SingleEntryContext);
}