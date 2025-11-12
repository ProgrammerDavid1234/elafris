import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useFonts } from 'expo-font';

export default function FoodDetailScreen({ route, navigation, params, onNavigate }) {
  // Handle both navigation patterns
  const item = params?.item || route?.params?.item;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [scaleAnim] = useState(new Animated.Value(1));

  // Load Poppins fonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  const handleAddToCart = () => {
    // Add animation feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    
    // Show success feedback before going back
    setTimeout(() => {
      navigation.goBack();
    }, 200);
  };

  const increaseQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.favoriteButton}
            activeOpacity={0.7}
          >
            <Text style={styles.favoriteIcon}>♡</Text>
          </TouchableOpacity>
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingStar}>⭐</Text>
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>

          {/* Info Cards */}
          <View style={styles.infoRow}>
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>⏱️</Text>
              </View>
              <Text style={styles.infoLabel}>Prep Time</Text>
              <Text style={styles.infoText}>{item.prepTime}</Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>🔥</Text>
              </View>
              <Text style={styles.infoLabel}>Calories</Text>
              <Text style={styles.infoText}>{item.calories || '250'} kcal</Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>💰</Text>
              </View>
              <Text style={styles.infoLabel}>Price</Text>
              <Text style={styles.infoText}>₦{item.price.toLocaleString()}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
                onPress={decreaseQuantity}
                activeOpacity={0.7}
                disabled={quantity === 1}
              >
                <Text style={[styles.quantityButtonText, quantity === 1 && styles.quantityButtonTextDisabled]}>−</Text>
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantity}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={increaseQuantity}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <View>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>
              ₦{(item.price * quantity).toLocaleString()}
            </Text>
          </View>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
              <Text style={styles.addButtonIcon}>🛒</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5
  },
  backIcon: {
    fontSize: 24,
    color: '#1f2937',
    fontFamily: 'Poppins-SemiBold'
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#f97316'
  },
  imageContainer: {
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 380,
    backgroundColor: '#f3f4f6'
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'linear-gradient(transparent, rgba(255,255,255,0.8))'
  },
  content: {
    padding: 24
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24
  },
  titleContainer: {
    flex: 1,
    paddingRight: 16
  },
  name: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
    marginBottom: 6,
    lineHeight: 40
  },
  category: {
    fontSize: 16,
    color: '#f97316',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12
  },
  ratingStar: {
    fontSize: 16,
    marginRight: 4
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#92400e'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6'
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  infoIcon: {
    fontSize: 24
  },
  infoLabel: {
    fontSize: 11,
    color: '#9ca3af',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  infoText: {
    fontSize: 14,
    color: '#1f2937',
    fontFamily: 'Poppins-SemiBold'
  },
  section: {
    marginBottom: 28
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
    marginBottom: 12
  },
  description: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 26,
    fontFamily: 'Poppins-Regular'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f97316',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  quantityButtonDisabled: {
    backgroundColor: '#e5e7eb',
    shadowOpacity: 0
  },
  quantityButtonText: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    marginTop: -2
  },
  quantityButtonTextDisabled: {
    color: '#9ca3af'
  },
  quantityDisplay: {
    minWidth: 80,
    height: 48,
    backgroundColor: '#f9fafb',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 2,
    borderColor: '#f3f4f6'
  },
  quantity: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937'
  },
  bottomBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: 13,
    color: '#9ca3af',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  totalPrice: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#f97316'
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f97316',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 8
  },
  addButtonIcon: {
    fontSize: 18
  }
});