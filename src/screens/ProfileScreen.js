import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Switch,
  Modal,
  Animated,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useAuth } from '../context/AuthContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProfileScreen({ onNavigate, navigation }) {
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Modal states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('Shubomi Balogun Hostel');
  const [selectedPayment, setSelectedPayment] = useState('Card');
  
  // Editable user data
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+234 XXX XXX XXXX');
  const [address, setAddress] = useState(user?.address || 'Ibadan, Oyo State');

  // Available hostels
  const hostels = [
    { id: 1, name: 'Shubomi Balogun Hostel', icon: '🏢', distance: '0.5km' },
    { id: 2, name: 'Abebi Hostel', icon: '🏛️', distance: '0.8km' },
    { id: 3, name: 'Jayeola Hostel', icon: '🏘️', distance: '1.2km' },
    { id: 4, name: 'FBMS Hostel', icon: '🏫', distance: '1.5km' },
    { id: 5, name: 'The New Hostel', icon: '🏨', distance: '2.0km' }
  ];

  // Payment methods
  const paymentMethods = [
    { id: 1, name: 'Card', icon: '💳', subtitle: 'Debit/Credit Card' },
    { id: 2, name: 'Cash', icon: '💵', subtitle: 'Pay on Delivery' },
    { id: 3, name: 'Transfer', icon: '🏦', subtitle: 'Bank Transfer' },
    { id: 4, name: 'Wallet', icon: '👛', subtitle: 'Digital Wallet' }
  ];

  // Load Poppins fonts
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const handleNavigation = (screen, params = {}) => {
    if (onNavigate) {
      onNavigate(screen, params);
    } else if (navigation) {
      navigation.navigate(screen, params);
    }
  };

  const handleSaveProfile = () => {
    if (updateUser) {
      updateUser({ name, email, phone, address });
    }
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleSelectAddress = (hostel) => {
    setSelectedAddress(hostel.name);
    setShowAddressModal(false);
    Alert.alert('Address Updated', `Delivery address set to ${hostel.name}`);
  };

  const handleSelectPayment = (method) => {
    setSelectedPayment(method.name);
    setShowPaymentModal(false);
    Alert.alert('Payment Method Updated', `${method.name} selected as payment method`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            handleNavigation('Login');
          }
        }
      ]
    );
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const menuItems = [
    {
      id: 1,
      icon: '📦',
      title: 'My Orders',
      subtitle: 'View your order history',
      action: () => Alert.alert('Orders', 'Order history coming soon!')
    },
    {
      id: 2,
      icon: '❤️',
      title: 'Favorites',
      subtitle: 'Your favorite dishes',
      action: () => Alert.alert('Favorites', 'Favorites feature coming soon!')
    },
    {
      id: 3,
      icon: '📍',
      title: 'Delivery Address',
      subtitle: selectedAddress,
      action: () => setShowAddressModal(true)
    },
    {
      id: 4,
      icon: '💳',
      title: 'Payment Methods',
      subtitle: `${selectedPayment} - Default`,
      action: () => setShowPaymentModal(true)
    },
    {
      id: 5,
      icon: '🎁',
      title: 'Promo Codes',
      subtitle: 'View available offers',
      action: () => Alert.alert('Promos', 'No active promo codes')
    },
    {
      id: 6,
      icon: '⚙️',
      title: 'Settings',
      subtitle: 'App preferences',
      action: () => Alert.alert('Settings', 'Settings coming soon!')
    },
    {
      id: 7,
      icon: '❓',
      title: 'Help & Support',
      subtitle: 'Get help or contact us',
      action: () => Alert.alert('Support', 'Contact: support@foodapp.com')
    },
    {
      id: 8,
      icon: 'ℹ️',
      title: 'About',
      subtitle: 'App version 1.0.0',
      action: () => Alert.alert('About', 'Food Delivery App v1.0.0\nMade with ❤️ in Nigeria')
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {name ? name.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarBadgeText}>⭐</Text>
            </View>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone"
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter your address"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveProfile}
                activeOpacity={0.8}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileEmail}>{email}</Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>24</Text>
                  <Text style={styles.statLabel}>Orders</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Reviews</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>8</Text>
                  <Text style={styles.statLabel}>Favorites</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.preferenceCard}>
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <Text style={styles.preferenceIcon}>🔔</Text>
                <View>
                  <Text style={styles.preferenceTitle}>Push Notifications</Text>
                  <Text style={styles.preferenceSubtitle}>Get order updates</Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#e5e7eb', true: '#fed7aa' }}
                thumbColor={notificationsEnabled ? '#f97316' : '#9ca3af'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <Text style={styles.preferenceIcon}>🌙</Text>
                <View>
                  <Text style={styles.preferenceTitle}>Dark Mode</Text>
                  <Text style={styles.preferenceSubtitle}>Toggle dark theme</Text>
                </View>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#e5e7eb', true: '#fed7aa' }}
                thumbColor={darkModeEnabled ? '#f97316' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast
              ]}
              onPress={item.action}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <Text style={styles.versionText}>Version 1.0.0</Text>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Delivery Address Modal */}
      <Modal
        visible={showAddressModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddressModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Delivery Address</Text>
              <TouchableOpacity
                onPress={() => setShowAddressModal(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              {hostels.map((hostel) => (
                <TouchableOpacity
                  key={hostel.id}
                  style={[
                    styles.modalItem,
                    selectedAddress === hostel.name && styles.modalItemSelected
                  ]}
                  onPress={() => handleSelectAddress(hostel)}
                  activeOpacity={0.7}
                >
                  <View style={styles.modalItemLeft}>
                    <View style={[
                      styles.modalItemIcon,
                      selectedAddress === hostel.name && styles.modalItemIconSelected
                    ]}>
                      <Text style={styles.modalItemEmoji}>{hostel.icon}</Text>
                    </View>
                    <View style={styles.modalItemContent}>
                      <Text style={styles.modalItemTitle}>{hostel.name}</Text>
                      <Text style={styles.modalItemSubtitle}>{hostel.distance} away</Text>
                    </View>
                  </View>
                  {selectedAddress === hostel.name && (
                    <View style={styles.checkmarkContainer}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Payment Method Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Payment Methods</Text>
              <TouchableOpacity
                onPress={() => setShowPaymentModal(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.modalItem,
                    selectedPayment === method.name && styles.modalItemSelected
                  ]}
                  onPress={() => handleSelectPayment(method)}
                  activeOpacity={0.7}
                >
                  <View style={styles.modalItemLeft}>
                    <View style={[
                      styles.modalItemIcon,
                      selectedPayment === method.name && styles.modalItemIconSelected
                    ]}>
                      <Text style={styles.modalItemEmoji}>{method.icon}</Text>
                    </View>
                    <View style={styles.modalItemContent}>
                      <Text style={styles.modalItemTitle}>{method.name}</Text>
                      <Text style={styles.modalItemSubtitle}>{method.subtitle}</Text>
                    </View>
                  </View>
                  {selectedPayment === method.name && (
                    <View style={styles.checkmarkContainer}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.addPaymentButton}
                onPress={() => {
                  setShowPaymentModal(false);
                  Alert.alert('Add Payment', 'Add new payment method coming soon!');
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.addPaymentButtonText}>+ Add New Payment Method</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#1f2937'
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f97316',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6
  },
  avatarText: {
    fontSize: 40,
    fontFamily: 'Poppins_700Bold',
    color: '#fff'
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff'
  },
  avatarBadgeText: {
    fontSize: 16
  },
  profileInfo: {
    alignItems: 'center',
    width: '100%'
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#1f2937',
    marginBottom: 4
  },
  profileEmail: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280',
    marginBottom: 20
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    width: '100%'
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#f97316',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280'
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb'
  },
  editForm: {
    width: '100%',
    marginTop: 8
  },
  inputGroup: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  saveButton: {
    backgroundColor: '#f97316',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff'
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#1f2937',
    marginBottom: 12
  },
  preferenceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6'
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  preferenceIcon: {
    fontSize: 24,
    marginRight: 16
  },
  preferenceTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1f2937',
    marginBottom: 2
  },
  preferenceSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280'
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 12
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6'
  },
  menuItemLast: {
    marginBottom: 0
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  menuIcon: {
    fontSize: 24
  },
  menuItemContent: {
    flex: 1
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1f2937',
    marginBottom: 2
  },
  menuItemSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280'
  },
  menuArrow: {
    fontSize: 28,
    color: '#9ca3af',
    fontFamily: 'Poppins_400Regular'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fecaca'
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 8
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#dc2626'
  },
  versionText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: SCREEN_HEIGHT * 0.75,
    paddingBottom: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#1f2937'
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCloseText: {
    fontSize: 20,
    color: '#6b7280',
    fontFamily: 'Poppins_600SemiBold'
  },
  modalContent: {
    padding: 20
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  modalItemSelected: {
    backgroundColor: '#fff5f0',
    borderColor: '#f97316'
  },
  modalItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  modalItemIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  modalItemIconSelected: {
    backgroundColor: '#fed7aa'
  },
  modalItemEmoji: {
    fontSize: 28
  },
  modalItemContent: {
    flex: 1
  },
  modalItemTitle: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1f2937',
    marginBottom: 4
  },
  modalItemSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280'
  },
  checkmarkContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f97316',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkmark: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins_700Bold'
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingTop: 12
  },
  addPaymentButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed'
  },
  addPaymentButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#6b7280'
  }
});