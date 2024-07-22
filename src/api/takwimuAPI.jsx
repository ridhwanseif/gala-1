import axios from './axios';

export const fetchWastaniWaUfaulu = async ({ queryKey }) => {
  const [_, year, month, council] = queryKey;

  const response = await axios.get(`/api/mtwara/report/school/council/subtask-average/${year}?wilaya=${council}&mwezi=${month}`);
  return response.data;
};


export const fetchUfauluWaKusoma = async ({ queryKey }) => {
  const [_, year, month, council] = queryKey;
  const response = await axios.get(`api/mtwara/report/school/council/reading/ranking/${year}?wilaya=${council}&mwezi=${month}`);
  return response.data;
};


export const fetchUmahiriWaKuandika = async ({ queryKey }) => {
  const [_, year, month, council] = queryKey;
  const response = await axios.get(`api/mtwara/report/school/council/writing/ranking/${year}?wilaya=${council}&mwezi=${month}`);
  return response.data;
};


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
