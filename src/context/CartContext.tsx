import React, { createContext, useContext, useEffect, useState } from 'react';
import { dbService } from '../services/dbService';
import type { CartItem } from '../types';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const userId = user?.id || 'guest_user';

  useEffect(() => {
    setCartItems(dbService.getCart(userId));
  }, [userId]);

  const addToCart = (productId: string, quantity: number = 1) => {
    const updated = dbService.addToCart(userId, productId, quantity);
    setCartItems(updated);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updated = dbService.updateQuantity(userId, productId, quantity);
    setCartItems(updated);
  };

  const removeFromCart = (productId: string) => {
    const updated = dbService.removeFromCart(userId, productId);
    setCartItems(updated);
  };

  const clearCart = () => {
    dbService.clearCart(userId);
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  // Delivery fee is free over ₹500
  const deliveryFee = subtotal === 0 ? 0 : subtotal > 500 ? 0 : 50;
  const totalAmount = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        deliveryFee,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
