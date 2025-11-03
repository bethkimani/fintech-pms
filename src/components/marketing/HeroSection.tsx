// src/components/marketing/HeroSection.tsx
// FIXED: Changed "Login" to Link for redirect to /login. Removed modal state/render.

"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function HeroSection(): JSX.Element {
  const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg", "/image4.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white dark:bg-gray-800 shadow-lg overflow-hidden rounded-2xl">
          <div className="absolute left-0 right-0 top-0 h-2 bg-gray-200 dark:bg-gray-700" />

          <div className="relative p-8 md:p-12">
            <div
              className="absolute left-0 top-0 w-2 bg-gray-200 dark:bg-gray-700"
              style={{
                height: `calc(100% - 100%)`,
                transition: "height 0.1s",
              }}
              id="left-border"
            />

            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium">
                <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
                Launching Soon
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight text-center">
              Elevate Your Workflow with
              <br />
              <span className="text-primary">Performance Management</span>
              <br />
              System
            </h1>

            <p
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed text-center"
              id="description-end"
            >
              The all-in-one platform that helps teams collaborate, automate, and deliver exceptional results.
              Streamline your processes and focus on what matters most.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white text-lg font-medium py-4 px-8 rounded-full shadow-sm transition-colors"
              >
                Get Started
                <ArrowRight className="ml-1 w-5 h-5" />
              </button>

              {/* FIXED: Changed to Link for redirect to /login */}
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 border border-primary text-primary hover:bg-blue-50 dark:hover:bg-gray-700 text-lg font-medium py-4 px-8 rounded-full bg-transparent transition-colors"
              >
                Login
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-10">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" /> No credit card
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" /> 14-day trial
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" /> Cancel anytime
              </span>
            </div>
          </div>

          <div className="relative w-full px-8 pb-8">
            <div className="relative w-full aspect-[5/3] rounded-2xl overflow-hidden shadow-inner border-8 border-gray-200 dark:border-gray-700 bg-gray-300 dark:bg-gray-800">
              <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
                style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
              />

              <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                  isTransitioning ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: `url(${images[(currentImageIndex + 1) % images.length]})` }}
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentImageIndex(index);
                        setIsTransitioning(false);
                      }, 500);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white dark:bg-gray-300 w-8"
                        : "bg-white/50 dark:bg-gray-500/50 w-2 hover:bg-white/75 dark:hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <script
            dangerouslySetInnerHTML={{
              __html: `
              const updateBorder = () => {
                const desc = document.getElementById('description-end');
                const border = document.getElementById('left-border');
                if (desc && border) {
                  const rect = desc.getBoundingClientRect();
                  const parentRect = border.parentElement.getBoundingClientRect();
                  const height = rect.bottom - parentRect.top + 16;
                  border.style.height = height + 'px';
                }
              };
              updateBorder();
              window.addEventListener('resize', updateBorder);
            `,
            }}
          />
        </div>
      </div>
    </section>
  );
}