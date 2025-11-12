import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function HomeScreen({ onNavigate, navigation }) {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Load Poppins fonts
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
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

    const categories = ['All', 'Rice', 'Beans', 'Swallows', 'Eggs', 'Specials', 'Drinks'];
    
    const foodData = [
        { id: 1, name: 'Jollof Rice', category: 'Rice', price: 2500, rating: 4.9, icon: '🍚', description: 'Nigerian party jollof rice with chicken' },
        { id: 2, name: 'Fried Rice', category: 'Rice', price: 2800, rating: 4.7, icon: '🍛', description: 'Mixed vegetable fried rice with beef' },
        { id: 3, name: 'Coconut Rice', category: 'Rice', price: 2200, rating: 4.6, icon: '🥥', description: 'Coconut rice with vegetables' },
        { id: 4, name: 'White Rice & Stew', category: 'Rice', price: 1800, rating: 4.5, icon: '🍲', description: 'White rice with tomato stew' },
        { id: 5, name: 'Beans Porridge', category: 'Beans', price: 1500, rating: 4.8, icon: '🫘', description: 'Honey beans cooked with palm oil' },
        { id: 6, name: 'Moi Moi', category: 'Beans', price: 800, rating: 4.7, icon: '🟤', description: 'Steamed bean pudding' },
        { id: 7, name: 'Akara', category: 'Beans', price: 500, rating: 4.6, icon: '🟠', description: 'Bean fritters (bean cake)' },
        { id: 8, name: 'Eba & Egusi', category: 'Swallows', price: 2000, rating: 4.9, icon: '🥘', description: 'Garri with melon seed soup' },
        { id: 9, name: 'Pounded Yam & Egusi', category: 'Swallows', price: 3500, rating: 4.9, icon: '⚪', description: 'Fresh pounded yam with egusi soup' },
        { id: 10, name: 'Amala & Ewedu', category: 'Swallows', price: 2500, rating: 4.8, icon: '🟫', description: 'Yam flour with jute leaf soup' },
        { id: 11, name: 'Fufu & Afang', category: 'Swallows', price: 2800, rating: 4.7, icon: '⚫', description: 'Cassava fufu with afang soup' },
        { id: 12, name: 'Boiled Yam & Egg Sauce', category: 'Eggs', price: 1800, rating: 4.6, icon: '🥚', description: 'Boiled yam with scrambled eggs' },
        { id: 13, name: 'Fried Eggs & Plantain', category: 'Eggs', price: 1500, rating: 4.7, icon: '🍳', description: 'Fried eggs with ripe plantain' },
        { id: 14, name: 'Egg & Chips', category: 'Eggs', price: 2000, rating: 4.5, icon: '🍟', description: 'Fried eggs with potato chips' },
        { id: 15, name: 'Spaghetti Jollof', category: 'Specials', price: 2000, rating: 4.8, icon: '🍝', description: 'Spicy jollof spaghetti' },
        { id: 16, name: 'Fried Plantain (Dodo)', category: 'Specials', price: 800, rating: 4.7, icon: '🍌', description: 'Sweet fried ripe plantain' },
        { id: 17, name: 'Suya', category: 'Specials', price: 2500, rating: 4.9, icon: '🥩', description: 'Spicy grilled beef skewers' },
        { id: 18, name: 'Puff Puff', category: 'Specials', price: 500, rating: 4.6, icon: '🍩', description: 'Sweet fried dough balls' },
        { id: 19, name: 'Chapman', category: 'Drinks', price: 1000, rating: 4.7, icon: '🍹', description: 'Nigerian cocktail drink' },
        { id: 20, name: 'Zobo', category: 'Drinks', price: 500, rating: 4.8, icon: '🥤', description: 'Hibiscus flower drink' },
        { id: 21, name: 'Fresh Palm Wine', category: 'Drinks', price: 800, rating: 4.5, icon: '🍺', description: 'Natural palm wine' },
    ];

    const filteredFood = foodData.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (item, e) => {
        if (e) {
            e.stopPropagation();
        }
        addToCart(item);
    };

    // Show loading while fonts are loading
    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Premium Header */}
                <View style={styles.homeHeader}>
                    <View>
                        <Text style={styles.homeGreeting}>
                            Hello, {user?.name ? user.name.split(' ')[0] : 'Guest'} 👋
                        </Text>
                        <Text style={styles.homeSubGreeting}>What's on the menu today?</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationBtn}>
                        <Text style={styles.notificationIcon}>🔔</Text>
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                {/* Premium Search */}
                <View style={styles.searchWrapper}>
                    <View style={styles.searchContainer}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search dishes, restaurants..."
                            placeholderTextColor="#9ca3af"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                </View>

                {/* Categories Pills */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesScroll}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryPill,
                                selectedCategory === category && styles.categoryPillActive
                            ]}
                            onPress={() => setSelectedCategory(category)}
                            activeOpacity={0.7}
                        >
                            <Text style={[
                                styles.categoryPillText,
                                selectedCategory === category && styles.categoryPillTextActive
                            ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Food Cards */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            {selectedCategory === 'All' ? 'Popular Dishes' : selectedCategory}
                        </Text>

                    </View>

                    {filteredFood.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.foodCard}
                            onPress={() => handleNavigation('FoodDetail', { item })}
                            activeOpacity={0.9}
                        >
                            <View style={styles.foodCardContent}>
                                <View style={styles.foodIcon}>
                                    <Text style={styles.foodIconText}>{item.icon}</Text>
                                </View>
                                <View style={styles.foodInfo}>
                                    <Text style={styles.foodName}>{item.name}</Text>
                                    <View style={styles.foodMeta}>
                                        <Text style={styles.foodRating}>⭐ {item.rating}</Text>
                                        <Text style={styles.foodCategory}>{item.category}</Text>
                                    </View>
                                    <Text style={styles.foodPrice}>₦{item.price.toLocaleString()}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.addBtn}
                                onPress={(e) => handleAddToCart(item, e)}
                            >
                                <Text style={styles.addBtnText}>+</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

                {filteredFood.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>🔍</Text>
                        <Text style={styles.emptyText}>No dishes found</Text>
                        <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
                    </View>
                )}

                {/* Bottom padding for tab bar */}
                <View style={{ height: 120 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    homeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
    },
    homeGreeting: {
        fontSize: 28,
        fontFamily: 'Poppins_700Bold',
        color: '#1f2937',
        marginBottom: 4,
    },
    homeSubGreeting: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#6b7280',
    },
    notificationBtn: {
        position: 'relative',
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff5f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationIcon: {
        fontSize: 24,
    },
    notificationDot: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
    },
    searchWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 12,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    searchIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#1f2937',
    },
    filterBtn: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#f97316',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterIcon: {
        fontSize: 20,
    },
    categoriesScroll: {
        marginBottom: 24,
    },
    categoriesContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    categoryPill: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    categoryPillActive: {
        backgroundColor: '#f97316',
        borderColor: '#f97316',
    },
    categoryPillText: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        color: '#6b7280',
    },
    categoryPillTextActive: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
    },
    section: {
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontFamily: 'Poppins_700Bold',
        color: '#1f2937',
    },
    seeAll: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        color: '#f97316',
    },
    foodCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    foodCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    foodIcon: {
        width: 72,
        height: 72,
        borderRadius: 16,
        backgroundColor: '#fff5f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    foodIconText: {
        fontSize: 36,
    },
    foodInfo: {
        flex: 1,
    },
    foodName: {
        fontSize: 17,
        fontFamily: 'Poppins_600SemiBold',
        color: '#1f2937',
        marginBottom: 6,
    },
    foodMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 12,
    },
    foodRating: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#6b7280',
    },
    foodCategory: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#9ca3af',
    },
    foodPrice: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        color: '#f97316',
    },
    addBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#f97316',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    addBtnText: {
        fontSize: 24,
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: '#1f2937',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        color: '#9ca3af',
    },
});

export default HomeScreen;