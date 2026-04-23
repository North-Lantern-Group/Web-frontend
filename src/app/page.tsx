import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyNorthLantern from "@/components/sections/WhyNorthLantern";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const isDarkMode = true;

  return (
    <div className="min-h-screen font-sans transition-colors duration-500 dark bg-neutral-950">
      <ScrollReveal />
      <Header isDarkMode={isDarkMode} />
      <Hero isDarkMode={isDarkMode} />

      <About />
      <Services isDarkMode={isDarkMode} />
      <WhyNorthLantern />
      <Pricing />
      <Contact isDarkMode={isDarkMode} />
      <Footer />
    </div>
  );
}
