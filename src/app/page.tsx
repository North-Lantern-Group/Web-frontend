import Header from "@/components/layout/Header";
import HeroV2 from "@/components/sections/HeroV2";
import TrustStrip from "@/components/sections/TrustStrip";
import Belief from "@/components/sections/Belief";
import Practices from "@/components/sections/Practices";
import HowWeWork from "@/components/sections/HowWeWork";
import Writing from "@/components/sections/Writing";
import BuyerQualifier from "@/components/sections/BuyerQualifier";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-nlg-bg-0">
      <ScrollReveal />
      <Header />
      <main>
        <HeroV2 />
        <TrustStrip />
        <Belief />
        <Practices />
        <HowWeWork />
        <Writing />
        <BuyerQualifier />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
