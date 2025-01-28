import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const users = [

  {
    name: 'thot leader',
    avatar:
      'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
  },

  {
    name: 'talhaconcepts',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },

  {
    name: 'katy friedson',
    avatar:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
  },
];

type CardsComponentsProps = {};

const Cards: React.FunctionComponent<CardsComponentsProps> = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.cardTitle}>CARD WITH DIVIDER</Card.Title>
          <Card.Divider />
          {users.map((u, i) => (
            <View key={i} style={styles.user}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: u.avatar }}
              />
              <Text style={styles.name}>{u.name}</Text>
            </View>
          ))}
        </Card>

    
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
  },
  cardContainer: {
    borderRadius: 10,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 16,
    color: '#34495e',
  },
  cardImage: {
    height: 200,
    borderRadius: 10,
  },
  cardText: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#7f8c8d',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
  },
});

export default Cards;
