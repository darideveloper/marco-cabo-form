import Button from "../Button";

const Step6 = ({ formData, onSubmit }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">
          Booking Summary
        </h2>
        <p className="text-text-secondary">Review your booking details</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div className="grid gap-3">
          <div className="flex justify-between">
            <span className="text-text-secondary">Transport:</span>
            <span className="text-text-primary font-semibold">
              {formData.transport}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Service:</span>
            <span className="text-text-primary font-semibold">
              {formData.serviceType}
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

        {/* Display Total Price */}
        {formData.totalPrice && (
          <>
            <hr className="my-2" />
            <h3 className="font-bold text-lg mb-2 text-text-primary">
              Price Information
            </h3>
            <div className="bg-primary-50 p-4 rounded-md">
              <div className="text-center p-4 bg-white rounded shadow-md">
                <p className="text-xl text-gray-700 font-medium">Total Price</p>
                <p className="font-bold text-2xl text-primary">
                  ${formData.totalPrice}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.transport} {formData.serviceType}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <Button onClick={onSubmit} className="w-full py-3 text-lg font-semibold">
        Complete Booking
      </Button>
    </div>
  );
};

export default Step6;
