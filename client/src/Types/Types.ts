export type DiaryType = {
    _id: string,
    title: string,
    text: string,
    date: string,
    imageUrl?: string,
    tags: TagType[]
}

export type TagType = {
    title: string,
    count: number
}

export type UserType = {
    user_id: string,
    username: string,
    diary_entries: DiaryType[]
}


