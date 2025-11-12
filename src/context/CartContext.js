import React, { createContext, useState, useEffect, useContext } from 'react';
import { storage } from '../utils/storage';
import { Alert } from 'react-native';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadCart();
    loadOrders();
  }, []);

  const loadCart = async () => {
    const savedCart = await storage.getItem('cart');
    if (savedCart) {
      setCartItems(savedCart);
    }
  };

  const loadOrders = async () => {
    const savedOrders = await storage.getItem('orders');
    if (savedOrders) {
      setOrders(savedOrders);
    }
  };

  const addToCart = async (item) => {
    const existingItem = cartItems.find(i => i.id === item.id);
    
    let newCart;
    if (existingItem) {
      newCart = cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newCart = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(newCart);
    await storage.setItem('cart', newCart);
    Alert.alert('Success', `${item.name} added to cart!`);
  };

  const removeFromCart = async (itemId) => {
    const newCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCart);
    await storage.setItem('cart', newCart);
  };

  const updateQuantity = async (itemId, change) => {
    const newCart = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(newCart);
    await storage.setItem('cart', newCart);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty!');
      return false;
    }

    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      total: getCartTotal(),
      date: new Date().toISOString(),
      status: 'Pending'
    };

    const newOrders = [newOrder, ...orders];
    setOrders(newOrders);
    await storage.setItem('orders', newOrders);

    setCartItems([]);
    await storage.setItem('cart', []);

    Alert.alert('Success! 🎉', 'Your order has been placed successfully!');
    return true;
  };

  const clearCart = async () => {
    setCartItems([]);
    await storage.setItem('cart', []);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartCount,
      placeOrder,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};