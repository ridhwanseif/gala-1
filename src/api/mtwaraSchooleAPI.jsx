import axios from './axios';

// Dummy data fetching function
export const fetchMwatwaraSchools = async () => {
  const response = await axios.get('mtwara-schools/');
  if (!response.data) {
    throw new Error('Hakuna majibu ya mtandao');
  }
  return response.data;
};

export const fetchAllStudent = async () => {
  const response = await axios.get('student-count/report/');
  if (!response.data) {
    throw new Error('Hakuna majibu ya mtandao');
  }
  return response.data;
};

