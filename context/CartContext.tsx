"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import { products } from "@/data/products";
import type { CartItem } from "@/types/product";

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: CartItem["size"]) => void;
  updateQuantity: (
    productId: string,
    size: CartItem["size"],
    quantity: number
  ) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "black-sky-labs-cart";
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setItems(JSON.parse(stored) as CartItem[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  function addItem(item: CartItem) {
    setItems((current) => {
      const existing = current.find(
        (entry) =>
          entry.productId === item.productId && entry.size === item.size
      );

      if (!existing) {
        return [...current, item];
      }

      return current.map((entry) =>
        entry.productId === item.productId && entry.size === item.size
          ? { ...entry, quantity: entry.quantity + item.quantity }
          : entry
      );
    });

    setIsOpen(true);
  }

  function removeItem(productId: string, size: CartItem["size"]) {
    setItems((current) =>
      current.filter(
        (entry) => !(entry.productId === productId && entry.size === size)
      )
    );
  }

  function updateQuantity(
    productId: string,
    size: CartItem["size"],
    quantity: number
  ) {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }

    setItems((current) =>
      current.map((entry) =>
        entry.productId === productId && entry.size === size
          ? { ...entry, quantity }
          : entry
      )
    );
  }

  function clearCart() {
    setItems([]);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  const value = {
    items,
    isOpen,
    itemCount,
    subtotal,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
