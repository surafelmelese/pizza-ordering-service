import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const getOrderData = () => {
    const items = cart.map(({ id, quantity, base_price, toppings }) => ({
      pizza_id: id,
      quantity,
      price: parseFloat(base_price),
      toppings: toppings.map((_, index) => index + 1),
    }));
    const total_price = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      orderData: {
        status: "Pending",
        total_price,
        items
      }
    };
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getOrderData }}>
      {children}
    </CartContext.Provider>
  );
};
