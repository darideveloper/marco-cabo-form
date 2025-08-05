const Input = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF2800] focus:ring-1 focus:ring-[#FF2800] ${className}`}
    />
  );
};

export default Input;
