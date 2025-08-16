import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// logo
import LogoWhite from '../assets/logo.png';

const { width } = Dimensions.get('window');

interface Product {
  id: number;
  brand: string;
  price: string;
  image: string;
  category: string;
}

// ────────────────────────────────────────────────────────────

const IntroScreen: React.FC = () => {
  /* ------------------------------------------------------------------ */
  /*  Data                                                               */
  /* ------------------------------------------------------------------ */
  // hero products (will scroll horizontally)
  const heroProducts: Product[] = [
    { id: 1, brand: 'Featured', price: '$2 299', image: '', category: 'jacket' },
    { id: 2, brand: 'Premium',  price: '$1 899', image: '', category: 'coat'   },
    { id: 3, brand: 'Limited',  price: '$3 499', image: '', category: 'blazer' },
  ];

  const topProducts: Product[] = [
    { id: 1, brand: 'Comme des Garçons', price: '$1,645', image: '', category: 'jacket' },
    { id: 2, brand: 'sacai',             price: '$445',   image: '', category: 'tshirt' },
    { id: 3, brand: 'sacai',             price: '$374',   image: '', category: 'tshirt' },
  ];

  const bottomProducts: Product[] = [
    { id: 4, brand: 'Brand', price: '$XXX', image: '', category: 'pants' },
    { id: 5, brand: 'Brand', price: '$XXX', image: '', category: 'jeans' },
    { id: 6, brand: 'Brand', price: '$XXX', image: '', category: 'pants' },
  ];

  /* ------------------------------------------------------------------ */
  /*  Render helpers                                                     */
  /* ------------------------------------------------------------------ */
  const renderHeroCard = (p: Product) => (
    <TouchableOpacity key={p.id} style={styles.heroCard}>
      <View style={styles.heroImage}>
        {p.image ? (
          <Image source={{ uri: p.image }} style={styles.heroImgReal} />
        ) : (
          <Text style={styles.heroEmoji}>{getEmoji(p.category)}</Text>
        )}
      </View>
      <Text style={styles.heroBrand}>{p.brand}</Text>
      <Text style={styles.heroPrice}>{p.price}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = (p: Product) => (
    <TouchableOpacity key={p.id} style={styles.productCard}>
      <View style={styles.productImageContainer}>
        {p.image ? (
          <Image source={{ uri: p.image }} style={styles.productImage} />
        ) : (
          <View style={[styles.productPlaceholder, getPlaceholderStyle(p.category)]}>
            <Text style={styles.placeholderEmoji}>{getEmoji(p.category)}</Text>
          </View>
        )}
      </View>
      <Text style={styles.brandName}>{p.brand}</Text>
      <Text style={styles.productPrice}>{p.price}</Text>
    </TouchableOpacity>
  );

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                            */
  /* ------------------------------------------------------------------ */
  const getPlaceholderStyle = (c: string) => {
    switch (c) {
      case 'jacket': return { backgroundColor: '#2C3E50' };
      case 'tshirt': return { backgroundColor: '#34495E' };
      case 'pants':  return { backgroundColor: '#7F8C8D' };
      case 'jeans':  return { backgroundColor: '#5DADE2' };
      case 'coat':   return { backgroundColor: '#8E44AD' };
      case 'blazer': return { backgroundColor: '#E67E22' };
      default:       return { backgroundColor: '#BDC3C7' };
    }
  };

  const getEmoji = (c: string) => {
    switch (c) {
      case 'jacket': return '🧥';
      case 'tshirt': return '👕';
      case 'pants':  return '👖';
      case 'jeans':  return '👖';
      case 'coat':   return '🧥';
      case 'blazer': return '👔';
      default:       return '👔';
    }
  };

  /* ------------------------------------------------------------------ */
  /*  JSX                                                                */
  /* ------------------------------------------------------------------ */
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* ─── Header ─────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Image source={LogoWhite} style={styles.logo} resizeMode="contain" />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}><Text style={styles.icon}>🔍</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.messageWrap}>
              <Text style={styles.icon}>✉️</Text>
              <View style={styles.dot} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── Content ────────────────────────────────────────────── */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero scroll */}
        <View style={styles.heroSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.heroScrollContent}
          >
            {heroProducts.map(renderHeroCard)}
          </ScrollView>
        </View>

        {/* Tops */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tops</Text>
            <TouchableOpacity><Text style={styles.seeMore}>></Text></TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.hScroll}
            contentContainerStyle={styles.hContent}
          >
            {topProducts.map(renderProductCard)}
          </ScrollView>
        </View>

        {/* Bottoms */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bottoms</Text>
            <TouchableOpacity><Text style={styles.seeMore}>></Text></TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.hScroll}
            contentContainerStyle={styles.hContent}
          >
            {bottomProducts.map(renderProductCard)}
          </ScrollView>
        </View>
      </ScrollView>

      {/* ─── Bottom nav ─────────────────────────────────────────── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navText}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.addButton}><Text style={styles.addText}>+</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={[styles.navText, styles.inactive]}>Profile</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/* ──────────────────────────────────────────────────────────────── */
/*  Styles – same spacing / sizes you had originally                */
/* ──────────────────────────────────────────────────────────────── */
const heroCardWidth = 260; // card width ~ original hero box + margin

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  logo: { width: 100, height: 40 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 15 },
  icon: { fontSize: 20 },
  messageWrap: { position: 'relative' },
  dot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },

  /* Content wrapper */
  content: { flex: 1 },

  /* Hero section (scrolls now) */
  heroSection: {
    paddingVertical: 30,
    backgroundColor: '#FAFAFA',
  },
  heroScrollContent: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  heroCard: {
    width: heroCardWidth,
    marginRight: 15,
    alignItems: 'center',
  },
  heroImage: {
    width: heroCardWidth,
    height: 300,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroImgReal: { width: '100%', height: '100%', borderRadius: 20 },
  heroEmoji: { fontSize: 100 },
  heroBrand: { fontSize: 16, fontWeight: '500', marginTop: 8 },
  heroPrice: { fontSize: 14, color: '#666' },

  /* Generic section */
  section: { paddingHorizontal: 20, paddingVertical: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#000' },
  seeMore: { fontSize: 18, color: '#666' },

  /* Horizontal scroll lists */
  hScroll: { marginLeft: -20 },
  hContent: { paddingLeft: 20, paddingRight: 10 },

  /* Product card */
  productCard: { marginRight: 15, width: 140 },
  productImageContainer: { marginBottom: 8 },
  productImage: { width: 140, height: 160, borderRadius: 12 },
  productPlaceholder: {
    width: 140,
    height: 160,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: { fontSize: 40 },
  brandName: { fontSize: 14, color: '#000', marginBottom: 4, fontWeight: '500' },
  productPrice: { fontSize: 14, color: '#666' },

  /* Bottom nav */
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { fontSize: 16, color: '#000', fontWeight: '500' },
  inactive: { color: '#999' },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  addText: { fontSize: 24, color: '#FFF', fontWeight: '300' },
});

export default IntroScreen;
  