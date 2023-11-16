type Diary = {
    title: string,
    text?: string,
    // date
    createdAt: Date,
    imageUrl?: string,
    tags: [Tag]
}



type Tag = {
    name: string
}