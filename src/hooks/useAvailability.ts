import { useMemo } from "react";

export interface AvailabilityInfo {
  isAvailableToday: boolean;
  isPreorderOpen: boolean;
  canOrder: boolean;
  status: 'available' | 'preorder' | 'special_order' | 'unavailable';
  message: string;
  priceWithSurcharge?: number;
}

export const useAvailability = (recipe: any): AvailabilityInfo => {
  return useMemo(() => {
    const today = new Date();
    const currentDay = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    // Default availability info
    const defaultInfo: AvailabilityInfo = {
      isAvailableToday: false,
      isPreorderOpen: false,
      canOrder: false,
      status: 'unavailable',
      message: 'Not available',
    };

    if (!recipe || !recipe.available_days) {
      return defaultInfo;
    }

    const availableDays = recipe.available_days || [];
    const isAvailableToday = availableDays.includes(currentDay);
    const preorderOpensOn = recipe.preorder_opens_on;
    const isPreorderOpen = preorderOpensOn === currentDay;
    const requiresPreorder = recipe.requires_preorder;
    const availabilityType = recipe.availability_type || 'daily';
    const specialOrderSurcharge = recipe.special_order_surcharge || 0;

    // Calculate price with surcharge
    const basePrice = typeof recipe.price === 'string' ? parseFloat(recipe.price) : (recipe.price || 0);
    const priceWithSurcharge = basePrice + specialOrderSurcharge;

    // Daily dishes (vegetarian - Monday to Saturday)
    if (availabilityType === 'daily') {
      if (isAvailableToday) {
        return {
          isAvailableToday: true,
          isPreorderOpen: false,
          canOrder: true,
          status: 'available',
          message: 'Available today',
        };
      } else if (currentDay === 'sunday') {
        return {
          isAvailableToday: false,
          isPreorderOpen: false,
          canOrder: false,
          status: 'unavailable',
          message: 'Available Monday to Saturday',
        };
      } else {
        return {
          isAvailableToday: false,
          isPreorderOpen: false,
          canOrder: false,
          status: 'unavailable',
          message: 'Available on weekdays',
        };
      }
    }

    // Weekly special dishes (non-veg - Sunday only with Saturday preorder)
    if (availabilityType === 'weekly_special') {
      if (isAvailableToday && currentDay === 'sunday') {
        return {
          isAvailableToday: true,
          isPreorderOpen: false,
          canOrder: true,
          status: 'available',
          message: 'Available today (Sunday special)',
        };
      } else if (isPreorderOpen && currentDay === 'saturday') {
        return {
          isAvailableToday: false,
          isPreorderOpen: true,
          canOrder: true,
          status: 'preorder',
          message: 'Preorder for tomorrow (Sunday)',
        };
      } else {
        return {
          isAvailableToday: false,
          isPreorderOpen: false,
          canOrder: true,
          status: 'special_order',
          message: `Special order available (+₹${specialOrderSurcharge})`,
          priceWithSurcharge,
        };
      }
    }

    // Preorder only dishes
    if (availabilityType === 'preorder_only') {
      if (requiresPreorder) {
        if (isPreorderOpen) {
          return {
            isAvailableToday: false,
            isPreorderOpen: true,
            canOrder: true,
            status: 'preorder',
            message: `Preorder opens on ${preorderOpensOn}`,
          };
        } else {
          return {
            isAvailableToday: false,
            isPreorderOpen: false,
            canOrder: false,
            status: 'unavailable',
            message: `Preorder opens on ${preorderOpensOn}`,
          };
        }
      }
    }

    return defaultInfo;
  }, [recipe]);
};

export const getAvailabilityBadgeProps = (status: AvailabilityInfo['status']) => {
  switch (status) {
    case 'available':
      return {
        variant: 'default' as const,
        className: 'bg-green-100 text-green-800 hover:bg-green-100',
        icon: '✅'
      };
    case 'preorder':
      return {
        variant: 'secondary' as const,
        className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
        icon: '📅'
      };
    case 'special_order':
      return {
        variant: 'outline' as const,
        className: 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200',
        icon: '⭐'
      };
    case 'unavailable':
    default:
      return {
        variant: 'secondary' as const,
        className: 'bg-gray-100 text-gray-600 hover:bg-gray-100',
        icon: '❌'
      };
  }
};