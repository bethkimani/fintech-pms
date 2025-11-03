const faqItems = [
  "How does the 14-day free trial work?",
  "Can I change plans later?",
  "Is there a limit to how many users I can add?",
  "Do you offer discounts for nonprofits or educational institutions?",
  "How secure is my data?",
  "What kind of support do you offer?",
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((question, i) => (
            <details key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="text-gray-900 font-medium cursor-pointer flex justify-between items-center">
                {question}
                <svg className="w-5 h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600 text-sm">
                Our 14-day free trial gives you full access to all features with no commitment. 
                Cancel anytime before the trial ends to avoid charges.
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
