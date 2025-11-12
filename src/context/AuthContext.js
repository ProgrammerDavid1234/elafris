import React, { createContext, useState, useEffect, useContext } from 'react';
import { storage } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await storage.getItem('user');
      const onboardingStatus = await storage.getItem('hasSeenOnboarding');
      
      setUser(userData);
      setHasSeenOnboarding(onboardingStatus || false);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Simulate login - in real app, call API
    const userData = await storage.getItem('users') || {};
    const user = Object.values(userData).find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      await storage.setItem('user', userWithoutPassword);
      setUser(userWithoutPassword);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = async (name, email, password) => {
    // Simulate signup - in real app, call API
    const users = await storage.getItem('users') || {};
    
    if (Object.values(users).some(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f97316&color=fff`
    };

    users[newUser.id] = { ...newUser, password };
    await storage.setItem('users', users);
    await storage.setItem('user', newUser);
    setUser(newUser);
    return { success: true };
  };

  const logout = async () => {
    await storage.removeItem('user');
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const updatedUser = { ...user, ...updates };
    await storage.setItem('user', updatedUser);
    setUser(updatedUser);
  };

  const completeOnboarding = async () => {
    await storage.setItem('hasSeenOnboarding', true);
    setHasSeenOnboarding(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      hasSeenOnboarding,
      login,
      signup,
      logout,
      updateProfile,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};