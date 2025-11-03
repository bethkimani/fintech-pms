// components/marketing/Footer.tsx
export default function Footer() {
  const columns = [
    {
      title: "Performance Management System",
      description:
        "Streamline your workflow with our all-in-one SaaS platform. Boost productivity and scale your business.",
      social: true,
    },
    { title: "Product", links: ["Features", "Pricing", "Integrations", "API"] },
    { title: "Resources", links: ["Documentation", "Guides", "Blog", "Support"] },
    { title: "Company", links: ["About", "Careers", "Privacy Policy", "Terms of Service"] },
  ];

  return (
    <footer className="bg-white dark:bg-gray-950 border-t dark:border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {columns.map((col, i) => (
            <div key={i}>
              {col.title === "Performance Management System" ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      PMS
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {col.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{col.description}</p>
                  <div className="flex gap-4 mb-4">
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      {/* SVG icons */}
                    </a>
                    {/* repeat for other icons */}
                  </div>
                </>
              ) : (
                <>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{col.title}</h4>
                  <ul className="space-y-2">
                    {col.links?.map((link, j) => (
                      <li key={j}>
                        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="border-t dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © 2025 Retail Reach. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}