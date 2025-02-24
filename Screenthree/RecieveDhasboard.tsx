import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../App/Navbar';
import api from '../service/api/apiInterceptors';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../types/Type';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Footer from '../App/Footer';

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
              onPress={() => navigation.navigate("Receive Truck List")}
            >
              {/* Top Right Corner */}
              <View style={styles.topRightCorner} />


              <Text style={styles.cardTitle}> Receiving Pending Truck </Text>
              <View style={{ backgroundColor: "#F79B0099", padding: 10, borderRadius: 50 }}>
                <MaterialIcons name="local-shipping" size={40} color="white" />
              </View>
              <View>

              </View>
              {loading ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : (
                <Text style={styles.cardDescription}>Count {dispatchCount}</Text>
              )}

              {/* Bottom Left Corner */}
              <View style={styles.bottomLeftCorner} />
            </TouchableOpacity>



            <TouchableOpacity
              style={[styles.card, styles.dispatchCard]}
              onPress={() => navigation.navigate("Dispatch Truck List")}
            >
              {/* Top Right Corner */}
              <View style={styles.topRightCorner} />


              <Text style={styles.cardTitle}>Received Truck</Text>
              <View style={{ backgroundColor: "#F79B0099", padding: 10, borderRadius: 50 }}>
                <MaterialIcons name="directions-bus" size={40} color="white" />
              </View>
              <View>

              </View>
              {loading ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : (
                <Text style={styles.cardDescription}>Count {recieveCount}</Text>
              )}

              {/* Bottom Left Corner */}
              <View style={styles.bottomLeftCorner} />
            </TouchableOpacity>



          </View>
        </ScrollView>
      </SafeAreaView>
      <Footer />

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
    padding: 25,
    margin: 10,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    height: 180,
    justifyContent: 'center',
    position: 'relative', // Corners ke liye relative position zaroori hai
  },
  dispatchCard: {
    backgroundColor: 'white',
    height: '65%'
  },
  receiveCard: {
    backgroundColor: 'white',
  },
  cardTitle: {
    fontSize: 17,

    color: 'black',
    marginTop: 10,
    width: 150,
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

  // Top Right Corner
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 25,
    height: 25,
    backgroundColor: '#F79B0099', // Orange color
    borderTopRightRadius: 10,
  },

  // Bottom Left Corner
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 25,
    height: 25,
    backgroundColor: '#F79B0099', // Orange color
    borderBottomLeftRadius: 10,
  },
});


export default RecieveDhasboard;
