import axios from './axios';

export const fetchWastaniWaUfaulu = async ({ queryKey }) => {
    const [_, year, month, councils] = queryKey;
    const response = await axios.get(`api/mtwara/report/school/council/subtask-average/${year}`, {
      params: {
        wilaya: councils,
        mwezi: month,
      },
    });
    return response.data;
  };
//   http://139.162.12.176:5050/api/mtwara/report/school/council/subtask-average/2022?wilaya=MTWARA%20MC&mwezi=Novemba


export const fetchUfauluWaShule = async ({ queryKey }) => {
    const [_, year, month, councils] = queryKey;
    const response = await axios.get(`api/mtwara/report/school/council/reading/ranking/${year}`, {
      params: {
        wilaya: councils,
        mwezi: month,
      },
    });
    return response.data;
  };
//   http://139.162.12.176:5050/api/mtwara/report/school/council/reading/ranking/2022?wilaya=MTWARA%20MC&mwezi=Novemba


export const fetchUmahiriWaKuandika = async ({ queryKey }) => {
    const [_, year, month, councils] = queryKey;
    const response = await axios.get(`api/mtwara/report/school/council/writing/ranking/${year}`, {
      params: {
        wilaya: councils,
        mwezi: month,
      },
    });
    return response.data;
  };
//   http://139.162.12.176:5050/api/mtwara/report/school/council/writing/ranking/2022?wilaya=MTWARA%20MC&mwezi=Novemba

export const fetchUmahiriWaKuhesabu = async ({ queryKey }) => {
    const [_, year, month, councils] = queryKey;
    const response = await axios.get(`api/mtwara/report/school/council/math/ranking/${year}`, {
      params: {
        wilaya: councils,
        mwezi: month,
      },
    });
    return response.data;
  };
// http://139.162.12.176:5050/api/mtwara/report/school/council/math/ranking/2022?wilaya=MTWARA%20MC&mwezi=Novemba

export const fetchMaelezoYaShule = async ({ queryKey }) => {
    const [_, year, month, councils] = queryKey;
    const response = await axios.get(`api/mtwara/report/school/council/average/${year}`, {
      params: {
        wilaya: councils,
        mwezi: month,
      },
    });
    return response.data;
  };
//   http://139.162.12.176:5050/api/mtwara/report/school/council/average/2022?wilaya=MTWARA%20MC&mwezi=Novemba
