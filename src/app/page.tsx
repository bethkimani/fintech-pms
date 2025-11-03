import Header from '@/components/marketing/Header';
import HeroSection from '@/components/marketing/HeroSection';
import FeaturesSection from '@/components/marketing/FeaturesSection';
import HowItWorksSection from '@/components/marketing/HowItWorksSection';
import NewsSection from '@/components/marketing/NewsSection';
import FAQSection from '@/components/marketing/FAQSection';
import Footer from '@/components/marketing/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <NewsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
