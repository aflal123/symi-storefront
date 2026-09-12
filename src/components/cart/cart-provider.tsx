"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, type Product } from "@/lib/site";

type Line = { product: Product; qty: number };

type CartValue = {
  lines: Line[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: Product) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
};

const CartContext = createContext<CartValue | null>(null);

const seed = () => {
  const map: Record<number, number> = {};
  for (const p of PRODUCTS) if (p.seedCart) map[p.id] = 1;
  return map;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [bag, setBag] = useState<Record<number, number>>(seed);
  const [open, setOpen] = useState(false);

  const add = useCallback((product: Product) => {
    setBag((b) => ({ ...b, [product.id]: (b[product.id] ?? 0) + 1 }));
    setOpen(true);
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    setBag((b) => {
      if (qty <= 0) {
        const next = { ...b };
        delete next[id];
        return next;
      }
      return { ...b, [id]: qty };
    });
  }, []);

  const remove = useCallback((id: number) => {
    setBag((b) => {
      const next = { ...b };
      delete next[id];
      return next;
    });
  }, []);

  const value = useMemo<CartValue>(() => {
    const lines: Line[] = Object.entries(bag)
      .map(([id, qty]) => ({
        product: PRODUCTS.find((p) => p.id === Number(id))!,
        qty,
      }))
      .filter((l) => l.product && l.qty > 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    return { lines, count, subtotal, open, setOpen, add, setQty, remove };
  }, [bag, open, add, setQty, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
