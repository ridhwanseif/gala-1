import axios from './axios';


export const fetchRipotiYaShule = async ({ queryKey }) => {
  const [_, month, year, schoolNo] = queryKey
  const response = await axios.get(`api/mtwara/report/school/report/filter/${year}?shuleNo=${schoolNo}&mwezi=${month}`);
  return response.data;
};



export const fetchReportHalimashauri = async ({ queryKey }) => {
  const [_, year, ward, schoolNo, gender, month, councils] = queryKey;
  const response = await axios.get(`/api/mtwara/report/council/report/filter/${year}`, {
    params: {
      wilaya: councils,
      shuleNo: schoolNo,
      jinsia: gender,
      mwezi: month,
    },
  });
  return response.data;
};

// export const fetchAverage = async (council,month, year) => {
//     const response = await axios.get(`api/mtwara/report/school/council/average/${year}?wilaya=${council}&mwezi=${month}`);
//     return response.data;
// };

// export const fetchMonth = async () => {
//     const response = await axios.get('api/mtwara/report/month-list/');
//     return response.data;
//   };
