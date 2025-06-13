// screens/OrderSummaryScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { CartContext } from '../CartContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function OrderSummaryScreen({ navigation }) {
  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    try {
      await addDoc(collection(db, 'orders'), {
        items: cartItems,
        total,
        createdAt: new Date()
      });
      clearCart();
      Alert.alert('Success', 'Order placed successfully!');
      navigation.navigate('Menu');
    } catch (error) {
      Alert.alert('Error', 'Failed to place order.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Order Summary</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.name} x {item.quantity}</Text>
            <Text>₹{item.price * item.quantity}</Text>
          </View>
        )}
      />
      <Text style={{ fontSize: 18 }}>Total: ₹{total}</Text>
      <Button title="Place Order" onPress={placeOrder} />
    </View>
  );
}
