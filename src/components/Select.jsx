const Select = ({ value, onChange, children, placeholder }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  );
};

export default Select;
