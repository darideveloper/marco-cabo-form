import { useState } from "react";
import Input from "./Input";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const VIPCodeInput = ({ value, onChange, onValidation, isValid, isChecking }) => {
  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
    
    // Validate after user stops typing
    if (newValue.length >= 3) {
      setTimeout(() => {
        onValidation(newValue);
      }, 500);
    } else {
      onValidation("");
    }
  };

  const getStatusIcon = () => {
    if (isChecking) {
      return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
    }
    
    if (localValue.length === 0) {
      return null;
    }
    
    if (isValid) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    
    if (localValue.length >= 3) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    
    return null;
  };

  const getStatusText = () => {
    if (isChecking) {
      return "Validating...";
    }
    
    if (localValue.length === 0) {
      return "";
    }
    
    if (isValid) {
      return "VIP code valid! Price will be $0.00";
    }
    
    if (localValue.length >= 3) {
      return "Invalid VIP code";
    }
    
    return "";
  };

  const getStatusColor = () => {
    if (isValid) return "text-green-600";
    if (localValue.length >= 3 && !isValid) return "text-red-600";
    return "text-gray-500";
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        VIP Code (Optional)
      </label>
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter VIP code"
          value={localValue}
          onChange={handleChange}
          className="pr-10"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {getStatusIcon()}
        </div>
      </div>
      {getStatusText() && (
        <p className={`text-sm ${getStatusColor()}`}>
          {getStatusText()}
        </p>
      )}
      <p className="text-xs text-gray-500">
        Enter a valid VIP code to get 100% discount on your booking
      </p>
    </div>
  );
};

export default VIPCodeInput; 