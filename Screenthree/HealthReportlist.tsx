import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, ActivityIndicator, View } from 'react-native';
import Navbar from '../App/Navbar';
import api from '../service/api/apiInterceptors';

const HealthReportlist = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthReports = async () => {
      try {
        const response = await api.get('/api/healthreport'); // Yahan apni API URL daalo
        setReports(response.data);  
        console.log(response.data);
 
      } catch (error) {
        console.error('Error fetching health reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthReports();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar navigation={undefined} />


      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>Patient: {item.assayername}</Text>
              <Text>Date: {item.date}</Text>
              <Text>Report Status: {item.status}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
 
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HealthReportlist;
