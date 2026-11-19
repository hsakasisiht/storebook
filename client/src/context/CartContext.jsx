import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  fetchCart,
  addCartItem,
  updateCartQty,
  removeCartItem,
  clearCartItems,
} from '../services/cartService';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('pandora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync with backend if authenticated
  useEffect(() => {
    const syncBackendCart = async () => {
      if (isAuthenticated) {
        setLoading(true);
        try {
          const res = await fetchCart();
          if (res.success && Array.isArray(res.items)) {
            // Normalize backend items format: item.bookId holds book object
            const normalized = res.items.map((i) => ({
              bookId: i.bookId?._id || i.bookId,
              book: i.bookId || {},
              quantity: i.quantity,
            }));
            setItems(normalized);
          }
        } catch (err) {
          console.warn('Could not sync cart with backend:', err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    syncBackendCart();
  }, [isAuthenticated]);

  // Persist to localStorage for offline / guest browsing
  useEffect(() => {
    localStorage.setItem('pandora_cart', JSON.stringify(items));
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const subtotal = items.reduce((sum, item) => {
    const price = item.book?.price || item.price || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const addToCart = async (book, quantity = 1) => {
    const targetBookId = book._id || book.id;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    // Update local state immediately for fast feedback
    setItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (i) => (i.book?._id || i.bookId) === targetBookId
      );

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + qty,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            bookId: targetBookId,
            book,
            quantity: qty,
          },
        ];
      }
    });

    // If authenticated, sync with backend
    if (isAuthenticated) {
      try {
        await addCartItem(targetBookId, qty);
      } catch (err) {
        console.warn('Backend cart add error:', err.message);
      }
    }
  };

  const removeFromCart = async (bookId) => {
    setItems((prevItems) =>
      prevItems.filter((i) => (i.book?._id || i.bookId) !== bookId)
    );

    if (isAuthenticated) {
      try {
        await removeCartItem(bookId);
      } catch (err) {
        console.warn('Backend cart remove error:', err.message);
      }
    }
  };

  const updateQuantity = async (bookId, quantity) => {
    const qty = parseInt(quantity, 10);
    if (qty <= 0) {
      removeFromCart(bookId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if ((item.book?._id || item.bookId) === bookId) {
          return { ...item, quantity: qty };
        }
        return item;
      })
    );

    if (isAuthenticated) {
      try {
        await updateCartQty(bookId, qty);
      } catch (err) {
        console.warn('Backend cart update error:', err.message);
      }
    }
  };

  const clearCart = async () => {
    setItems([]);
    localStorage.removeItem('pandora_cart');

    if (isAuthenticated) {
      try {
        await clearCartItems();
      } catch (err) {
        console.warn('Backend cart clear error:', err.message);
      }
    }
  };

  const value = {
    items,
    totalItems,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
