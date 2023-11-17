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