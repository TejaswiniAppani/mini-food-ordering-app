// screens/CartScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { CartContext } from '../CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: ₹{item.price * item.quantity}</Text>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total: ₹{total}</Text>
      <Button title="Proceed to Order Summary" onPress={() => navigation.navigate('OrderSummary')} />
    </View>
  );
}
