const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
      <div
        className="h-2 rounded-full transition-all duration-300 ease-in-out bg-primary"
        style={{
          width: `${(currentStep / totalSteps) * 100}%`,
        }}
      />
    </div>
  )
}

export default ProgressBar
