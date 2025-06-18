
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      
      <main>
        <Hero />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
