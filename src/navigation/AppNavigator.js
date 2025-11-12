import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default function AppNavigator() {
    const { user, loading, hasSeenOnboarding } = useAuth();
    const { getCartCount } = useCart();
    const [currentScreen, setCurrentScreen] = useState('Home');
    const [screenParams, setScreenParams] = useState({});

    // Reset to Home screen when user logs in
    useEffect(() => {
        if (user) {
            setCurrentScreen('Home');
            setScreenParams({});
        }
    }, [user]);

    const navigate = (screen, params = {}) => {
        setCurrentScreen(screen);
        setScreenParams(params);
    };

    // Create navigation object compatible with both patterns
    const navigation = {
        navigate: navigate,
        goBack: () => navigate('Home'),
    };

    // Show splash screen while loading
    if (loading) {
        return <SplashScreen />;
    }

    // Show onboarding if not seen
    if (!hasSeenOnboarding) {
        return <OnboardingScreen onNavigate={navigate} navigation={navigation} />;
    }

    // Show auth screens if not logged in
    if (!user) {
        if (currentScreen === 'Signup') {
            return <SignupScreen onNavigate={navigate} navigation={navigation} />;
        }
        return <LoginScreen onNavigate={navigate} navigation={navigation} />;
    }

    // Main app screens
    let ScreenComponent;
    switch (currentScreen) {
        case 'Home':
            ScreenComponent = (
                <HomeScreen 
                    onNavigate={navigate} 
                    navigation={navigation}
                    params={screenParams} 
                />
            );
            break;
        case 'Cart':
            ScreenComponent = (
                <CartScreen 
                    onNavigate={navigate}
                    navigation={navigation}
                    params={screenParams} 
                />
            );
            break;
        case 'Profile':
            ScreenComponent = (
                <ProfileScreen 
                    onNavigate={navigate}
                    navigation={navigation}
                    params={screenParams} 
                />
            );
            break;
        case 'FoodDetail':
            ScreenComponent = (
                <FoodDetailScreen 
                    onNavigate={navigate}
                    navigation={navigation}
                    params={screenParams} 
                />
            );
            break;
        default:
            ScreenComponent = (
                <HomeScreen 
                    onNavigate={navigate}
                    navigation={navigation}
                    params={screenParams} 
                />
            );
    }

    return (
        <View style={{ flex: 1 }}>
            {ScreenComponent}

            {/* Premium Tab Bar - Only show on main screens */}
            {['Home', 'Cart', 'Profile'].includes(currentScreen) && (
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => navigate('Home')}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.tabIconWrapper, currentScreen === 'Home' && styles.tabIconActive]}>
                            <Text style={styles.tabIcon}>🏠</Text>
                        </View>
                        {currentScreen === 'Home' && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => navigate('Cart')}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.tabIconWrapper, currentScreen === 'Cart' && styles.tabIconActive]}>
                            <Text style={styles.tabIcon}>🛒</Text>
                            {getCartCount() > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{getCartCount()}</Text>
                                </View>
                            )}
                        </View>
                        {currentScreen === 'Cart' && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => navigate('Profile')}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.tabIconWrapper, currentScreen === 'Profile' && styles.tabIconActive]}>
                            <Text style={styles.tabIcon}>👤</Text>
                        </View>
                        {currentScreen === 'Profile' && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 16,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    tabIconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    tabIconActive: {
        backgroundColor: '#fff5f0',
    },
    tabIcon: {
        fontSize: 26,
    },
    tabIndicator: {
        position: 'absolute',
        bottom: -8,
        width: 32,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#f97316',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#ef4444',
        borderRadius: 12,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
        borderWidth: 2,
        borderColor: '#fff',
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
});