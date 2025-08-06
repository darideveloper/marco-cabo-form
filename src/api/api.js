const apiBaseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const fetchData = async (url, method, body) => {
  const response = await fetch(apiBaseUrl + url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + apiKey,
    },
  });
  return response.json();
};

export { fetchData };