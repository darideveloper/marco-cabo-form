import { User, Mail, Phone, Users } from "lucide-react";
import Input from "../Input";
import Select from "../Select";
import Label from "../Label";
import useBookingStore from "../../store/bookingStore";

const Step3 = () => {
  const { formData, updateFormData, vehicles, getVehicleName } = useBookingStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">
          General Information
        </h2>
        <p className="text-text-secondary">Please provide your details</p>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              First Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              placeholder="Enter your first name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Last Name
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => updateFormData("lastName", e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="Enter your email address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passengers" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Number of Passengers
          </Label>
          <Select
            value={formData.passengers}
            onChange={(value) => updateFormData("passengers", value)}
            placeholder="Select number of passengers"
          >
            {(() => {
              // Get the selected vehicle
              const selectedVehicle = vehicles.find(v => v.id.toString() === formData.transport);
              let maxPassengers = 20; // Default fallback
              
              // Set max passengers based on vehicle type
              if (selectedVehicle) {
                switch (selectedVehicle.name) {
                  case "Suburban":
                    maxPassengers = 4;
                    break;
                  case "Van":
                    maxPassengers = 8;
                    break;
                  case "Sprinter":
                    maxPassengers = 10;
                    break;
                  default:
                    maxPassengers = 20;
                }
              }
              
              // Reset passengers if current selection exceeds vehicle capacity
              if (formData.passengers && parseInt(formData.passengers) > maxPassengers) {
                updateFormData("passengers", "");
              }
              
              return Array.from({ length: maxPassengers }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num.toString()}>
                  {num} {num === 1 ? "passenger" : "passengers"}
                </option>
              ));
            })()}
          </Select>
          {formData.transport && (
            <p className="text-xs text-text-secondary mt-1">
              Maximum capacity for {getVehicleName(formData.transport)}: {
                (() => {
                  const selectedVehicle = vehicles.find(v => v.id.toString() === formData.transport);
                  if (selectedVehicle) {
                    switch (selectedVehicle.name) {
                      case "Suburban": return "4 passengers";
                      case "Van": return "8 passengers";
                      case "Sprinter": return "10 passengers";
                      default: return "20 passengers";
                    }
                  }
                  return "20 passengers";
                })()
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step3;
