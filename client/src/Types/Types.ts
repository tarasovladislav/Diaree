export type DiaryType = {
    _id:string,
    title: string,
    text?: string,
    date: Date,
    createdAt: Date,
    imageUrl?: string,
    tags: TagType[]
}



export type TagType = {
    name: string
}


