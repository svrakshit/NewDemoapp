import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Type'

type CardsNavigationProp = StackNavigationProp<RootStackParamList, 'SelectFederation'>;  // Type for navigation

const Cards: React.FunctionComponent = () => {
  const navigation = useNavigation<CardsNavigationProp>();  // Use typed navigation

  const handleCardPress = () => {
    navigation.navigate('SelectFederation');  // Now TypeScript knows about this screen


 

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCardPress}>  {/* Add onPress to navigate */}
        <Card containerStyle={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="check-circle" type="material" color="#4CAF50" size={28} />
            <Text style={styles.cardTitle}>Total Procured Approved Qty</Text>
          </View>
          <Card.Divider />
          <Text style={styles.cardText}>1500 MT</Text>
        </Card>
      </TouchableOpacity>

      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="hourglass-empty" type="material" color="#FF9800" size={28} />
          <Text style={styles.cardTitle}>Pending Approval Qty</Text>
        </View>
        <Card.Divider />
        <Text style={styles.cardText}>800 MT</Text>
      </Card>

      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="cancel" type="material" color="#F44336" size={28} />
          <Text style={styles.cardTitle}>Rejected Qty</Text>
        </View>
        <Card.Divider />
        <Text style={styles.cardText}>200 MT</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'red',
  },
  card: {
    borderRadius: 10,
    padding: 15,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
});

export default Cards;
