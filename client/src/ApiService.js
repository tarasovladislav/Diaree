const BASE_URL = "http://localhost:3000";

export const getOneDiaryEntry = (id) => fetchRequest(`/id`);
export const getRecentDiaryEntries = () => fetchRequest(`/recent`);
export const getAllDiaryEntries = () => fetchRequest(`/all`);

export const deleteDiaryEntry = async (_id) => {
  try {
    const response = await fetch(`${BASE_URL}/delete/${_id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding diary entry:", error);
    throw error;
  }
};

export const addDiaryEntry = async (newEntryData) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntryData),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding diary entry:", error);
    throw error;
  }
};

const fetchRequest = async (url) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
