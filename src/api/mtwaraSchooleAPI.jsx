import axios from './axios';

// Dummy data fetching function
export const fetchMwatwaraSchools = async () => {
  const response = await axios.get('mtwara-schools/');
  if (!response.data) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};



// export const fetchMonth = async () => {
//     const response = await axios.get('api/mtwara/report/month-list/');
//     return response.data;
//   };

