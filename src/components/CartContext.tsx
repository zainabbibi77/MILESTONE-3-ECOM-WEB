// CartContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define Product type
interface Product {
  id: string; // Assuming `id` is a string (adjust if it’s number)
  name: string;
  price: number;
  quantity: number;
}

// Define the CartContextType
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props type for CartProvider
interface CartProviderProps {
  children: ReactNode; // children prop is required in the provider
}

// CartProvider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const incrementQuantity = (productId: string) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    
    setCart(updatedCart);
  };


  const decrementQuantity = (productId: string) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
        : item
    );
    
    const filteredCart= updatedCart.filter((item) => item.quantity >0)
    setCart(filteredCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use Cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};