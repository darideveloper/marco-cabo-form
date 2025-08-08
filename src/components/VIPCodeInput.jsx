import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { CheckCircle, XCircle, Loader2, Check } from "lucide-react";

const VIPCodeInput = ({ value, onChange, onValidation, isValid, isChecking }) => {
  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleCheckCode = () => {
    if (localValue.length >= 3) {
      onValidation(localValue);
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
      return "VIP code valid! Total price will be $0.00";
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
      <div className="flex gap-2">
        <div className="relative flex-1">
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
        <Button
          onClick={handleCheckCode}
          disabled={localValue.length < 3 || isChecking}
          className="px-4 py-2 min-w-[80px]"
          variant="outline"
        >
          {isChecking ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Apply"
          )}
        </Button>
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