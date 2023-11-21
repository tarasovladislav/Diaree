//TODO: Move to .env
const BASE_URL = "http://localhost:3000";
// const BASE_URL = process.env.REACT_APP_BASE_URL;
import { DiaryType, TagType } from './Types/Types.js'

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
const putDiaryEntry = async (data: DiaryType, token: String): Promise<DiaryType> => { //TODO: Fix any
    try {
        const response = await fetch(`${BASE_URL}/diary/entries/${data._id}`, { //TODO: Is this right?
            method: 'PUT',
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
    postDiaryEntry,
    deleteDiaryEntry,
    putDiaryEntry,
    getUser,
    postLogin,
    postRegister,
    getValidateToken,
    getAllDiaryEntriesByDate
}