import { RadioGroup, RadioGroupItem } from "../RadioGroup";
import Label from "../Label";

const Step2 = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">
          Select Service Type
        </h2>
        <p className="text-text-secondary">Choose your travel preference</p>
      </div>

      <RadioGroup
        value={formData.serviceType}
        onChange={(value) => updateFormData("serviceType", value)}
      >
        {["One way", "Round Trip"].map((option) => (
          <Label
            key={option}
            htmlFor={option}
            className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors ${
              formData.serviceType === option
                ? "border-primary bg-primary-50"
                : "border-gray-200"
            }`}
          >
            <RadioGroupItem
              value={option}
              id={option}
              checked={formData.serviceType === option}
              onChange={(e) => updateFormData("serviceType", e.target.value)}
            />
            <div className="font-semibold text-text-primary">
              {option}
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Step2;
