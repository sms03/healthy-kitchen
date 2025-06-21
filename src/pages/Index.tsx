
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MenuSection } from "@/components/MenuSection";

const Index = () => {
  return (
    <div className="min-h-screen michelin-gradient">
      <Navigation />
      
      <main>
        <Hero />
        <MenuSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
