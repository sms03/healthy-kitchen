
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (dish: any) => void;
  removeFromCart: (dishId: number) => void;
  updateQuantity: (dishId: number, quantity: number) => void;
  getCartItemsCount: () => number;
  getCartTotal: () => number;
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

  const addToCart = (dish: any) => {
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
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId: number) => {
    setItems(prev => {
      const item = prev.find(item => item.id === dishId);
      if (item) {
        toast({
          title: "Removed from Cart",
          description: `${item.name} has been removed from your cart`,
        });
      }
      return prev.filter(item => item.id !== dishId);
    });
  };

  const updateQuantity = (dishId: number, quantity: number) => {
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
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartItemsCount,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
