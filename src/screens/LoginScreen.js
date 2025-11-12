import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function LoginScreen({ onNavigate }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const { login } = useAuth();

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Required Fields', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (!result.success) {
            Alert.alert('Login Failed', result.error);
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Animated Header */}
                <View style={styles.authHeader}>
                    
                    <Text style={styles.authTitle}>Welcome Back</Text>
                    <Text style={styles.authSubtitle}>Sign in to continue your culinary journey</Text>
                </View>

                {/* Modern Form */}
                <View style={styles.authForm}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <View style={[
                            styles.modernInput,
                            focusedInput === 'email' && styles.modernInputFocused
                        ]}>
                            <Text style={styles.inputIcon}>✉️</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="you@example.com"
                                placeholderTextColor="#9ca3af"
                                value={email}
                                onChangeText={setEmail}
                                onFocus={() => setFocusedInput('email')}
                                onBlur={() => setFocusedInput(null)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />
                        </View>
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={[
                            styles.modernInput,
                            focusedInput === 'password' && styles.modernInputFocused
                        ]}>
                            <Text style={styles.inputIcon}>🔒</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="#9ca3af"
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => setFocusedInput('password')}
                                onBlur={() => setFocusedInput(null)}
                                secureTextEntry
                                autoComplete="password"
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.primaryButton, loading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Text>
                        {!loading && <Text style={styles.buttonArrow}>→</Text>}
                    </TouchableOpacity>

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.authFooter}>
                        <Text style={styles.authFooterText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => onNavigate('Signup')}>
                            <Text style={styles.authLink}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 24,
    },
    authHeader: {
        alignItems: 'center',
        marginBottom: 48,
        marginTop: 200,
    },
    logoContainer: {
        position: 'relative',
        marginBottom: 24,
    },
    logoEmoji: {
        fontSize: 72,
        zIndex: 2,
    },
    logoBg: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff5f0',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    authTitle: {
        fontSize: 32,
        fontFamily: 'Poppins_700Bold',
        color: '#111827',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    authSubtitle: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#6b7280',
        textAlign: 'center',
        paddingHorizontal: 32,
    },
    authForm: {
        width: '100%',
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: '#374151',
        marginBottom: 8,
        marginLeft: 4,
    },
    modernInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    modernInputFocused: {
        borderColor: '#f97316',
        shadowColor: '#f97316',
        shadowOpacity: 0.15,
    },
    inputIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#111827',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: '#f97316',
    },
    primaryButton: {
        backgroundColor: '#f97316',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Poppins_700Bold',
        letterSpacing: 0.5,
    },
    buttonArrow: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 8,
        fontFamily: 'Poppins_600SemiBold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: '#9ca3af',
    },
    authFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    authFooterText: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        color: '#6b7280',
    },
    authLink: {
        fontSize: 15,
        fontFamily: 'Poppins_700Bold',
        color: '#f97316',
    },
});