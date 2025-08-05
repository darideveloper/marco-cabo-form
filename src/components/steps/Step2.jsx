import { RadioGroup, RadioGroupItem } from "../RadioGroup";
import Label from "../Label";

const Step2 = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#162137" }}>
          Select Service Type
        </h2>
        <p style={{ color: "#292e38" }}>Choose your travel preference</p>
      </div>

      <RadioGroup
        value={formData.serviceType}
        onChange={(value) => updateFormData("serviceType", value)}
      >
        {["One way", "Round Trip"].map((option) => (
          <Label
            key={option}
            htmlFor={option}
            className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer hover:border-[#FF2800] transition-colors ${
              formData.serviceType === option
                ? "border-[#FF2800] bg-[#fff5f5]"
                : "border-gray-200"
            }`}
          >
            <RadioGroupItem
              value={option}
              id={option}
              checked={formData.serviceType === option}
              onChange={(e) => updateFormData("serviceType", e.target.value)}
            />
            <div className="font-semibold" style={{ color: "#162137" }}>
              {option}
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Step2;
