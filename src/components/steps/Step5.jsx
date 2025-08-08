import { Calendar, Clock, Plane } from "lucide-react";
import Input from "../Input";
import Label from "../Label";
import useBookingStore from "../../store/bookingStore";

const Step5 = () => {
  const { formData, updateFormData } = useBookingStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">
          Departure Information
        </h2>
        <p className="text-text-secondary">
          When and where should we pick you up for the return trip?
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="departureDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Return Date
            </Label>
            <Input
              id="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={(e) => updateFormData("departureDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="departureTime" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Return Time
            </Label>
            <Input
              id="departureTime"
              type="time"
              value={formData.departureTime}
              onChange={(e) => updateFormData("departureTime", e.target.value)}
            />
          </div>
        </div>

        {/* Flight Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="departureAirline" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              Airline (Optional)
            </Label>
            <Input
              id="departureAirline"
              value={formData.departureAirline || ""}
              onChange={(e) => updateFormData("departureAirline", e.target.value)}
              placeholder="e.g., American Airlines, Delta"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="departureFlightNumber" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              Flight Number (Optional)
            </Label>
            <Input
              id="departureFlightNumber"
              value={formData.departureFlightNumber || ""}
              onChange={(e) => updateFormData("departureFlightNumber", e.target.value)}
              placeholder="e.g., AA123, DL456"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
