import React from "react"

export type DiaryType = {
    _id:string,
    title: string,
    text?: string,
    date: string,
    createdAt: Date,
    imageUrl?: string,
    tags: TagType[]
}

export type TagType = {
    name: string
}

export type AuthContextType = {
    authenticated: boolean;
    user: any; //User type (dont know how it looks) TODO: add
    setUser: React.Dispatch<React.SetStateAction<any>>;
    login: () => Promise<void>;
    logout: () => void;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export type SearchBarProps ={
    onSearch: (query: string) => void;
}

export type SearchResult =  {
    title: string;
}

export type SearchResultsProps = {
    results: SearchResult[];
}

export type EventData = {
    title: string,
    text: string,
    date: string,
    imageUrl: string,
}

export type DiaryContextType = {
    diaries: DiaryType[],
    setDiaries: React.Dispatch<React.SetStateAction<any>>,
    selectedDate: undefined,
    setSelectedDate: React.Dispatch<React.SetStateAction<any>>
}

export type SingleEntryContextType = {
    entry: DiaryType
}
