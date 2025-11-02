import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextType {
  userId: string | null;
  setUserId: (id: string) => Promise<void>;
  clearUserId: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserIdState] = useState<string | null>(null);

  useEffect(() => {
    loadUserId();
  }, []);

  const loadUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('user_id');
      if (id) setUserIdState(id);
    } catch (error) {
      console.error('Error loading user ID:', error);
    }
  };

  const setUserId = async (id: string) => {
    try {
      await AsyncStorage.setItem('user_id', id);
      setUserIdState(id);
    } catch (error) {
      console.error('Error saving user ID:', error);
    }
  };

  const clearUserId = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      setUserIdState(null);
    } catch (error) {
      console.error('Error clearing user ID:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, clearUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};