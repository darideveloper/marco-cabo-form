import { fetchData } from "./api";

const getTransferTypes = async () => {
  const data = await fetchData("/transfer-types", "GET", null);
  return data.results;
};

export { getTransferTypes };