import axios from './axios';


export const fetchStudent = async () => {
  const response = await axios.get('student-count/report/');
  return response.data;
};
