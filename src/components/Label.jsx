const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium mb-1 ${className}`} style={{ color: "#162137" }}>
      {children}
    </label>
  )
}

export default Label
