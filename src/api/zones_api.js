
import { fetchData } from "./api";

const getZones = async () => {
  const data = await fetchData("/zones", "GET", null);
  return data.results;
};

export { getZones };