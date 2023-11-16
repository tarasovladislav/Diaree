export type Diary = {
    _id:string,
    title: string,
    text?: string,
    // date
    createdAt: Date,
    imageUrl?: string,
    tags: [Tag]
}



export type Tag = {
    name: string
}


