import { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import Button from "./components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useBookingStore from "./store/bookingStore";

// Import step components
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";
import Step4 from "./components/steps/Step4";
import Step5 from "./components/steps/Step5";
import Step6 from "./components/steps/Step6";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, resetFormData, getTransferTypeName } = useBookingStore();

  const totalSteps = getTransferTypeName(formData.serviceType) === "Round Trip" ? 6 : 5;

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // reset form data
    resetFormData();
    setCurrentStep(1);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return getTransferTypeName(formData.serviceType) === "Round Trip" ? (
          <Step5 />
        ) : (
          <Step6 onSubmit={handleSubmit} />
        );
      case 6:
        return <Step6 onSubmit={handleSubmit} />;
      default:
        return <Step1 />;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.transport !== "";
      case 2:
        return formData.serviceType !== "";
      case 3:
        return (
          formData.name &&
          formData.lastName &&
          formData.email &&
          isValidEmail(formData.email) &&
          formData.phone &&
          formData.passengers
        );
      case 4:
        return (
          formData.arrivalZone &&
          formData.arrivalHotel &&
          formData.arrivalDate &&
          formData.arrivalTime &&
          formData.arrivalAirline &&
          formData.arrivalFlightNumber
        );
      case 5:
        return (
          getTransferTypeName(formData.serviceType) === "One way" ||
          (formData.departureDate && 
           formData.departureTime && 
           formData.departureAirline && 
           formData.departureFlightNumber)
        );
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderCurrentStep()}

          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant={currentStep === 1 ? "primary" : "outline"}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < totalSteps && (
              <Button onClick={nextStep} disabled={!canProceed()}>
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-text-secondary">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
