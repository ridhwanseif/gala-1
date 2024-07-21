import axios from './axios';


export const fetchYear = async () => {
  const response = await axios.get('api/mtwara/report/year-list/');
  return response.data;
};

export const fetchMonth = async () => {
  const response = await axios.get('api/mtwara/report/month-list/');
  return response.data;
};

export const fetchCouncil = async () => {
  const response = await axios.get('api/mtwara/schools/councils/');
  return response.data;
};

export const fetchWard = async ({queryKey}) => {
  const [_, council] = queryKey
  const response = await axios.get(`/api/mtwara/schools/wards/?council=${encodeURIComponent(council)}`);
  return response.data;
};

// http://139.162.12.176:5050/api/mtwara/schools/wards/?council=TANDAHIMBA%20DC

// export const fetchAboutById = async (aboutId) => {
//   try {
//     const response = await axios.get(`about/rud/${aboutId}/`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }


// export const createAbout = async (about) => {
//   const response = await axios.post('about/create', about);
//   return response.data;
// };

// export const updateAbout = async (aboutId, about) => {
//   const response = await axios.put(`about/rud/${aboutId}/`, about);
//   return response.data;
// };

// export const deleteTask = async (taskId) => {
//   await axios.delete(`${BASE_URL}/${taskId}`);
// };