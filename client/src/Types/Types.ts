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


