
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen michelin-gradient">
      <Navigation />
      
      <main>
        <Hero />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
