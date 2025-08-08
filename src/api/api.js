const apiBaseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const fetchData = async (url, method, body=null) => {
  console.log(apiBaseUrl + url);
  const response = await fetch(apiBaseUrl + url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + apiKey,
    },
    body: body ? JSON.stringify(body) : null
  });
  return response.json();
};

export { fetchData };