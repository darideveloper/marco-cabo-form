import { fetchData } from "./api";

export const checkVIPCode = async (code) => {
  const response = await fetchData("/validate-vip-code/", "POST", { "vip_code": code });
  return response;
};

export default checkVIPCode;