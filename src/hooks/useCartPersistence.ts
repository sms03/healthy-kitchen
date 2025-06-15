
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCartPersistence = () => {
  const { user } = useAuth();
  const { items, setItems, clearCart } = useCart();
  const { toast } = useToast();

  // Load cart from database when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromDatabase();
    } else {
      // Clear cart silently when user signs out to avoid showing toast
      clearCart(true);
    }
  }, [user]);

  // Save cart to database when items change (and user is logged in)
  useEffect(() => {
    if (user && items.length > 0) {
      saveCartToDatabase();
    } else if (user && items.length === 0) {
      // Clear cart from database when cart is empty
      clearCartFromDatabase();
    }
  }, [items, user]);

  const loadCartFromDatabase = async () => {
    if (!user) return;

    try {
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          recipes:recipe_id (
            id,
            name,
            price,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedItems = cartItems
        ?.filter(item => item.recipes && item.recipes.id)
        ?.map(item => {
          // Create a hash from the UUID string to get a consistent numeric ID
          const stringToHash = (str: string) => {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
              const char = str.charCodeAt(i);
              hash = ((hash << 5) - hash) + char;
              hash = hash & hash;
            }
            return Math.abs(hash);
          };

          const numericId = stringToHash(item.recipes.id);
          
          return {
            id: numericId,
            originalId: item.recipes.id, // Keep original UUID
            name: item.recipes.name || 'Unknown Item',
            price: typeof item.recipes.price === 'string' ? parseFloat(item.recipes.price) : (item.recipes.price || 0),
            quantity: item.quantity || 1,
            image: item.recipes.image_url || '🍽️'
          };
        })
        ?.filter(Boolean) || [];

      // Update cart context with loaded items
      if (formattedItems.length > 0) {
        setItems(formattedItems);
      }
    } catch (error: any) {
      console.error('Error loading cart:', error);
      toast({
        title: "Cart Load Error",
        description: "Failed to load your saved cart items",
        variant: "destructive"
      });
    }
  };

  const saveCartToDatabase = async () => {
    if (!user || items.length === 0) return;

    // Filter out items with invalid IDs before saving
    const validItems = items.filter(item => 
      typeof item.id === 'number' && 
      !isNaN(item.id) && 
      item.id > 0 &&
      item.originalId // Must have original UUID
    );

    if (validItems.length === 0) {
      console.warn('No valid items to save to cart');
      return;
    }

    try {
      // First, clear existing cart items
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      // Then insert current valid cart items using original UUID
      const cartData = validItems.map(item => ({
        user_id: user.id,
        recipe_id: item.originalId, // Use original UUID for database
        quantity: item.quantity
      }));

      const { error } = await supabase
        .from('cart_items')
        .insert(cartData);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error saving cart:', error);
      // Don't show toast for save errors to avoid annoying users
    }
  };

  const clearCartFromDatabase = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error clearing cart:', error);
    }
  };

  return {
    loadCartFromDatabase,
    saveCartToDatabase,
    clearCartFromDatabase
  };
};
