import { useEffect } from "react";
import MultiStepForm from "./MultiStepForm";
import { fetchData } from "./api/api";

function App() {

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await fetchData("/vehicles", "GET", null);
      console.log(data);
    };
    fetchVehicles();
  }, []);
  return (
    <>
      <MultiStepForm />
    </>
  );
}

export default App;
