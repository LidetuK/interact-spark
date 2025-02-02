import { useState } from "react";
import FeedbackForm from "@/components/feedback/FeedbackForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-inter font-bold text-center mb-4">
          We'd Love to Hear From You!
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Thank you for visiting our website. Your feedback and inquiries are incredibly valuable to us—they help us improve and better serve you. Whether you have a question, suggestion, or just want to share your thoughts, we're here to listen!
        </p>
        <FeedbackForm />
      </div>
    </div>
  );
};

export default Index;