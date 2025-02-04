interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="text-sm text-gray-600 font-inter mb-2">
        STEP {currentStep} OF {totalSteps}
      </div>
      <div className="h-1 bg-gray-200 w-full">
        <div 
          className="h-full transition-all duration-300 ease-in-out"
          style={{ 
            width: `${(currentStep / totalSteps) * 100}%`,
            backgroundColor: '#FF0000'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;