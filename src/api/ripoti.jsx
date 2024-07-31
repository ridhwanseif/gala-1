import axios from './axios';


export const fetchRipotiYaShule = async ({ queryKey }) => {
  const [_, month, year, schoolNo] = queryKey
  const response = await axios.get(`api/mtwara/report/school/report/filter/${year}?shuleNo=${schoolNo}&mwezi=${month}`);
  return response.data;
};

export const fetchRipotiYaShulesuma = async ({ queryKey }) => {
  const [_, month, year, schoolNo] = queryKey;

  try {
    const response = await axios.get(
      `api/mtwara/report/school/report/filter/${year}?shuleNo=${schoolNo}&mwezi=${month}`
    );

    const formattedData = response.data.map((row, index) => ({
      SNo: index + 1,
      "Jina la Mwanafunzi": row.jina,
      Jinsia: row.jinsia,
      "Sauti Za Herufi": row.szh,
      "Ubora wa Ufaulu (SZH)": getComment40(row.szh),
      "Maneno Ya Kubuni": row.myk,
      "Ubora wa Ufaulu (MYK)": getComment40(row.myk),
      "Kusoma Kwa Ufahamu": row.kku,
      "Ubora wa Ufaulu (KKU)": getComment20(row.kku),
      "Jumla (Kusoma)": row.kusT,
      "Ubora wa Ufaulu (Kusoma)": getComment100(row.kusT),
      Imla: row.imla,
      "Ubora wa Ufaulu (Imla)": getComment40(row.imla),
      "Kupigia Mistari Maneno Yaliyochanganyiwa": row.hzm,
      "Ubora wa Ufaulu (KMMY)": getComment20(row.hzm),
      "Alama za Uandushi": row.uaf,
      "Ubora wa Ufaulu (AZU)": getComment16(row.uaf),
      "Kutambua Majina Ya Vitu": row.picha,
      "Ubora wa Ufaulu (Vitu)": getComment24(row.picha),
      "Jumla (Kuandika)": row.kuaT,
      "Ubora wa Ufaulu (Kuandika)": getComment100(row.kuaT),
      "Utambuzi wa Nambari": row.uta,
      "Ubora wa Ufaulu (UTA)": getComment20(row.uta),
      "Kujumlisha Ngazi ya I": row.jum1,
      "Ubora wa Ufaulu (JI)": getComment8(row.jum1),
      "Kujumlisha Ngazi ya II": row.jum2,
      "Ubora wa Ufaulu (JII)": getComment12(row.jum2),
      "Kutoa Ngazi ya I": row.kut1,
      "Ubora wa Ufaulu (KI)": getComment8(row.kut1),
      "Kutoa Ngazi ya II": row.kut2,
      "Ubora wa Ufaulu (KII)": getComment12(row.kut2),
      "Nambari Inayokosekana": row.nz,
      "Ubora wa Ufaulu (NZ)": getComment24(row.nz),
      Mafumbo: row.maf,
      "Ubora wa Ufaulu (MAF)": getComment16(row.maf),
      "Jumla (Kuhesabu)": row.hesT,
      "Ubora wa Ufaulu (Kuhesabu)": getComment(row.hesT),
      "Jumla ya Alama": row.jumla,
      "Ubora wa Ufaulu (Hesabu)": getComment(row.jumla),
      Wastani: progressTowardsThreshold(row.jumla),
    }));

    setexcelExport(formattedData);
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error; // Optionally rethrow the error if you want to handle it upstream
  }
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

export const fetchRipotiYaMkoa = async ({ queryKey }) => {
  const [_, month, year] = queryKey;
  const response = await axios.get(`/student-count/report/council/filter/${month}/${year}`);
  return response.data;

}

export const fetchBoysPassed = async ({ queryKey }) => {
  const [_, month, year] = queryKey;
  const boysPassed = await axios.get(`/api/mtwara/report/council/pass/stats/Mvulana/${month}/${year}`)
  return boysPassed.data
}
export const fetchGirlsPassed = async ({ queryKey }) => {
  const [_, month, year] = queryKey;
  const girlsPassed = await axios.get(`/api/mtwara/report/council/pass/stats/Msichana/${month}/${year}`)
  return girlsPassed.data
}
export const fetchAverage = async ({ queryKey }) => {
  const [_, month, year] = queryKey;
  const avg = await axios.get(`api/mtwara/report/coucil/average/filter/${year}?mwezi=${month}`)
  // setAverage(avg.data);
  return avg.data

}