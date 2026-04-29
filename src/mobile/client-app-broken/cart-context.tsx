// client-app/cart-context.tsx

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { OrderItem } from './app/models/orderItem';

type CartContextType = {
  items: OrderItem[];
  addItem: (item: Omit<OrderItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = useCallback((item: Omit<OrderItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(x => x.id === item.id);

      if (existing) {
        return prev.map(x =>
          x.id === item.id
            ? { ...x, quantity: x.quantity + 1 }
            : x
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev =>
      prev
        .map(x =>
          x.id === id ? { ...x, quantity: x.quantity - 1 } : x
        )
        .filter(x => x.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.unit_price * item.quantity,
        0
      ),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}