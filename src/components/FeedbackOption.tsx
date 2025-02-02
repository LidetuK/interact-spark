import { Check } from "lucide-react";

interface FeedbackOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const FeedbackOption = ({ label, selected, onClick }: FeedbackOptionProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 text-left rounded-lg border transition-all duration-200 hover:border-black
        ${selected ? 'border-black' : 'border-gray-200'}
        flex justify-between items-center font-inter text-lg`}
    >
      {label}
      {selected && <Check className="w-5 h-5" />}
    </button>
  );
};

export default FeedbackOption;