const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  style = {},
}) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2";

  const variants = {
    primary: `${baseClasses} text-white`,
    outline: `${baseClasses} border-2 bg-transparent`,
  };

  const getButtonStyle = () => {
    if (disabled) {
      return { backgroundColor: "#9ca3af", color: "white", ...style };
    }

    if (variant === "outline") {
      return { borderColor: "#FF2800", color: "#FF2800", ...style };
    }

    return { backgroundColor: "#FF2800", ...style };
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${className} ${disabled ? "cursor-not-allowed opacity-50" : "hover:opacity-90"}`}
      style={getButtonStyle()}
    >
      {children}
    </button>
  );
};

export default Button;
