import axios from './axios';


export const fetchStudent = async () => {
  const response = await axios.get('student-count/report/');
  return response.data;
};

// export const fetchGender = async () => {
//     const response = await axios.get('api/mtwara/report/month-list/');
//     return response.data;
//   };
