import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useAuth } from '../context/AuthContext';

export default function OnboardingScreen() {
  const { completeOnboarding } = useAuth();

  return (
    <Onboarding
      onDone={completeOnboarding}
      onSkip={completeOnboarding}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Text style={styles.emoji}>🍽️</Text>,
          title: 'Browse Delicious Meals',
          subtitle: 'Explore a wide variety of cafeteria meals prepared fresh daily'
        },
        {
          backgroundColor: '#fff',
          image: <Text style={styles.emoji}>🛒</Text>,
          title: 'Easy Ordering',
          subtitle: 'Add items to cart and place your order in just a few taps'
        },
        {
          backgroundColor: '#fff',
          image: <Text style={styles.emoji}>⚡</Text>,
          title: 'Quick Pickup',
          subtitle: 'Track your order status and pick up when ready'
        }
      ]}
      containerStyles={styles.container}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      bottomBarHighlight={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  emoji: {
    fontSize: 120,
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    paddingHorizontal: 40,
    textAlign: 'center'
  }
});