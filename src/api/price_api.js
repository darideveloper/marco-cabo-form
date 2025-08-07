import { fetchData } from "./api";


const getPrices = async (location, vehicle, transfer_type) => {
  const data = await fetchData(`/pricing/?location=${location}&vehicle=${vehicle}&transfer_type=${transfer_type}`   , "GET", null);
  return data.results;
};

export { getPrices };