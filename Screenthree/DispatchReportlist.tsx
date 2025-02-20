import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, ActivityIndicator, View } from 'react-native';
import Navbar from '../App/Navbar';
import api from '../service/api/apiInterceptors';

const DispatchReportlist = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthReports = async () => {
      try {
        const response = await api.get('/api/healthreport?ReportType=DISPATCH'); // Yahan apni API URL daalo
        setReports(response.data);  
   
 
      } catch (error) {
        console.error('Error fetching health reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthReports();
  }, []);

  return (
    <SafeAreaView >
      <Navbar  />


      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            

            <View style={styles.one}>
                         
                          <View style={styles.card}>
                          <View style={styles.topRightCorner} />
               
                              <View style={styles.bottomLeftCorner} />
                            <View style={styles.row}>
                              <Text style={styles.label}>Assayer Name:</Text>
                              <Text style={styles.value}>{item.assayername}</Text>
                            </View>
                            <View style={styles.row}>
                              <Text style={styles.label}>Date:</Text>
                              <Text style={styles.value}>{item.date}</Text>
                            </View>
                            <View style={styles.row}>
                              <Text style={styles.label}>Report Status:</Text>
                              <Text style={styles.value}> {item.approvalstatus}</Text>
                            </View>
            
            
                            

                          </View>
                        </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  one: { paddingHorizontal: 30 },
  card: { paddingHorizontal: 35, paddingVertical: 20, backgroundColor: 'white', borderRadius: 8, elevation: 3, marginVertical: 10   },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8   },
  label: { fontWeight: 'bold', color: '#333' },
  value: { color: '#555' },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 25,
    height: 25,
    backgroundColor: '#F79B00', // Red-Orange Color
    borderTopRightRadius: 10,
  },

  // Left Bottom Corner
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 25,
    height: 25,
    backgroundColor: '#F79B00', // Blue Color
    borderBottomLeftRadius: 10,
  },

 
});

export default DispatchReportlist;

