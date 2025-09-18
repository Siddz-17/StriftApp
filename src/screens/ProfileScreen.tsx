import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface LookItem {
  id: number;
  image: string;
  title?: string;
}

interface ClothingItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Looks' | 'Items'>('Looks');

  const looksData: LookItem[] = [
    { id: 1, image: '', title: 'Casual Look 1' },
    { id: 2, image: '', title: 'Casual Look 2' },
    { id: 3, image: '', title: 'Formal Look 1' },
    { id: 4, image: '', title: 'Formal Look 2' },
  ];

  const itemsData: ClothingItem[] = [
    { id: 1, brand: 'Homme Plissé Issey Miyake', name: 'Pleated Shirt', price: '$409', image: '', category: 'shirt' },
    { id: 2, brand: 'Feng Chen Wang', name: 'Distressed Jeans', price: '$446', image: '', category: 'pants' },
    { id: 3, brand: 'Acne Studios', name: 'Leather Pants', price: '$2,250', image: '', category: 'pants' },
    { id: 4, brand: 'Rick Owens', name: 'Puffer Jacket', price: '$2,445', image: '', category: 'jacket' },
    { id: 5, brand: 'Entire Studios', name: 'Wide Leg Jeans', price: '$355', image: '', category: 'jeans' },
    { id: 6, brand: 'Comme des Garçons', name: 'White Shirt', price: '$270', image: '', category: 'shirt' },
    { id: 7, brand: 'Acne Studios', name: 'Cargo Pants', price: '$1,361', image: '', category: 'pants' },
    { id: 8, brand: 'Stüssy', name: 'Coach Jacket', price: '$185', image: '', category: 'jacket' },
    { id: 9, brand: 'Balenciaga', name: 'Distressed Jeans', price: '$1,950', image: '', category: 'jeans' },
  ];

  const getPlaceholderStyle = (category: string) => {
    switch (category) {
      case 'shirt':
        return { backgroundColor: '#2C3E50' };
      case 'jacket':
        return { backgroundColor: '#8E44AD' };
      case 'pants':
        return { backgroundColor: '#27AE60' };
      case 'jeans':
        return { backgroundColor: '#3498DB' };
      default:
        return { backgroundColor: '#95A5A6' };
    }
  };

  const getPlaceholderEmoji = (category: string) => {
    switch (category) {
      case 'shirt':
        return '👕';
      case 'jacket':
        return '🧥';
      case 'pants':
        return '👖';
      case 'jeans':
        return '👖';
      default:
        return '👔';
    }
  };

  const renderLookItem = (item: LookItem) => (
    <TouchableOpacity key={item.id} style={styles.lookItem}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.lookImage} />
      ) : (
        <View style={styles.lookImagePlaceholder}>
          <Text style={styles.lookPlaceholderText}>👤</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderClothingItem = (item: ClothingItem) => (
    <TouchableOpacity key={item.id} style={styles.clothingItem}>
      <View style={styles.clothingImageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.clothingImage} />
        ) : (
          <View style={[styles.clothingImagePlaceholder, getPlaceholderStyle(item.category)]}>
            <Text style={styles.clothingPlaceholderText}>{getPlaceholderEmoji(item.category)}</Text>
          </View>
        )}
      </View>
      <View style={styles.clothingInfo}>
        <Text style={styles.clothingBrand}>{item.brand}</Text>
        <Text style={styles.clothingPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Looks' && styles.activeTab]}
            onPress={() => setActiveTab('Looks')}
          >
            <Text style={[styles.tabText, activeTab === 'Looks' && styles.activeTabText]}>
              Looks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Items' && styles.activeTab]}
            onPress={() => setActiveTab('Items')}
          >
            <Text style={[styles.tabText, activeTab === 'Items' && styles.activeTabText]}>
              Items
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'Looks' ? (
          <View style={styles.looksGrid}>
            {looksData.map(renderLookItem)}
          </View>
        ) : (
          <View style={styles.itemsGrid}>
            {itemsData.map(renderClothingItem)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  tabContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 18,
    color: '#999999',
    fontWeight: '400',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '500',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  looksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  lookItem: {
    width: (width - 60) / 2,
    aspectRatio: 0.75,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  lookImage: {
    width: '100%',
    height: '100%',
  },
  lookImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  lookPlaceholderText: {
    fontSize: 60,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  clothingItem: {
    width: (width - 60) / 3,
    marginBottom: 25,
  },
  clothingImageContainer: {
    marginBottom: 8,
  },
  clothingImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  clothingImagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clothingPlaceholderText: {
    fontSize: 30,
  },
  clothingInfo: {
    alignItems: 'flex-start',
  },
  clothingBrand: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    marginBottom: 4,
    lineHeight: 16,
  },
  clothingPrice: {
    fontSize: 12,
    color: '#666666',
  },
});

export default ProfileScreen;
