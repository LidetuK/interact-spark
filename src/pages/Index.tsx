import { useState } from "react";
import FeedbackForm from "@/components/feedback/FeedbackForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-inter font-bold text-center mb-4">
          We'd Love to Hear From You!
        </h1>
        <FeedbackForm />
      </div>
    </div>
  );
};

export default Index;