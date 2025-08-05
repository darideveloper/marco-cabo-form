import Button from "../Button";

const Step6 = ({ formData, onSubmit }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#162137" }}>
          Booking Summary
        </h2>
        <p style={{ color: "#292e38" }}>Review your booking details</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div className="grid gap-3">
          <div className="flex justify-between">
            <span style={{ color: "#292e38" }}>Transport:</span>
            <span style={{ color: "#162137" }} className="font-semibold">
              {formData.transport}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#292e38" }}>Service:</span>
            <span style={{ color: "#162137" }} className="font-semibold">
              {formData.serviceType}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#292e38" }}>Passenger:</span>
            <span style={{ color: "#162137" }} className="font-semibold">
              {formData.name} {formData.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#292e38" }}>Passengers:</span>
            <span style={{ color: "#162137" }} className="font-semibold">
              {formData.passengers}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#292e38" }}>Email:</span>
            <span style={{ color: "#162137" }} className="font-semibold">
              {formData.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#292e38" }}>Phone:</span>
            <span style={{ color: "#162137" }} className="font-semibold">
              {formData.phone}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <span style={{ color: "#292e38" }}>Pickup:</span>
            <span style={{ color: "#162137" }} className="font-semibold">
              {formData.arrivalLocation}
              {formData.arrivalLocationDetails &&
                ` (${formData.arrivalLocationDetails})`}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#292e38" }}>Date & Time:</span>
            <span style={{ color: "#162137" }} className="font-semibold">
              {formData.arrivalDate} at {formData.arrivalTime}
            </span>
          </div>
          {formData.serviceType === "Round Trip" && (
            <>
              <hr className="my-2" />
              <div className="flex justify-between">
                <span style={{ color: "#292e38" }}>Return Pickup:</span>
                <span style={{ color: "#162137" }} className="font-semibold">
                  {formData.departureLocation}
                  {formData.departureLocationDetails &&
                    ` (${formData.departureLocationDetails})`}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#292e38" }}>Return Date & Time:</span>
                <span style={{ color: "#162137" }} className="font-semibold">
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
            <h3 className="font-bold text-lg mb-2" style={{ color: "#162137" }}>
              Price Information
            </h3>
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="text-center p-4 bg-white rounded shadow-md">
                <p className="text-xl text-gray-700 font-medium">Total Price</p>
                <p className="font-bold text-2xl text-blue-600">
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
