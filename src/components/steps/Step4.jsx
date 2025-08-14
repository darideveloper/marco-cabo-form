import { MapPin, Calendar, Clock, Plane, Search, ChevronDown } from "lucide-react";
import Input from "../Input";
import Label from "../Label";
import { useState, useEffect, useRef } from "react";
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
  const [selectedHotel, setSelectedHotel] = useState(formData.arrivalHotel || "");
  const [allHotels, setAllHotels] = useState([]);
  const [priceInfo, setPriceInfo] = useState(formData.priceInfo || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Initialize available hotels from formData on component mount
  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Create a flat list of all hotels with zone information when zones are loaded
  useEffect(() => {
    if (zones.length > 0) {
      const hotelsList = zones.flatMap(zone => 
        zone.locations.map(hotel => ({
          ...hotel,
          zoneId: zone.id,
          zoneName: zone.name
        }))
      ).sort((a, b) => a.name.localeCompare(b.name));
      
      setAllHotels(hotelsList);
    }
  }, [zones]);

  // Filter hotels based on search term
  const filteredHotels = allHotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.zoneName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle hotel selection change
  const handleHotelChange = (hotel) => {
    setSelectedHotel(hotel.name);
    setIsDropdownOpen(false);
    setSearchTerm("");

    if (hotel.name) {
      // Update form data with both hotel and zone information
      updateFormData("arrivalHotel", hotel.name);
      updateFormData("arrivalZone", hotel.zoneId.toString());
      updateFormData("arrivalLocation", `${hotel.zoneName} - ${hotel.name}`);
      
      // Reset price info when hotel changes
      setPriceInfo(null);
      updateFormData("priceInfo", null);
      updateFormData("totalPrice", null);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setSearchTerm("");
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
            <Label htmlFor="arrivalHotel" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Select Hotel
            </Label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={toggleDropdown}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-left flex items-center justify-between"
              >
                <span className={selectedHotel ? "text-gray-900" : "text-gray-500"}>
                  {selectedHotel || "Select a hotel"}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
                  {/* Search Input */}
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search hotels or zones..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        autoFocus
                      />
                    </div>
                  </div>
                  
                  {/* Hotel Options */}
                  <div className="max-h-48 overflow-y-auto">
                    {filteredHotels.length > 0 ? (
                      filteredHotels.map((hotel) => (
                        <button
                          key={`${hotel.zoneId}-${hotel.id}`}
                          type="button"
                          onClick={() => handleHotelChange(hotel)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-900">{hotel.name}</div>
                          <div className="text-sm text-gray-500">{hotel.zoneName}</div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-center">
                        No hotels found matching "{searchTerm}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="arrivalLocationDetails" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Special Requirements
            </Label>
            <Input
              id="arrivalLocationDetails"
              value={formData.arrivalLocationDetails || ""}
              onChange={(e) =>
                updateFormData("arrivalLocationDetails", e.target.value)
              }
              placeholder="Baby car seat, booster seat, shopping stop..."
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
