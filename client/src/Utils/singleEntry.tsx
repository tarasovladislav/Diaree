import { createContext, useContext, useState } from 'react';
import { SingleEntryContextType } from '../Types/Types';

const defaultEntryContext: SingleEntryContextType = {
    setIsShowSingleEvent: () => { },
    selectedEntry: undefined,
    setSelectedEntry: () => { },
};

const SingleEntryContext = createContext(defaultEntryContext);



export const SingleEntryProvider = ({ children }: { children: React.ReactNode }) => {
    const [isShowSingleEvent, setIsShowSingleEvent] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(undefined);

    return (
        <SingleEntryContext.Provider value={{ isShowSingleEvent, setIsShowSingleEvent, setSelectedEntry, selectedEntry }} >
            {children}
        </SingleEntryContext.Provider>
    );
};

export const useSingleEntry = () => {
    return useContext(SingleEntryContext);
}