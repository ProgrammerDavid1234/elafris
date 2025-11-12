import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>₦{item.price.toLocaleString()}</Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.button} onPress={onDecrease}>
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.button} onPress={onIncrease}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f3f4f6'
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f97316'
  },
  actions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4
  },
  button: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f97316'
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  removeButton: {
    marginTop: 8
  },
  removeText: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: '600'
  }
});