import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import LoadingScreen from './src/screens/LoadingScreen';
import IntroScreen from './src/screens/IntroScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Custom floating tab bar
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {/* Home Tab */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text
            style={[
              styles.tabText,
              state.index === 0 ? styles.focusedText : styles.unfocusedText,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Center + Button */}
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => {
            // Trigger create/remix modal/process here if desired
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text
            style={[
              styles.tabText,
              state.index === 1 ? styles.focusedText : styles.unfocusedText,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Navigation component
function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Tab.Screen name="Home" component={IntroScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const App: React.FC = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsAppReady(true);
    };
    initializeApp();
  }, []);

  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return <AppNavigator />;
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 60,
    paddingBottom: 54, // Account for home indicator on iPhone
    paddingTop: 20,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white
    backdropFilter: 'blur(20px)', // iOS blur effect
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 9 
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10, // Android shadow
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  focusedText: {
    color: '#000',
  },
  unfocusedText: {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 28,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 4 
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  plusText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '300',
  },
});

export default App;
