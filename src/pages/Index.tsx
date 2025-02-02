import { useState } from "react";
import FeedbackOption from "../components/FeedbackOption";
import ProgressIndicator from "../components/ProgressIndicator";

const FEEDBACK_OPTIONS = [
  "Mindset",
  "Health",
  "Business",
  "Happiness",
  "Wealth",
  "Relationships",
  "Leadership"
];

const Index = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="min-h-screen bg-white font-inter p-6 max-w-2xl mx-auto">
      <ProgressIndicator currentStep={1} totalSteps={5} />
      
      <h1 className="text-4xl font-bold mb-12 mt-8">
        What areas of your life do you want to focus on?
      </h1>

      <div className="space-y-4">
        {FEEDBACK_OPTIONS.map((option) => (
          <FeedbackOption
            key={option}
            label={option}
            selected={selectedOptions.includes(option)}
            onClick={() => toggleOption(option)}
          />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          className="bg-btn-background text-btn-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          onClick={() => console.log("Selected options:", selectedOptions)}
        >
          Next step
        </button>
      </div>
    </div>
  );
};

export default Index;