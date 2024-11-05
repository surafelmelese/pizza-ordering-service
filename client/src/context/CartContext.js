import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  console.log("Cart data", cart)

  const addToCart = (item) => {
    setCart((prevCart) => {
      if (prevCart.length === 0) {
        setRestaurantId(item.restaurant_id);
      }

      if (restaurantId && restaurantId !== item.restaurant_id) {
        alert("You can only order from one restaurant at a time.");
        return prevCart;
      }

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
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== itemId);
      
      if (updatedCart.length === 0) {
        setRestaurantId(null);
      }
      
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setRestaurantId(null);
  };

  const updateItemQuantity = (itemId, amount) => {
    setCart((prevCart) => 
      prevCart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity + amount } 
          : item
      ).filter(item => item.quantity > 0) 
    );
  };

    const updateToppings = (pizzaId, topping, isChecked) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === pizzaId) {
          const updatedToppings = isChecked 
            ? [...item.toppings, topping] 
            : item.toppings.filter(t => t !== topping);

          return { ...item, toppings: updatedToppings };
        }
        return item;
      })
    );
  };

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
        restaurant_id: restaurantId,
        items
      }
    };
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateItemQuantity, getOrderData, updateToppings }}>
      {children}
    </CartContext.Provider>
  );
};

