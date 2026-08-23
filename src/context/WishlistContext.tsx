import React, { createContext, useContext, useEffect, useState } from 'react';
import { dbService } from '../services/dbService';
import type { WishlistItem } from '../types';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const userId = user?.id || 'guest_user';

  useEffect(() => {
    setWishlistItems(dbService.getWishlist(userId));
  }, [userId]);

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((w) => w.product_id === productId);
  };

  const toggleWishlist = (productId: string): boolean => {
    const isAdded = dbService.toggleWishlist(userId, productId);
    setWishlistItems(dbService.getWishlist(userId));
    return isAdded;
  };

  const removeFromWishlist = (productId: string) => {
    dbService.toggleWishlist(userId, productId);
    setWishlistItems(dbService.getWishlist(userId));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
