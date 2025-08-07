import { RadioGroup, RadioGroupItem } from "../RadioGroup";
import Label from "../Label";
import { getTransferTypes } from "../../api/transfer_type_api";
import { useEffect, useState } from "react";

const Step2 = ({ formData, updateFormData, loadingStates, setLoading }) => {
  const [transferTypes, setTransferTypes] = useState([]);
  
  useEffect(() => {
    const fetchTransferTypes = async () => {
      setLoading("transferTypes", true);
      try {
        const transferTypes = await getTransferTypes();
        setTransferTypes(transferTypes);
      } catch (error) {
        console.error("Error fetching transfer types:", error);
      } finally {
        setLoading("transferTypes", false);
      }
    };
    fetchTransferTypes();
  }, [setLoading]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">
          Select Service Type
        </h2>
        <p className="text-text-secondary">Choose your travel preference</p>
      </div>

      {loadingStates.transferTypes ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-text-secondary">Loading service types...</span>
        </div>
      ) : (
        <RadioGroup
          value={formData.serviceType}
          onChange={(value) => updateFormData("serviceType", value)}
        >
          {transferTypes?.map((option) => (
            <Label
              key={option.id}
              htmlFor={`transfer-type-${option.id}`}
              className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors ${
                formData.serviceType === option.id.toString()
                  ? "border-primary bg-primary-50"
                  : "border-gray-200"
              }`}
            >
              <RadioGroupItem
                value={option.id.toString()}
                id={`transfer-type-${option.id}`}
                checked={formData.serviceType === option.id.toString()}
                onChange={(e) => updateFormData("serviceType", e.target.value)}
              />
              <div className="font-semibold text-text-primary">
                {option.name}
              </div>
            </Label>
          ))}
        </RadioGroup>
      )}
    </div>
  );
};

export default Step2;
