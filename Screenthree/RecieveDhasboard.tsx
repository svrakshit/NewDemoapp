import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../App/Navbar';
import api from '../service/api/apiInterceptors';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../types/Type';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RecieveDhasboard = () => {
  const [dispatchCount, setDispatchCount] = useState<number | null>(null);
  const [recieveCount, setRecieveCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const dispatchResponse = await api.get('/api/dispatch/truckcount/total?DispatchStatus=DISPATCHED');
      setDispatchCount(dispatchResponse.data);

      const recieveResponse = await api.get('/api/dispatch/truckcount/total?DispatchStatus=RECEIVED');
      setRecieveCount(recieveResponse.data);

      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCounts();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Navbar />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.cardContainer}>
            {/* Dispatch Truck */}
            <TouchableOpacity 
              style={[styles.card, styles.dispatchCard]} 
              onPress={() => navigation.navigate("Dispatch Truck list")} 
            >
              <MaterialIcons name="local-shipping" size={40} color="black" />
              <Text style={styles.cardTitle}>Dispatch Truck</Text>
              {loading ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : (
                <Text style={styles.cardDescription}>Count {dispatchCount}</Text>
              )}
            </TouchableOpacity>

            {/* Receive Truck */}
            <TouchableOpacity 
              style={[styles.card, styles.receiveCard]} 
              onPress={() => navigation.navigate('Recieve Truck list')}
            >
              <MaterialIcons name="directions-bus" size={40} color="black" />
              <Text style={styles.cardTitle}>Receive Truck</Text>
              {loading ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : (
                <Text style={styles.cardDescription}>Count {recieveCount}</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  scrollView: {
    flexGrow: 1,
   
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,

    
  },
  card: {
    flex: 1,
    padding: 20,
    margin: 10,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    height: 180,
    justifyContent: 'center',
  },
  dispatchCard: {
    backgroundColor: 'white',
  },
  receiveCard: {
    backgroundColor: 'white',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    width: 140,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default RecieveDhasboard;
