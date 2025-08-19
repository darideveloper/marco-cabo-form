import { MapPin, Calendar, Clock, Plane, Search, ChevronDown } from "lucide-react";
import Input from "../Input";
import Label from "../Label";
import { useState, useEffect, useRef } from "react";
import useBookingStore from "../../store/bookingStore";

const Step3 = () => {
  const { 
    zones, 
    loadingStates, 
    formData, 
    updateFormData, 
    fetchZones,
    calculatePrices,
    getVehicleName,
    getTransferTypeName,
    setDefaultDateTime
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

  // Set default date and time values when component mounts
  useEffect(() => {
    setDefaultDateTime();
  }, [setDefaultDateTime]);

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
          zoneName: zone.name,
          // Filter out postal code information if it exists
          zoneNameClean: zone.name.replace(/Código Postal[:\s]*\d+/gi, '').trim()
        }))
      ).sort((a, b) => a.name.localeCompare(b.name));
      
      setAllHotels(hotelsList);
    }
  }, [zones]);

  // Recalculate prices when transport or service type changes
  useEffect(() => {
    if (formData.arrivalHotel && formData.transport && formData.serviceType) {
      calculatePrices();
    }
  }, [formData.transport, formData.serviceType, formData.arrivalHotel, calculatePrices]);

  // Sync local priceInfo state with formData.priceInfo
  useEffect(() => {
    setPriceInfo(formData.priceInfo);
  }, [formData.priceInfo]);

  // Filter hotels based on search term
  const filteredHotels = allHotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.zoneName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (hotel.zoneNameClean && hotel.zoneNameClean.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle hotel selection change
  const handleHotelChange = async (hotel) => {
    setSelectedHotel(hotel.name);
    setIsDropdownOpen(false);
    setSearchTerm("");

    if (hotel.name) {
      // Update form data with both hotel and zone information
      updateFormData("arrivalHotel", hotel.name);
      updateFormData("arrivalZone", hotel.zoneId.toString());
      updateFormData("arrivalLocation", hotel.id);
      
      // Reset price info when hotel changes
      setPriceInfo(null);
      updateFormData("priceInfo", null);
      updateFormData("totalPrice", null);

      // Calculate new price if we have all required information
      if (formData.transport && formData.serviceType) {
        await calculatePrices();
      }
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
                          <div className="text-sm text-gray-500">{hotel.zoneNameClean || hotel.zoneName}</div>
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

          {/* Private Villa or Airbnb Transfer Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => window.open('mailto:info@marco-cabo.com', '_blank')}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-md hover:border-primary hover:bg-primary/5 transition-colors text-center text-gray-600 hover:text-primary hover:cursor-pointer"
            >
              🏠 Private Villa or Airbnb Transfer Inquiry
            </button>
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

          {/* Price Information Display - Only show if hotel is selected */}
          {formData.arrivalHotel && (
            <div className="bg-primary-50 p-4 sm:p-6 rounded-lg border-2 border-primary">
              <h3 className="font-bold text-lg mb-4 text-text-primary">
                Price Information
              </h3>
              {loadingStates.prices ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Calculating price...</p>
                </div>
              ) : formData.priceInfo ? (
                <div className="space-y-4">
                  {/* Consolidated price display */}
                  <div className="text-center p-4 sm:p-6 bg-white rounded shadow-md">
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        {getVehicleName(formData.transport)} • {getTransferTypeName(formData.serviceType)}
                      </p>
                    </div>
                    
                    {formData.priceInfo.basePrice !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Base Price:</span>
                          <span className="font-semibold">${formData.priceInfo.basePrice}</span>
                        </div>
                        
                        {formData.priceInfo.discount > 0 && (
                          <div className="flex justify-between items-center text-sm text-green-600">
                            <span>VIP Discount:</span>
                            <span>-${formData.priceInfo.basePrice - formData.priceInfo.finalPrice}</span>
                          </div>
                        )}
                        
                        <hr className="border-gray-200" />
                        
                        <div className="pt-2">
                          <p className="text-lg text-gray-700 font-medium">Total Price</p>
                          <p className="font-bold text-2xl sm:text-3xl text-primary">
                            ${formData.priceInfo.finalPrice || formData.totalPrice || 0}
                          </p>
                          {formData.isVIPValid && (
                            <p className="text-sm text-green-600 mt-1">
                              VIP discount applied!
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600">Price information will be calculated once all details are provided.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Step3;
