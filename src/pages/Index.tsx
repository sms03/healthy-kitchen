
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Cart } from "@/components/Cart";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PersonalRecipes } from "@/components/PersonalRecipes";

const Index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (dish) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => 
          item.id === dish.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems(prev => prev.filter(item => item.id !== dishId));
  };

  const updateQuantity = (dishId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero />
        <About />
        <MenuSection onAddToCart={addToCart} />
        <PersonalRecipes />
        <Contact />
      </main>
      
      <Footer />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Index;
