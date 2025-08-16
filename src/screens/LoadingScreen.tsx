import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import your logo
import LogoWhite from '../assets/logo.png';

const { width, height } = Dimensions.get('window');

const LoadingScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation for custom spinner
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();

    // Cleanup
    return () => rotateAnimation.stop();
  }, [fadeAnim, scaleAnim, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.content}>
        {/* Logo with animation */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image source={LogoWhite} style={styles.logo} resizeMode="contain" />
        </Animated.View>

        {/* Custom loading spinner */}
        <View style={styles.loadingContainer}>
          <Animated.View
            style={[
              styles.customSpinner,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <View style={styles.spinnerDot} />
            <View style={[styles.spinnerDot, styles.spinnerDot2]} />
            <View style={[styles.spinnerDot, styles.spinnerDot3]} />
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 160,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  customSpinner: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  spinnerDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
    top: 0,
    left: 16,
  },
  spinnerDot2: {
    transform: [{ rotate: '120deg' }],
    transformOrigin: '4px 20px',
  },
  spinnerDot3: {
    transform: [{ rotate: '240deg' }],
    transformOrigin: '4px 20px',
  },
});

export default LoadingScreen;
