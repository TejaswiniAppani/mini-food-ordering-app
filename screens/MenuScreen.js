// screens/MenuScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { CartContext } from '../CartContext';

export default function MenuScreen({ navigation }) {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMenu = async () => {
      const snapshot = await getDocs(collection(db, 'menu_items'));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenu(items);
    };
    fetchMenu();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={menu}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 950 }} />
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>₹{item.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Text style={{ textAlign: 'center', padding: 16, backgroundColor: '#2196F3', color: '#fff' }}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
