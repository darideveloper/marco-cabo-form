import { useEffect } from "react";
import MultiStepForm from "./MultiStepForm";
import { fetchData } from "./api/api";

function App() {

  useEffect(() => {
    const testVIPCode = async () => {
      try {
        console.log('Testing VIP code API...');
        const response = await fetchData("/validate-vip-code", "POST", { 
          "vip_code": "loscabos25" 
        });
        console.log('VIP API Response:', response);
      } catch (error) {
        console.error('VIP API Error:', error);
      }
    };

    testVIPCode();
  }, []);

  return (
    <>
      <MultiStepForm />
    </>
  );
}

export default App;
