//TODO: Move to .env
const BASE_URL = "http://localhost:3000";
// const BASE_URL = process.env.REACT_APP_BASE_URL;
import { DiaryType, TagType } from './Types/Types.js'
import { useAuth } from './Utils/auth.js';

const checkResponse = (response: Response): void => {
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
};

// const getAllDiaryEntries = async (): Promise<[]> => {//TODO []type
const getAllDiaryEntries = async (token: String): Promise<[]> => { 
    try {
        const response = await fetch(`${BASE_URL}/diary/entries`, {
            method: 'GET',
            headers: {
                "Authorization": `${token}`
            }
        });
        checkResponse(response);        
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// const getRecentDiaryEntries = async (): Promise<[DiaryType]> => {
//     try {
//         const response = await fetch(`${BASE_URL}/diary/entries/recent`);
//         checkResponse(response);
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

const getDiaryEntryById = async (_id: String): Promise<DiaryType> => {
    try {
        const response = await fetch(`${BASE_URL}/diary/entries/${_id}`);
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteDiaryEntry = async (_id: String, token: String): Promise<{ message: string }> => {
    try {
        const response = await fetch(`${BASE_URL}/diary/entries/${_id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `${token}`
            }
        });
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const postDiaryEntry = async (data: DiaryType, token: String): Promise<DiaryType> => { //TODO: FIX any
    try {
        const response = await fetch(`${BASE_URL}/diary/entries`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
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
const putDiaryEntry = async (data: DiaryType): Promise<DiaryType> => { //TODO: Fix any
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

const getAllTags = async (): Promise<[TagType]> => {
    try {
        const response = await fetch(`${BASE_URL}/diary/tags`);
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const postTag = async (title: String): Promise<TagType> => {
    console.log(title);
    try {
        const response = await fetch(`${BASE_URL}/diary/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        });
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteTag = async (_id: String): Promise<{ message: string }> => {
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

const getUser = async (token: String) => {
    try {
        const response = await fetch(`${BASE_URL}/user/account`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        });
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const postLogin = async (username: String, password: String) => {
    try {
        const response = await fetch(`${BASE_URL}/user/account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        //checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const postRegister = async (username: String, password: String) => {
    try {
        const response = await fetch(`${BASE_URL}/user/account/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        //checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getValidateToken = async (token: String) => {
    try {
        const response = await fetch(`${BASE_URL}/user/account/validate`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getAllDiaryEntriesByDate = async (date: string) => {
    try {
        const response = await fetch(`${BASE_URL}/diary/entries/date/${date}`);
        checkResponse(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const uploadImage = async (data: any) => {
    try {
        const response = await fetch(`${BASE_URL}/diary/image/upload`, {
            method: 'POST',
            body: data
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
    uploadImage,
    getRecentDiaryEntries,
    getDiaryEntryById,
    postDiaryEntry,
    deleteDiaryEntry,
    putDiaryEntry,
    getAllTags,
    postTag,
    deleteTag,
    getUser,
    postLogin,
    postRegister,
    getValidateToken,
    getAllDiaryEntriesByDate
}