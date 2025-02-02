import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ProgressIndicator from "@/components/ProgressIndicator";
import { toast } from "sonner";

interface FeedbackFormData {
  feedbackType: string[];
  otherFeedbackType?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  satisfaction: string;
  improvementSuggestion?: string;
  foundWhatLookingFor: string;
  whatWasLookingFor?: string;
  followUp: string;
  bestTimeToReach?: string;
  howHeardAboutUs?: string;
  otherHowHeardAboutUs?: string;
  termsAccepted: boolean;
}

const FeedbackForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FeedbackFormData>();

  const satisfaction = watch("satisfaction");
  const foundWhatLookingFor = watch("foundWhatLookingFor");
  const followUp = watch("followUp");

  const onSubmit = (data: FeedbackFormData) => {
    console.log(data);
    toast.success("Thank you for your feedback! We'll get back to you soon.");
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {currentStep === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-inter font-semibold">What's on your mind?</h2>
          <div className="space-y-4">
            {[
              "General Feedback about the Website",
              "Question about Our Services/Programs",
              "Technical Issue with the Website",
              "Partnership or Collaboration Opportunity",
              "Other"
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox {...register("feedbackType")} value={option} />
                <Label>{option}</Label>
              </div>
            ))}
          </div>
          {watch("feedbackType")?.includes("Other") && (
            <Input
              {...register("otherFeedbackType")}
              placeholder="Please specify"
              className="mt-2"
            />
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-inter font-semibold">Your Contact Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                className="mt-1"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
            <div>
              <Label htmlFor="email">Your Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="mt-1"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Your Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-inter font-semibold">Your Feedback</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">How can we assist you? *</Label>
              <Textarea
                id="message"
                {...register("message", { required: true })}
                className="mt-1"
                placeholder="Please describe your inquiry or feedback in detail..."
              />
              {errors.message && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
            <div>
              <Label>How satisfied are you with your experience on our website?</Label>
              <RadioGroup
                onValueChange={(value) => {
                  register("satisfaction").onChange({ target: { value } });
                }}
                className="mt-2"
              >
                {[
                  "Very Satisfied",
                  "Satisfied",
                  "Neutral",
                  "Dissatisfied",
                  "Very Dissatisfied"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {(satisfaction === "Dissatisfied" || satisfaction === "Very Dissatisfied") && (
              <div>
                <Label htmlFor="improvementSuggestion">What could we do to improve your experience?</Label>
                <Textarea
                  id="improvementSuggestion"
                  {...register("improvementSuggestion")}
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-inter font-semibold">Additional Information</h2>
          <div className="space-y-4">
            <div>
              <Label>Did you find what you were looking for?</Label>
              <RadioGroup
                onValueChange={(value) => {
                  register("foundWhatLookingFor").onChange({ target: { value } });
                }}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="found-yes" />
                  <Label htmlFor="found-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="found-no" />
                  <Label htmlFor="found-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {foundWhatLookingFor === "no" && (
              <div>
                <Label htmlFor="whatWasLookingFor">What were you hoping to find?</Label>
                <Textarea
                  id="whatWasLookingFor"
                  {...register("whatWasLookingFor")}
                  className="mt-1"
                />
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  {...register("termsAccepted", { required: true })}
                  id="terms"
                />
                <Label htmlFor="terms" className="text-sm">
                  By clicking "Submit," you agree to receive emails or phone calls from our team to address your inquiry or feedback.
                </Label>
              </div>
              {errors.termsAccepted && (
                <span className="text-red-500 text-sm block mt-1">
                  You must accept the terms to continue
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
          >
            Previous
          </Button>
        )}
        {currentStep < totalSteps ? (
          <Button
            type="button"
            onClick={nextStep}
            className="ml-auto"
          >
            Next Step
          </Button>
        ) : (
          <Button
            type="submit"
            className="ml-auto"
          >
            Send My Feedback
          </Button>
        )}
      </div>
    </form>
  );
};

export default FeedbackForm;