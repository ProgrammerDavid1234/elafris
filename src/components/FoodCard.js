import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function FoodCard({ item, onPress, onAddToCart }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>₦{item.price.toLocaleString()}</Text>
            <Text style={styles.time}>⏱️ {item.prepTime}</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f3f4f6'
  },
  content: {
    padding: 12
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 18
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f97316',
    marginBottom: 2
  },
  time: {
    fontSize: 12,
    color: '#9ca3af'
  },
  addButton: {
    backgroundColor: '#f97316',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600'
  }
});