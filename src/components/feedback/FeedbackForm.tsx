import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProgressIndicator from "@/components/ProgressIndicator";
import { toast } from "sonner";
import useWeb3Forms from "@web3forms/react";

interface FeedbackFormData {
  feedbackType: string[];
  otherFeedbackType?: string;
  name: string;
  email: string;
  countryCode: string;
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

const COUNTRY_CODES = [
  { label: "United States", value: "+1" },
  { label: "United Kingdom", value: "+44" },
  { label: "Canada", value: "+1" },
  // Add more country codes as needed
];

const HOW_HEARD_OPTIONS = [
  "Search Engine (e.g., Google)",
  "Social Media",
  "Friend/Family Referral",
  "Email Newsletter",
  "Podcast/Video",
  "Other"
];

const FeedbackForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FeedbackFormData>({
    defaultValues: {
      countryCode: "+1"
    }
  });

  const { submit: submitWeb3Form } = useWeb3Forms({
    access_key: 'e9a29034-a6e8-4712-bc82-96088b656675',
    settings: {
      from_name: 'Feedback Form',
      subject: 'New Feedback Submission',
    },
    onSuccess: (successMessage, data) => {
      setIsSubmitted(true);
      toast.success("Thank you for your feedback! We appreciate your input and will review it carefully.");
    },
    onError: (errorMessage, data) => {
      toast.error("There was an error submitting your feedback. Please try again.");
    }
  });

  const satisfaction = watch("satisfaction");
  const foundWhatLookingFor = watch("foundWhatLookingFor");
  const followUp = watch("followUp");
  const feedbackType = watch("feedbackType");

  const onSubmit = async (data: FeedbackFormData) => {
    if (currentStep === totalSteps) {
      try {
        await submitWeb3Form({
          ...data,
          redirect_to: "mailto:thee.lifeguide+inquiryfeedback@gmail.com"
        });
      } catch (error) {
        toast.error("There was an error submitting your feedback. Please try again.");
      }
    } else {
      nextStep();
    }
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

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-green-600">Thank You!</h2>
        <p className="text-gray-600">
          Your feedback has been submitted successfully. We appreciate your time and input!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Thank you for visiting our website. Your feedback and inquiries are incredibly valuable to us—they help us improve and better serve you. Whether you have a question, suggestion, or just want to share your thoughts, we're here to listen!
            </p>
          </div>
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
              <Label>Your Phone Number (Optional)</Label>
              <div className="flex gap-2">
                <Select
                  onValueChange={(value) => {
                    register("countryCode").onChange({ target: { value } });
                  }}
                  defaultValue="+1"
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Country Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_CODES.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        {code.label} ({code.value})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="flex-1"
                  placeholder="Phone number"
                />
              </div>
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

            <div>
              <Label>Would you like someone from our team to follow up with you?</Label>
              <RadioGroup
                onValueChange={(value) => {
                  register("followUp").onChange({ target: { value } });
                }}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="followup-yes" />
                  <Label htmlFor="followup-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="followup-no" />
                  <Label htmlFor="followup-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {followUp === "yes" && (
              <div>
                <Label htmlFor="bestTimeToReach">When is the best time to reach you?</Label>
                <Input
                  type="time"
                  id="bestTimeToReach"
                  {...register("bestTimeToReach")}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label>How did you hear about us? (Optional)</Label>
              <RadioGroup
                onValueChange={(value) => {
                  register("howHeardAboutUs").onChange({ target: { value } });
                }}
                className="mt-2"
              >
                {HOW_HEARD_OPTIONS.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`heard-${option}`} />
                    <Label htmlFor={`heard-${option}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {watch("howHeardAboutUs") === "Other" && (
              <div>
                <Label htmlFor="otherHowHeardAboutUs">Please specify:</Label>
                <Input
                  id="otherHowHeardAboutUs"
                  {...register("otherHowHeardAboutUs")}
                  className="mt-1"
                />
              </div>
            )}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Terms and Conditions</h3>
              <p className="text-sm text-gray-600 mb-4">
                By clicking "Submit," you agree to the following:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>You consent to receive emails or phone calls from Resk'Que's team to address your inquiry or feedback.</li>
                <li>For more information, please review our <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  {...register("termsAccepted", { required: true })}
                  id="terms"
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms and Conditions
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
