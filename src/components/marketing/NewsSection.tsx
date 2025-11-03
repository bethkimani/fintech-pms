// components/marketing/NewsSection.tsx
import { ArrowRight } from "lucide-react";

const newsItems = [
  { type: "Product", title: "Introducing Automation Recipes", desc: "Kickstart your workflows with out-of-the-box automation templates designed for speed.", date: "Aug 1, 2025", image: "/image1.jpg" },
  { type: "Tutorial", title: "From Zero to Dashboard in 10 Minutes", desc: "A step-by-step guide to set up your first workspace and insights dashboard.", date: "Jul 24, 2025", image: "/image2.jpg" },
  { type: "Company", title: "Why We Built PMS", desc: "The story behind our mission to streamline workflows for modern teams.", date: "Jul 12, 2025", image: "/image3.jpg" },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4">
            News
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Latest Updates & Stories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Product updates, tutorials, and insights from the team building Retail Reach.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((post, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="w-full h-48 bg-cover bg-center rounded-t-2xl"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <div className="p-6">
                <span className="text-xs font-medium text-primary">{post.type}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-1">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{post.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                  <a href="#" className="text-sm font-medium text-primary hover:text-blue-700 flex items-center gap-1">
                    Read more <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}