export type DiaryType = {
    _id: string,
    title: string,
    text: string,
    date: string,
    imageUrl?: string,
    tags: TagType[] | { title: string }[]
}

export type DiaryTypeNoId = {
    title: string,
    text: string,
    date: string,
    imageUrl?: string,
    tags: TagType[] | { title: string }[]
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


