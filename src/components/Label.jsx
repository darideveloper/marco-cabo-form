const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium mb-1 text-text-primary ${className}`}>
      {children}
    </label>
  )
}

export default Label
