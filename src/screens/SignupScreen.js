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
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function SignupScreen({ onNavigate, navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '', color: '#e5e7eb' };
    if (password.length < 6) return { strength: 33, label: 'Weak', color: '#ef4444' };
    if (password.length < 10) return { strength: 66, label: 'Good', color: '#f59e0b' };
    return { strength: 100, label: 'Strong', color: '#10b981' };
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Required Fields', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Signup Failed', result.error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const passwordStrength = getPasswordStrength();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Animated Header with Gradient Effect */}
        <View style={styles.authHeader}>
          <View style={styles.logoContainer}>
            <View style={styles.logoOuterCircle}>
              <View style={styles.logoInnerCircle}>
                <Text style={styles.logoEmoji}>🍽️</Text>
              </View>
            </View>
          </View>
          <Text style={styles.authTitle}>Create Account</Text>
          <Text style={styles.authSubtitle}>
            Join thousands enjoying delicious meals
          </Text>
        </View>

        {/* Modern Form with Enhanced Inputs */}
        <View style={styles.authForm}>
          {/* Full Name Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={[
              styles.modernInput,
              focusedInput === 'name' && styles.modernInputFocused
            ]}>
              <View style={styles.inputIconContainer}>
                <Text style={styles.inputIcon}>👤</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                autoComplete="name"
              />
              {name.length > 0 && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={[
              styles.modernInput,
              focusedInput === 'email' && styles.modernInputFocused
            ]}>
              <View style={styles.inputIconContainer}>
                <Text style={styles.inputIcon}>✉️</Text>
              </View>
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
              {email.includes('@') && email.includes('.') && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
          </View>

          {/* Password Input with Strength Indicator */}
          <View style={styles.inputWrapper}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>Password</Text>
              {password.length > 0 && (
                <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                  {passwordStrength.label}
                </Text>
              )}
            </View>
            <View style={[
              styles.modernInput,
              focusedInput === 'password' && styles.modernInputFocused
            ]}>
              <View style={styles.inputIconContainer}>
                <Text style={styles.inputIcon}>🔒</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Min. 6 characters"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
            {/* Password Strength Bar */}
            {password.length > 0 && (
              <View style={styles.strengthBarContainer}>
                <View style={[styles.strengthBar, { 
                  width: `${passwordStrength.strength}%`,
                  backgroundColor: passwordStrength.color 
                }]} />
              </View>
            )}
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={[
              styles.modernInput,
              focusedInput === 'confirm' && styles.modernInputFocused,
              confirmPassword && password !== confirmPassword && styles.modernInputError
            ]}>
              <View style={styles.inputIconContainer}>
                <Text style={styles.inputIcon}>🔐</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Re-enter password"
                placeholderTextColor="#9ca3af"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocusedInput('confirm')}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry={!showConfirmPassword}
                autoComplete="password"
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeIcon}>
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            {confirmPassword && password !== confirmPassword && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}
          </View>

          {/* Terms & Conditions */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing up, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Sign Up Button with Animation */}
          <TouchableOpacity
            style={[styles.primaryButton, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingDot}>●</Text>
                <Text style={styles.loadingDot}>●</Text>
                <Text style={styles.loadingDot}>●</Text>
              </View>
            ) : (
              <>
                <Text style={styles.primaryButtonText}>Create Account</Text>
                <View style={styles.buttonArrowContainer}>
                  <Text style={styles.buttonArrow}>→</Text>
                </View>
              </>
            )}
          </TouchableOpacity>

          {/* Social Sign Up Options */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>🔵</Text>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>📱</Text>
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Link */}
          <View style={styles.authFooter}>
            <Text style={styles.authFooterText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => onNavigate ? onNavigate('Login') : navigation?.navigate('Login')}>
              <Text style={styles.authLink}>Sign In</Text>
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
    paddingTop: 40,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoOuterCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  logoInnerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff5f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 56,
  },
  authTitle: {
    fontSize: 34,
    fontFamily: 'Poppins_700Bold',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -1,
  },
  authSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  authForm: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },
  strengthLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
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
    minHeight: 56,
  },
  modernInputFocused: {
    borderColor: '#f97316',
    shadowColor: '#f97316',
    shadowOpacity: 0.15,
    backgroundColor: '#fffbf7',
  },
  modernInputError: {
    borderColor: '#ef4444',
  },
  inputIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  inputIcon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
  },
  checkmark: {
    fontSize: 20,
    color: '#10b981',
    fontFamily: 'Poppins_700Bold',
  },
  eyeButton: {
    padding: 8,
  },
  eyeIcon: {
    fontSize: 18,
  },
  strengthBarContainer: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
    borderRadius: 2,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#ef4444',
    marginTop: 6,
    marginLeft: 4,
  },
  termsContainer: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  termsText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
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
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    minHeight: 56,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 0.5,
  },
  buttonArrowContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  buttonArrow: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  loadingDot: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
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
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: '#9ca3af',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  socialIcon: {
    fontSize: 20,
  },
  socialButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#374151',
  },
  authFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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