
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCartPersistence = () => {
  const { user } = useAuth();
  const { items, setItems } = useCart();
  const { toast } = useToast();

  // Load cart from database when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromDatabase();
    }
  }, [user]);

  // Save cart to database when items change (and user is logged in)
  useEffect(() => {
    if (user && items.length > 0) {
      saveCartToDatabase();
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
        ?.filter(item => item.recipes && item.recipes.id) // Filter out invalid items
        ?.map(item => {
          const recipeId = parseInt(item.recipes.id);
          if (isNaN(recipeId)) return null; // Skip invalid IDs
          
          return {
            id: recipeId,
            name: item.recipes.name || 'Unknown Item',
            price: item.recipes.price || 0,
            quantity: item.quantity || 1,
            image: item.recipes.image_url || '🍽️'
          };
        })
        ?.filter(Boolean) || []; // Remove null items

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
      item.id > 0
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

      // Then insert current valid cart items
      const cartData = validItems.map(item => ({
        user_id: user.id,
        recipe_id: item.id.toString(),
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
