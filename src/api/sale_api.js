import { fetchData } from "./api";

const createSale = async (saleData) => {
  const data = await fetchData("/sales/", "POST", saleData);
  return data;
};

export { createSale };