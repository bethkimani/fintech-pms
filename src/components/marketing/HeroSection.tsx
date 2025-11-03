import { Button } from "@mui/material";
import { ArrowRight, Check } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Launch Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-6">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          Launching Soon
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Elevate Your Workflow with<br />
          <span className="text-blue-600">Performance Management</span> System
        </h1>

        {/* Hero Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          The all-in-one platform that helps teams collaborate, automate, and deliver exceptional results. 
          Streamline your processes and focus on what matters most.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button variant="contained" size="large" className="bg-blue-600 hover:bg-blue-700 text-lg py-3 px-8">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outlined" size="large" className="text-lg py-3 px-8">
            Login
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600" /> No credit card</span>
          <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600" /> 14-day trial</span>
          <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600" /> Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}