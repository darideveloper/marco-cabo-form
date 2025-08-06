import { Car, Truck, Bus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../RadioGroup";
import Label from "../Label";
import { getVehicles } from "../../api/vehicles_api";
import { useEffect, useState } from "react";


// Icon mapping for vehicle types
const vehicleIcons = {
  "Suburban": Car,
  "Van": Truck,
  "Sprinter": Bus,
};

// Description mapping for vehicle types
const vehicleDescriptions = {
  "Suburban": "Comfortable for up to 4 passengers",
  "Van": "Spacious for up to 8 passengers",
  "Sprinter": "Large capacity for up to 10 passengers",
};

const Step1 = ({ formData, updateFormData, loadingStates, setLoading }) => {
  const [vehicles, setVehicles] = useState([]);
  
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading("vehicles", true);
      try {
        const vehicles = await getVehicles();
        setVehicles(vehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading("vehicles", false);
      }
    };
    fetchVehicles();
  }, [setLoading]);
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">
          Select Your Transport
        </h2>
        <p className="text-text-secondary">
          Choose the vehicle that best fits your needs
        </p>
      </div>

      {loadingStates.vehicles ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-text-secondary">Loading vehicles...</span>
        </div>
      ) : (
        <RadioGroup
          value={formData.transport}
          onChange={(value) => updateFormData("transport", value)}
        >
        {vehicles?.map((vehicle) => {
          const IconComponent = vehicleIcons[vehicle.name];
          const description = vehicleDescriptions[vehicle.name];
          
          return (
            <Label
              key={vehicle.id}
              htmlFor={`vehicle-${vehicle.id}`}
              className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                formData.transport === vehicle.id.toString()
                  ? "border-primary border-2 bg-primary-50"
                  : "border-gray-200"
              }
              `}
            >
              <RadioGroupItem
                value={vehicle.id.toString()}
                id={`vehicle-${vehicle.id}`}
                checked={formData.transport === vehicle.id.toString()}
                onChange={(e) => updateFormData("transport", e.target.value)}
              />
              {IconComponent && <IconComponent className="w-8 h-8 text-primary" />}
              <div className="flex-1">
                <div className="font-semibold text-text-primary">
                  {vehicle.name}
                </div>
                <div className="text-sm text-text-secondary">
                  {description}
                </div>
              </div>
            </Label>
          );
        })}
        </RadioGroup>
      )}
    </div>
  );
};

export default Step1;
