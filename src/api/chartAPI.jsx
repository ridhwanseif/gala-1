import axios from './axios';


export const fetchRegionSubAverage = async (month, year) => {
    try {
        const response = await axios.get(`api/mtwara/report/council/subtask/average/filter/${year}?mwezi=${month}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the data', error);
    }
};

export const fetchRanking = async (month, year) => {
    try {
        const response = await axios.get(`api/mtwara/report/council/ranking/reading/${year}?mwezi=${month}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the data', error);
    }
};

export const fetchRankingWriting = async (month, year) => {
    try {
        const response = await axios.get(`api/mtwara/report/council/ranking/writing/${year}?mwezi=${month}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the data', error);
    }
};

export const fetchMath = async (month, year) => {
    try {
        const response = await axios.get(`api/mtwara/report/council/ranking/math/${year}?mwezi=${month}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the data', error);
    }
};

// export const fetchAverage = async (council,month, year) => {
//     const response = await axios.get(`api/mtwara/report/school/council/average/${year}?wilaya=${council}&mwezi=${month}`);
//     return response.data;
// };
