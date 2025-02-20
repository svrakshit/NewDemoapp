import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Cards: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={[styles.card, styles.pending]}>
          <View style={styles.row}>
            <Icon name="hourglass-empty" color="#FF9800" size={34} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Pending Approval Qty</Text>
              <Text style={styles.cardText}>800 MT</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.approved]}>
          <View style={styles.row}>
            <Icon name="check-circle" color="#4CAF50" size={34} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Approved Qty</Text>
              <Text style={styles.cardText}>500 MT</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.rejected]}>
          <View style={styles.row}>
            <Icon name="cancel" color="#F44336" size={34} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Rejected Qty</Text>
              <Text style={styles.cardText}>200 MT</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  cardWrapper: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    marginTop: 70,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff', // Fixed background color
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
 
  },
  textContainer: {
 
  },
  pending: {
    borderLeftWidth: 6,
    borderLeftColor: '#FF9800',
  },
  approved: {
    borderLeftWidth: 6,
    borderLeftColor: '#4CAF50',
  },
  rejected: {
    borderLeftWidth: 6,
    borderLeftColor: '#F44336',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 5,
  },
});

export default Cards;