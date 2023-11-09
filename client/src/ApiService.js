const BASE_URL = "http://localhost:3000";

export const getOneDiaryEntry = (id) => fetchRequest(`/id`);
export const getRecentDiaryEntries = () => fetchRequest(`/recent`);
// export const getMoviesFromCategory = (id) => fetchRequest(`categories/${id}`);

const fetchRequest = async (url) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`);
    const res_1 = res.status <= 400 ? res : Promise.reject(res);
    return await res_1.json();
  } catch (err) {
    console.log(`${err.message} while fetching /${url}`);
  }
};
