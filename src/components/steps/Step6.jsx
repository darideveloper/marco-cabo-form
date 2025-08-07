import Button from "../Button";
import VIPCodeInput from "../VIPCodeInput";
import { useState, useEffect, useRef } from "react";
import { getPrices } from "../../api/price_api";
import { getVehicles } from "../../api/vehicles_api";
import { getTransferTypes } from "../../api/transfer_type_api";

const Step6 = ({ formData, updateFormData, onSubmit, submitBookingData, loading, error, validateVIP, calculatePrice }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
  const hasCalculatedPrice = useRef(false);
  const [vehicles, setVehicles] = useState([]);
  const [transferTypes, setTransferTypes] = useState([]);

  // Helper function to get display names from IDs
  const getVehicleName = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id.toString() === vehicleId);
    return vehicle ? vehicle.name : vehicleId;
  };

  const getTransferTypeName = (transferTypeId) => {
    const transferType = transferTypes.find(t => t.id.toString() === transferTypeId);
    return transferType ? transferType.name : transferTypeId;
  };

  // Fetch vehicles and transfer types for display names
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesData, transferTypesData] = await Promise.all([
          getVehicles(),
          getTransferTypes()
        ]);
        setVehicles(vehiclesData);
        setTransferTypes(transferTypesData);
      } catch (error) {
        console.error('Error fetching display data:', error);
      }
    };
    fetchData();
  }, []);

  // Calculate price when component mounts or when price info changes
  useEffect(() => {
    if (formData.arrivalZone && formData.arrivalHotel && formData.transport && formData.serviceType && !hasCalculatedPrice.current) {
      const calculateInitialPrice = async () => {
        setIsCalculatingPrice(true);
        hasCalculatedPrice.current = true;
        try {
          console.log(formData.arrivalZone, formData.transport, formData.serviceType);
          const prices = await getPrices(formData.arrivalZone, formData.transport, formData.serviceType);
          console.log('API Response:', prices);
          
          // Process the pricing data
          if (prices && prices.length > 0) {
            // Find the matching price for the selected vehicle and transfer type
            // Since we store IDs but API response has names, we need to map them
            const matchingPrice = prices.find(price => 
              price.vehicle.id.toString() === formData.transport &&
              price.transfer_type.id.toString() === formData.serviceType
            );
            
            if (matchingPrice) {
              const basePrice = parseFloat(matchingPrice.price);
              const finalPrice = formData.isVIPValid ? basePrice * 0.9 : basePrice; // 10% VIP discount
              
              const priceInfo = {
                basePrice: basePrice,
                finalPrice: finalPrice,
                discount: formData.isVIPValid ? basePrice * 0.1 : 0,
                suburban: prices.find(p => p.vehicle.id === 1)?.price || 0,
                van: prices.find(p => p.vehicle.id === 2)?.price || 0,
                sprinter: prices.find(p => p.vehicle.id === 3)?.price || 0,
              };
              
              updateFormData('priceInfo', priceInfo);
              updateFormData('totalPrice', finalPrice);
            }
          }
        } catch (error) {
          console.error('Error fetching prices:', error);
        } finally {
          setIsCalculatingPrice(false);
        }
      };
      calculateInitialPrice();
    }
  }, [formData.arrivalZone, formData.arrivalHotel, formData.transport, formData.serviceType, formData.isVIPValid]);

  // Reset the flag when key data changes
  useEffect(() => {
    hasCalculatedPrice.current = false;
  }, [formData.arrivalZone, formData.arrivalHotel, formData.transport, formData.serviceType]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const result = await submitBookingData();
      onSubmit(result);
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle VIP code validation
  const handleVIPValidation = async (code) => {
    await validateVIP(code);
    // Recalculate price after VIP validation
    if (formData.arrivalZone && formData.transport && formData.serviceType) {
      hasCalculatedPrice.current = false;
      const calculatePrice = async () => {
        setIsCalculatingPrice(true);
        try {
          const prices = await getPrices(formData.arrivalZone, formData.transport, formData.serviceType);
          
          if (prices && prices.length > 0) {
            const matchingPrice = prices.find(price => 
              price.vehicle.id.toString() === formData.transport &&
              price.transfer_type.id.toString() === formData.serviceType
            );
            
            if (matchingPrice) {
              const basePrice = parseFloat(matchingPrice.price);
              const finalPrice = formData.isVIPValid ? basePrice * 0.9 : basePrice;
              
              const priceInfo = {
                basePrice: basePrice,
                finalPrice: finalPrice,
                discount: formData.isVIPValid ? basePrice * 0.1 : 0,
                suburban: prices.find(p => p.vehicle.id === 1)?.price || 0,
                van: prices.find(p => p.vehicle.id === 2)?.price || 0,
                sprinter: prices.find(p => p.vehicle.id === 3)?.price || 0,
              };
              
              updateFormData('priceInfo', priceInfo);
              updateFormData('totalPrice', finalPrice);
            }
          }
        } catch (error) {
          console.error('Error recalculating prices:', error);
        } finally {
          setIsCalculatingPrice(false);
        }
      };
      calculatePrice();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">
          Booking Summary & Payment
        </h2>
        <p className="text-text-secondary">Review your booking details and apply any discounts</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div className="grid gap-3">
          <div className="flex justify-between">
            <span className="text-text-secondary">Transport:</span>
            <span className="text-text-primary font-semibold">
              {getVehicleName(formData.transport)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Service:</span>
            <span className="text-text-primary font-semibold">
              {getTransferTypeName(formData.serviceType)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Passenger:</span>
            <span className="text-text-primary font-semibold">
              {formData.name} {formData.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Passengers:</span>
            <span className="text-text-primary font-semibold">
              {formData.passengers}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Email:</span>
            <span className="text-text-primary font-semibold">
              {formData.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Phone:</span>
            <span className="text-text-primary font-semibold">
              {formData.phone}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <span className="text-text-secondary">Pickup:</span>
            <span className="text-text-primary font-semibold">
              {formData.arrivalLocation}
              {formData.arrivalLocationDetails &&
                ` (${formData.arrivalLocationDetails})`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Date & Time:</span>
            <span className="text-text-primary font-semibold">
              {formData.arrivalDate} at {formData.arrivalTime}
            </span>
          </div>
          {formData.serviceType === "Round Trip" && (
            <>
              <hr className="my-2" />
              <div className="flex justify-between">
                <span className="text-text-secondary">Return Pickup:</span>
                <span className="text-text-primary font-semibold">
                  {formData.departureLocation}
                  {formData.departureLocationDetails &&
                    ` (${formData.departureLocationDetails})`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Return Date & Time:</span>
                <span className="text-text-primary font-semibold">
                  {formData.departureDate} at {formData.departureTime}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* VIP Code Input */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <VIPCodeInput
          value={formData.vipCode}
          onChange={(value) => updateFormData("vipCode", value)}
          onValidation={handleVIPValidation}
          isValid={formData.isVIPValid}
          isChecking={false}
        />
      </div>

      {/* Price Information Display */}
      <div className="bg-primary-50 p-6 rounded-lg border-2 border-primary">
        <h3 className="font-bold text-lg mb-4 text-text-primary">
          Price Information
        </h3>
        {isCalculatingPrice ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Calculating price...</p>
          </div>
                ) : formData.priceInfo ? (
          <div className="space-y-4">
            {/* Price breakdown by vehicle type */}
            <div className="grid grid-cols-3 gap-2">
                              <div
                  className={`text-center p-2 bg-white rounded shadow-sm ${formData.transport === "1" ? "ring-2 ring-primary" : ""}`}
                >
                  <p className="text-sm text-gray-600">Suburban</p>
                  <p className="font-bold">${formData.priceInfo.suburban || 0}</p>
                </div>
                <div
                  className={`text-center p-2 bg-white rounded shadow-sm ${formData.transport === "2" ? "ring-2 ring-primary" : ""}`}
                >
                  <p className="text-sm text-gray-600">Van</p>
                  <p className="font-bold">${formData.priceInfo.van || 0}</p>
                </div>
                <div
                  className={`text-center p-2 bg-white rounded shadow-sm ${formData.transport === "3" ? "ring-2 ring-primary" : ""}`}
                >
                  <p className="text-sm text-gray-600">Sprinter</p>
                  <p className="font-bold">${formData.priceInfo.sprinter || 0}</p>
                </div>
            </div>

            {/* Enhanced price calculation with VIP discount */}
            {formData.priceInfo.basePrice !== undefined && (
              <div className="space-y-3">
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Base Price:</span>
                  <span className="font-semibold">${formData.priceInfo.basePrice}</span>
                </div>
                {formData.priceInfo.discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>VIP Discount:</span>
                    <span>-${formData.priceInfo.basePrice - formData.priceInfo.finalPrice}</span>
                  </div>
                )}
                <hr className="border-gray-300" />
                <div className="text-center p-4 bg-white rounded shadow-md">
                  <p className="text-xl text-gray-700 font-medium">Total Price</p>
                  <p className="font-bold text-2xl text-primary">
                    ${formData.priceInfo.finalPrice || formData.totalPrice || 0}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {getVehicleName(formData.transport)} {getTransferTypeName(formData.serviceType)}
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
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-gray-600">Price information will be calculated once all details are provided.</p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {(error || submitError) && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 text-sm">
            {error || submitError}
          </p>
        </div>
      )}

      <Button 
        onClick={handleSubmit} 
        className="w-full py-3 text-lg font-semibold"
        disabled={isSubmitting || loading}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Submitting...
          </div>
        ) : (
          'Complete Booking'
        )}
      </Button>
    </div>
  );
};

export default Step6;
