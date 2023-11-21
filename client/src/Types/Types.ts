import React from "react"

export type DiaryType = {
    _id: string,
    title: string,
    text: string,
    date: string,
    imageUrl?: string,
    tags: TagType[]
}

export type TagType = {
    title: string
}

export type UserType = {
    user_id: string,
    username: string,
    diary_entries: DiaryType[]
}

export type SearchBarProps = {
    onSearch: (query: string) => void;
}

export type SearchResult = {
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




