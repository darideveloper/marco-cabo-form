import Button from "../Button";
import VIPCodeInput from "../VIPCodeInput";
import { useState, useEffect, useRef } from "react";
import useBookingStore from "../../store/bookingStore";

const Step6 = ({ onSubmit, submitBookingData, loading, error }) => {
  const { 
    formData, 
    updateFormData, 
    loadingStates, 
    calculatePrices, 
    validateVIP,
    getVehicleName,
    getTransferTypeName
  } = useBookingStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const hasCalculatedPrice = useRef(false);

  // Calculate price when component mounts or when price info changes
  useEffect(() => {
    if (formData.arrivalZone && formData.arrivalHotel && formData.transport && formData.serviceType && !hasCalculatedPrice.current) {
      hasCalculatedPrice.current = true;
      calculatePrices();
    }
  }, [formData.arrivalZone, formData.arrivalHotel, formData.transport, formData.serviceType, formData.isVIPValid, calculatePrices]);

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
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-text-primary">
          Booking Summary & Payment
        </h2>
        <p className="text-sm sm:text-base text-text-secondary">Review your booking details and apply any discounts</p>
      </div>

      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
            <span className="text-sm sm:text-base text-text-secondary">Transport:</span>
            <span className="text-sm sm:text-base text-text-primary font-semibold break-words">
              {getVehicleName(formData.transport)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
            <span className="text-sm sm:text-base text-text-secondary">Service:</span>
            <span className="text-sm sm:text-base text-text-primary font-semibold break-words">
              {getTransferTypeName(formData.serviceType)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
            <span className="text-sm sm:text-base text-text-secondary">Passenger:</span>
            <span className="text-sm sm:text-base text-text-primary font-semibold break-words">
              {formData.name} {formData.lastName}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
            <span className="text-sm sm:text-base text-text-secondary">Passengers:</span>
            <span className="text-sm sm:text-base text-text-primary font-semibold">
              {formData.passengers}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
            <span className="text-sm sm:text-base text-text-secondary">Email:</span>
            <span className="text-sm sm:text-base text-text-primary font-semibold break-all">
              {formData.email}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
            <span className="text-sm sm:text-base text-text-secondary">Phone:</span>
            <span className="text-sm sm:text-base text-text-primary font-semibold break-words">
              {formData.phone}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
            <span className="text-sm sm:text-base text-text-secondary">Pickup:</span>
            <span className="text-sm sm:text-base text-text-primary font-semibold break-words text-right sm:text-left">
              {formData.arrivalLocation}
              {formData.arrivalLocationDetails &&
                ` (${formData.arrivalLocationDetails})`}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
            <span className="text-sm sm:text-base text-text-secondary">Date & Time:</span>
            <span className="text-sm sm:text-base text-text-primary font-semibold break-words">
              {formData.arrivalDate} at {formData.arrivalTime}
            </span>
          </div>
          
          {/* Flight Information */}
          {(formData.arrivalAirline || formData.arrivalFlightNumber) && (
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
              <span className="text-sm sm:text-base text-text-secondary">Flight:</span>
              <span className="text-sm sm:text-base text-text-primary font-semibold break-words text-right sm:text-left">
                {formData.arrivalAirline && formData.arrivalFlightNumber 
                  ? `${formData.arrivalAirline} ${formData.arrivalFlightNumber}`
                  : formData.arrivalAirline || formData.arrivalFlightNumber
                }
              </span>
            </div>
          )}
          {getTransferTypeName(formData.serviceType) === "Round Trip" && (
            <>
              <hr className="my-2" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="text-sm sm:text-base text-text-secondary">Return Date & Time:</span>
                <span className="text-sm sm:text-base text-text-primary font-semibold break-words">
                  {formData.departureDate} at {formData.departureTime}
                </span>
              </div>
              
              {/* Return Flight Information */}
              {(formData.departureAirline || formData.departureFlightNumber) && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-text-secondary">Return Flight:</span>
                  <span className="text-sm sm:text-base text-text-primary font-semibold break-words text-right sm:text-left">
                    {formData.departureAirline && formData.departureFlightNumber 
                      ? `${formData.departureAirline} ${formData.departureFlightNumber}`
                      : formData.departureAirline || formData.departureFlightNumber
                    }
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* VIP Code Input */}
      <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
        <VIPCodeInput
          value={formData.vipCode}
          onChange={(value) => updateFormData("vipCode", value)}
          onValidation={handleVIPValidation}
          isValid={formData.isVIPValid}
          isChecking={false}
        />
      </div>

      {/* Price Information Display */}
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

      {/* Error Display */}
      {(error || submitError) && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 text-sm">
            {error || submitError}
          </p>
        </div>
      )}

      {/* Privacy Consent Checkbox */}
      <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="privacy-consent"
            checked={formData.privacyConsent}
            onChange={(e) => updateFormData("privacyConsent", e.target.checked)}
            className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
            required
          />
          <label htmlFor="privacy-consent" className="text-sm text-text-secondary leading-relaxed">
            I have read and accept the{" "}
            <a
              href="https://marco-cabo.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark underline font-medium"
            >
              Privacy Notice
            </a>
            .
          </label>
        </div>
      </div>

      <Button 
        onClick={handleSubmit} 
        className="w-full py-3 text-base sm:text-lg font-semibold"
        disabled={isSubmitting || loading || !formData.privacyConsent}
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
