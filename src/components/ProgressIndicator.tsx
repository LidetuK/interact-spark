interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  return (
    <div className="mb-4">
      <div className="text-sm text-gray-600 font-inter mb-2">
        STEP {currentStep} OF {totalSteps}
      </div>
      <div className="h-1 w-24 bg-black"></div>
    </div>
  );
};

export default ProgressIndicator;