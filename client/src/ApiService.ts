//TODO: Move to .env
const BASE_URL = "http://localhost:3000";
// const BASE_URL = process.env.REACT_APP_BASE_URL;
import { Diary, Tag } from './Types/Types.js'


const checkResponse = (response: Response): void => {
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
};

const getAllDiaryEntries = async (): Promise<[Diary]> => {
    try {
        const response = await fetch(`${BASE_URL}/diary/entries`);
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getRecentDiaryEntries = async (): Promise<[Diary]> => {
    try {
        const response = await fetch(`${BASE_URL}/diary/entries/recent`);
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getDiaryEntryById = async (_id: String): Promise<Diary> => {
    try {
        const response = await fetch(`${BASE_URL}/diary/entries/${_id}`);
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteDiaryEntry = async (_id: String): Promise<{ message: string }> => {
    try {
        const response = await fetch(`${BASE_URL}/diary/entries/${_id}`, {
            method: 'DELETE'
        });
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const postDiaryEntry = async (data: Diary):Promise<Diary> => { //TODO: FIX any
    try {
        const response = await fetch(`${BASE_URL}/diary/entries`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//TODO: Do we need this function?
const putDiaryEntry = async (data: Diary):Promise<Diary> => { //TODO: Fix any
    try {
        const response = await fetch(`${BASE_URL}/diary/entries/${data._id}`, { //TODO: Is this right?
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getAllTags = async ():Promise<[Tag]> => {
    try {
        const response = await fetch(`${BASE_URL}/diary/tags`);
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const postTag = async (name: String):Promise<Tag> => {
    console.log(name);
    try {
        const response = await fetch(`${BASE_URL}/diary/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteTag = async (_id: String):Promise<{ message: string }> => {
    try {
        const response = await fetch(`${BASE_URL}/diary/tags/${_id}`, {
            method: "DELETE",
        });
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export {
    getAllDiaryEntries,
    getRecentDiaryEntries,
    getDiaryEntryById,
    postDiaryEntry,
    deleteDiaryEntry,
    putDiaryEntry,
    getAllTags,
    postTag,
    deleteTag
}