import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from './type';

// // Navigation types define karo
// type RootStackParamList = {
//   WarehouseDrawernavigator: undefined;
//   AssyingDrawernavigator: undefined;
//   DispatchDrawernavigator: undefined;
//   RecieveDrawernavigator: undefined;
// };

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MainScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const cards = [
    { id: 1, title: 'Warehouse Check', screen: 'WarehouseDrawernavigator', icon: 'store' },
    { id: 2, title: 'Assaying', screen: 'AssyingDrawernavigator', icon: 'science' },
    { id: 3, title: 'Dispatch Health Report', screen: 'DispatchDrawernavigator', icon: 'local-shipping' },
    { id: 4, title: 'Receive Health Report', screen: 'RecieveDrawernavigator', icon: 'assignment' },
  ];

  return (
    <View style={styles.container}>
      {cards.map((card) => (
        <TouchableOpacity
          key={card.id}
          style={styles.card}
          onPress={() => navigation.navigate(card.screen as keyof RootStackParamList)}
        >
          <Icon name={card.icon} size={30} color="#4CAF50" style={styles.icon} />
          <Text style={styles.cardText}>{card.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MainScreen;
