
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import TrustedCompanies from "@/components/landing/TrustedCompanies";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustedCompanies />
      <Features />
      <HowItWorks />
    </main>
  );
}
