import { Calendar, Clock } from "../icons";
import Input from "../Input";
import Label from "../Label";

const Step5 = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#162137" }}>
          Departure Information
        </h2>
        <p style={{ color: "#292e38" }}>
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
      </div>
    </div>
  );
};

export default Step5;
