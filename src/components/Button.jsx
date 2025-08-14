const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  style = {},
}) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 hover:cursor-pointer";

  const variants = {
    primary: `${baseClasses} text-white bg-primary hover:bg-primary-600`,
    outline: `${baseClasses} border-2 bg-transparent border-primary text-primary hover:bg-primary-50`,
  };

  const getButtonStyle = () => {
    if (disabled) {
      return { backgroundColor: "#9ca3af", color: "white", ...style };
    }

    return { ...style };
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${className} ${disabled ? "cursor-not-allowed opacity-50 bg-gray-disabled" : ""}`}
      style={getButtonStyle()}
    >
      {children}
    </button>
  );
};

export default Button;
