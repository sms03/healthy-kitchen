
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { useCart } from "@/contexts/CartContext";

const Index = () => {
  const { getCartItemsCount } = useCart();

  return (
    <AnimatedPageWrapper className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation cartItemsCount={getCartItemsCount()} onCartClick={() => {}} />
      
      <main>
        <Hero />
      </main>
      
      <Footer />
    </AnimatedPageWrapper>
  );
};

export default Index;
