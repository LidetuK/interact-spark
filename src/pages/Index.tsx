import { useState } from "react";
import FeedbackForm from "@/components/feedback/FeedbackForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <FeedbackForm />
      </div>
    </div>
  );
};

export default Index;