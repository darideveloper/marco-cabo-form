import { MapPin, Calendar, Clock, Plane } from "lucide-react";
import Input from "../Input";
import Label from "../Label";
import { useState, useEffect } from "react";
import useBookingStore from "../../store/bookingStore";

const Step4 = () => {
  const { 
    zones, 
    loadingStates, 
    formData, 
    updateFormData, 
    fetchZones 
  } = useBookingStore();

  // Initialize state from formData to persist selections when navigating between steps
  const [selectedZone, setSelectedZone] = useState(formData.arrivalZone || "");
  const [selectedHotel, setSelectedHotel] = useState(
    formData.arrivalHotel || "",
  );
  const [availableHotels, setAvailableHotels] = useState([]);
  const [priceInfo, setPriceInfo] = useState(formData.priceInfo || null);

  // Initialize available hotels from formData on component mount
  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  // Handle zone selection change
  const handleZoneChange = (e) => {
    const newZoneId = e.target.value;
    setSelectedZone(newZoneId);

    // Find the zone data
    if (newZoneId) {
      const zone = zones.find((zone) => zone.id.toString() === newZoneId);
      if (zone) {
        setAvailableHotels(zone.locations);
        setSelectedHotel(""); // Reset hotel when zone changes

        // Update form data
        updateFormData("arrivalZone", newZoneId);
        updateFormData("arrivalHotel", "");
        updateFormData("arrivalLocation", "");
        updateFormData("priceInfo", null);
        updateFormData("totalPrice", null);
      }
    } else {
      setAvailableHotels([]);
      setSelectedHotel("");
      updateFormData("arrivalZone", "");
      updateFormData("arrivalHotel", "");
      updateFormData("arrivalLocation", "");
      updateFormData("priceInfo", null);
      updateFormData("totalPrice", null);
    }
  };

  // Handle hotel selection change
  const handleHotelChange = (e) => {
    const newHotel = e.target.value;
    setSelectedHotel(newHotel);

    if (newHotel && selectedZone) {
      // Find the zone name for display
      const zone = zones.find((zone) => zone.id.toString() === selectedZone);
      const zoneName = zone ? zone.name : selectedZone;
      
      // Update form data
      updateFormData("arrivalHotel", newHotel);
      updateFormData("arrivalLocation", `${zoneName} - ${newHotel}`);
      
      // For now, we'll set a placeholder price info since the API structure has changed
      // This should be updated when the pricing API is available
      const placeholderPriceInfo = {
        suburban: 0,
        van: 0,
        sprinter: 0
      };
      
      setPriceInfo(placeholderPriceInfo);
      updateFormData("priceInfo", placeholderPriceInfo);
      updateFormData("totalPrice", 0);
    } else {
      setPriceInfo(null);
      updateFormData("arrivalHotel", "");
      updateFormData("priceInfo", null);
      updateFormData("totalPrice", null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">
          Arrival Information
        </h2>
        <p className="text-text-secondary">
          When and where do you need to be picked up?
        </p>
      </div>

      {loadingStates.zones ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-text-secondary">Loading zones...</span>
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="arrivalZone" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Select Zone
            </Label>
            <select
              id="arrivalZone"
              value={selectedZone}
              onChange={handleZoneChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a zone</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id.toString()}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="arrivalHotel" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Select Hotel
            </Label>
            <select
              id="arrivalHotel"
              value={selectedHotel}
              onChange={handleHotelChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={!selectedZone}
            >
              <option value="">Select a hotel</option>
              {availableHotels.map((hotel) => (
                <option key={hotel.id} value={hotel.name}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="arrivalLocation" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Additional Location Details (Optional)
            </Label>
            <Input
              id="arrivalLocationDetails"
              value={formData.arrivalLocationDetails || ""}
              onChange={(e) =>
                updateFormData("arrivalLocationDetails", e.target.value)
              }
              placeholder="Enter additional location details if needed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="arrivalDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Pickup Date
              </Label>
              <Input
                id="arrivalDate"
                type="date"
                value={formData.arrivalDate}
                onChange={(e) => updateFormData("arrivalDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalTime" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pickup Time
              </Label>
              <Input
                id="arrivalTime"
                type="time"
                value={formData.arrivalTime}
                onChange={(e) => updateFormData("arrivalTime", e.target.value)}
              />
            </div>
          </div>

          {/* Flight Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="arrivalAirline" className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Airline
              </Label>
              <Input
                id="arrivalAirline"
                value={formData.arrivalAirline || ""}
                onChange={(e) => updateFormData("arrivalAirline", e.target.value)}
                placeholder="e.g., American Airlines, Delta"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalFlightNumber" className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Flight Number
              </Label>
              <Input
                id="arrivalFlightNumber"
                value={formData.arrivalFlightNumber || ""}
                onChange={(e) => updateFormData("arrivalFlightNumber", e.target.value)}
                placeholder="e.g., AA123, DL456"
                required
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;
