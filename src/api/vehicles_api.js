import { fetchData } from "./api";

const getVehicles = async () => {
  const data = await fetchData("/vehicles", "GET", null);
  return data.results;
};

export { getVehicles };