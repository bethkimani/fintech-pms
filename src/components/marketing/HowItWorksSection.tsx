// components/marketing/HowItWorksSection.tsx
import { ArrowRight } from "lucide-react";

const steps = [
  { step: "01", title: "Create Account", desc: "Sign up in seconds with just your email. No credit card required to get started." },
  { step: "02", title: "Configure Workspace", desc: "Customize your workspace to match your team's unique workflow and requirements." },
  { step: "03", title: "Boost Productivity", desc: "Start using our powerful features to streamline processes and achieve your goals." },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Simple Process, Powerful Results
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started in minutes and see the difference our platform can make for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}