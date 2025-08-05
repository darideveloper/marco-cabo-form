const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
      <div
        className="h-2 rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: `${(currentStep / totalSteps) * 100}%`,
          backgroundColor: "#FF2800",
        }}
      />
    </div>
  )
}

export default ProgressBar
