const RadioGroup = ({ value, onChange, children }) => {
  return <div className="space-y-2">{children}</div>;
};

const RadioGroupItem = ({ value, id, checked, onChange }) => {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
    />
  );
};

export { RadioGroup, RadioGroupItem };
