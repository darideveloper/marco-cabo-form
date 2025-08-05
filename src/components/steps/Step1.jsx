import { Car, Truck, Bus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../RadioGroup";
import Label from "../Label";

const transportOptions = [
  {
    id: "SUBURBAN",
    name: "Suburban",
    icon: Car,
    description: "Comfortable for up to 6 passengers",
  },
  {
    id: "VAN",
    name: "Van",
    icon: Truck,
    description: "Spacious for up to 12 passengers",
  },
  {
    id: "SPRINTER",
    name: "Sprinter",
    icon: Bus,
    description: "Large capacity for up to 20 passengers",
  },
];

const Step1 = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#162137" }}>
          Select Your Transport
        </h2>
        <p style={{ color: "#292e38" }}>
          Choose the vehicle that best fits your needs
        </p>
      </div>

      <RadioGroup
        value={formData.transport}
        onChange={(value) => updateFormData("transport", value)}
      >
        {transportOptions.map((option) => (
          <Label
            key={option.id}
            htmlFor={option.id}
            className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              formData.transport === option.id
                ? "border-[#FF2800] border-2 bg-[#FF2800]/8"
                : "border-gray-200"
            }
            `}
          >
            <RadioGroupItem
              value={option.id}
              id={option.id}
              checked={formData.transport === option.id}
              onChange={(e) => updateFormData("transport", e.target.value)}
            />
            <option.icon className="w-8 h-8" style={{ color: "#FF2800" }} />
            <div className="flex-1">
              <div className="font-semibold" style={{ color: "#162137" }}>
                {option.name}
              </div>
              <div className="text-sm" style={{ color: "#292e38" }}>
                {option.description}
              </div>
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Step1;
