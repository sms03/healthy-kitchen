
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface CartItem {
  id: number;
  originalId?: string; // Add originalId to interface for database operations
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (dish: any) => void;
  removeFromCart: (dishId: number) => void;
  updateQuantity: (dishId: number, quantity: number) => void;
  getCartItemsCount: () => number;
  getCartTotal: () => number;
  clearCart: (silent?: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const addToCart = (dish: any) => {
    // Check if user is authenticated
    if (!user) {
      // Only show toast if user actually tried to add something to cart
      // Don't show on page load or tab switches
      toast({
        title: "Sign In Required",
        description: "Please sign in to add items to your cart",
        variant: "destructive"
      });
      return;
    }

    // Validate dish has valid ID
    if (!dish || typeof dish.id !== 'number' || isNaN(dish.id)) {
      console.error('Invalid dish data:', dish);
      toast({
        title: "Error",
        description: "Invalid item data",
        variant: "destructive"
      });
      return;
    }

    setItems(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        const newQuantity = existing.quantity + 1;
        toast({
          title: "Updated Cart",
          description: `${dish.name} quantity increased to ${newQuantity}`,
        });
        return prev.map(item => 
          item.id === dish.id 
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      toast({
        title: "Added to Cart",
        description: `${dish.name} has been added to your cart`,
      });
      return [...prev, { 
        id: dish.id,
        originalId: dish.originalId, // Include originalId when adding to cart
        name: dish.name || 'Unknown Item',
        price: dish.price || 0,
        quantity: 1,
        image: dish.image || '🍽️'
      }];
    });
  };

  const removeFromCart = (dishId: number) => {
    // Validate dishId
    if (typeof dishId !== 'number' || isNaN(dishId)) {
      console.error('Invalid dish ID:', dishId);
      return;
    }

    setItems(prev => {
      const item = prev.find(item => item.id === dishId);
      if (item) {
        toast({
          title: "Removed from Cart",
          description: `${item.name} has been removed from your cart`,
        });
      }
      // Fix: filter OUT the item with matching ID
      return prev.filter(item => item.id !== dishId);
    });
  };

  const updateQuantity = (dishId: number, quantity: number) => {
    // Validate inputs
    if (typeof dishId !== 'number' || isNaN(dishId) || typeof quantity !== 'number' || isNaN(quantity)) {
      console.error('Invalid update quantity params:', { dishId, quantity });
      return;
    }

    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    
    setItems(prev => {
      const item = prev.find(item => item.id === dishId);
      if (item) {
        toast({
          title: "Cart Updated",
          description: `${item.name} quantity updated to ${quantity}`,
        });
      }
      return prev.map(item => 
        item.id === dishId ? { ...item, quantity } : item
      );
    });
  };

  const getCartItemsCount = () => {
    return items
      .filter(item => typeof item.quantity === 'number' && !isNaN(item.quantity))
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return items
      .filter(item => 
        typeof item.price === 'number' && !isNaN(item.price) &&
        typeof item.quantity === 'number' && !isNaN(item.quantity)
      )
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const clearCart = (silent = false) => {
    setItems([]);
    if (!silent) {
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart",
      });
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      setItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartItemsCount,
      getCartTotal,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

