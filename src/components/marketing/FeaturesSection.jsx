import { Zap, BarChart3, Users, Shield, Link2, Headphones } from "lucide-react";

const features = [
  { icon: Zap, title: "Smart Automation", desc: "Automate repetitive tasks and workflows to save time and reduce errors." },
  { icon: BarChart3, title: "Advanced Analytics", desc: "Gain valuable insights with real-time data visualization and reporting." },
  { icon: Users, title: "Team Collaboration", desc: "Work together seamlessly with integrated communication tools." },
  { icon: Shield, title: "Enterprise Security", desc: "Keep your data safe with end-to-end encryption and compliance features." },
  { icon: Link2, title: "Seamless Integration", desc: "Connect with your favorite tools through our extensive API ecosystem." },
  { icon: Headphones, title: "24/7 Support", desc: "Get help whenever you need it with our dedicated support team." },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to streamline your workflow, 
            boost productivity, and achieve your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
