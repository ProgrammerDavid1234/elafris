import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function CartScreen({ navigation, onNavigate }) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, placeOrder } = useCart();

  // Load Poppins fonts
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Use whichever navigation method is provided
  const handleNavigation = (screen, params = {}) => {
    if (onNavigate) {
      onNavigate(screen, params);
    } else if (navigation) {
      navigation.navigate(screen, params);
    }
  };

  const handlePlaceOrder = async () => {
    const success = await placeOrder();
    if (success) {
      Alert.alert(
        'Order Placed! 🎉',
        'Your order has been placed successfully!',
        [
          {
            text: 'Continue Shopping',
            onPress: () => handleNavigation('Home')
          }
        ]
      );
    }
  };

  // Show loading while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Cart</Text>
        </View>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>Add some delicious Nigerian dishes{'\n'}to get started!</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => handleNavigation('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.shopButtonText}>Browse Menu</Text>
            <Text style={styles.shopButtonIcon}>→</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const subtotal = getCartTotal();
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Cart</Text>
          <Text style={styles.itemCount}>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</Text>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={() => {
          Alert.alert(
            'Clear Cart',
            'Are you sure you want to remove all items?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Clear', style: 'destructive', onPress: () => cartItems.forEach(item => removeFromCart(item.id)) }
            ]
          );
        }}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.itemsContainer}>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => updateQuantity(item.id, 1)}
              onDecrease={() => updateQuantity(item.id, -1)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₦{subtotal.toLocaleString()}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₦{deliveryFee.toLocaleString()}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>₦{total.toLocaleString()}</Text>
          </View>
        </View>

        {/* Add padding at bottom for tab bar */}
        <View style={{ height: 140 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.totalInfo}>
            <Text style={styles.footerLabel}>Total Amount</Text>
            <Text style={styles.footerAmount}>₦{total.toLocaleString()}</Text>
          </View>
          <TouchableOpacity 
            style={styles.checkoutButton} 
            onPress={handlePlaceOrder}
            activeOpacity={0.8}
          >
            <Text style={styles.checkoutButtonText}>Place Order</Text>
            <Text style={styles.checkoutButtonEmoji}>🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280',
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  clearButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#ef4444',
  },
  scrollView: {
    flex: 1
  },
  itemsContainer: {
    padding: 20,
    paddingBottom: 8,
  },
  summaryCard: {
    margin: 20,
    marginTop: 8,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1f2937',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 12,
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#1f2937',
  },
  summaryTotalValue: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#f97316',
  },
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingBottom: 100, // Extra padding for tab bar
  },
  footerContent: {
    padding: 20,
  },
  totalInfo: {
    marginBottom: 16,
  },
  footerLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  footerAmount: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#1f2937',
  },
  checkoutButton: {
    backgroundColor: '#f97316',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginRight: 8
  },
  checkoutButtonEmoji: {
    fontSize: 20
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff5f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#1f2937',
    marginBottom: 8
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32
  },
  shopButton: {
    backgroundColor: '#f97316',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginRight: 8,
  },
  shopButtonIcon: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  }
});