import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import LoadingScreen from './src/screens/LoadingScreen';
import IntroScreen from './src/screens/IntroScreen';

const App: React.FC = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simulate app initialization tasks
    const initializeApp = async () => {
      try {
        // Add any initialization logic here:
        // - Load fonts
        // - Check authentication
        // - Load cached data
        // - etc.
        
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        setIsAppReady(true);
      } catch (error) {
        console.error('App initialization failed:', error);
        setIsAppReady(true); // Still proceed to main app
      }
    };

    initializeApp();
  }, []);

  // Show loading screen while app is initializing
  if (!isAppReady) {
    return <LoadingScreen />;
  }

  // Show main app once ready
  return <IntroScreen />;
};

export default App;
