import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, FlatList, ActivityIndicator, View, TouchableOpacity, Image, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Navbar from '../App/Navbar';
import api from '../service/api/apiInterceptors';

const HealthReportlist = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  

  useEffect(() => {
    const fetchHealthReports = async () => {
      try {
        const response = await api.get('/api/healthreport?ReportType=RECEIVE');
        setReports(response.data);
        setFilteredReports(response.data);

      } catch (error) {
        console.error('Error fetching health reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHealthReports();
  }, []);

  // Function to filter reports based on search and date range
  useEffect(() => {
    let filteredData = reports;

    if (searchQuery) {
      filteredData = filteredData.filter(item =>
        item.assayername.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filteredData = filteredData.filter(item => {
        const reportDate = new Date(item.date);
        return reportDate >= startDate && reportDate <= endDate;
      });
    }

    setFilteredReports(filteredData);
  }, [searchQuery, startDate, endDate, reports]);

  const fetchReportDetails = async (id : any) => {
    try {
      const response = await api.get(`/api/healthreport/${id}`);
      setSelectedReport(response.data);
      setModalVisible(true);
      setShowImages(false);
    } catch (error) {
      console.error('Error fetching report details:', error);
    }
  };




  return (
    <SafeAreaView style={styles.container}>
      <Navbar />

      {/* Search Box */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Assayer Name and date"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Date Filters */}
      <View style={styles.dateFilterContainer}>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
          <Text style={styles.buttonText}>{startDate ? startDate.toDateString() : "Start Date"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
          <Text style={styles.buttonText}>{endDate ? endDate.toDateString() : "End Date"}</Text>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={filteredReports}
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
                  <Text style={styles.value}>{new Date(item.date).toLocaleDateString('en-GB')}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Truck Number:</Text>
                  <Text style={styles.value}>{item.trucknumber}</Text>
                </View>


                <View style={styles.parentbutton}>
                  <TouchableOpacity style={styles.button} onPress={() => fetchReportDetails(item.id)}>
                    <Text style={styles.buttonText}>View Report</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

      {/* Modal for Report Details */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.heading}>
          <Text style={styles.text} >Recieve Health Report Details</Text>
          </View>
        <View style={styles.modalContent}>

  {selectedReport && (
    <>
      <View style={styles.rowone}>
        <Text style={styles.labelone}>Assayer Name:</Text>
        <Text style={styles.valueone}>{selectedReport.assayername}</Text>
      </View>

      <View style={styles.rowone}>
        <Text style={styles.labelone}>Truck Number:</Text>
        <Text style={styles.valueone}>{selectedReport.trucknumber}</Text>
      </View>

      <View style={styles.rowone}>
        <Text style={styles.labelone}>Date:</Text>
        <Text style={styles.valueone}>{new Date(selectedReport.date).toLocaleDateString('en-GB')}</Text>
      </View>

      <View style={styles.rowone}>
        <Text style={styles.labelone}>Approval Status:</Text>
        <Text style={styles.valueone}>{selectedReport.approvalstatus}</Text>
      </View>

      {selectedReport.datastring && (() => {
        const parsedData = JSON.parse(selectedReport.datastring);
        return (
          <>
            <View style={styles.rowone}>
              <Text style={styles.labelone}>Destination Branch:</Text>
              <Text style={styles.valueone}>{parsedData.CNAName}</Text>
            </View>
            <View style={styles.rowone}>
              <Text style={styles.labelone}>Storage Name:</Text>
              <Text style={styles.valueone}>{parsedData.StorageName}</Text>
            </View>
            <View style={styles.rowone}>
              <Text style={styles.labelone}>Gross Weight:</Text>
              <Text style={styles.valueone}>{parsedData.GrossWeight}</Text>
            </View>
            <View style={styles.rowone}>
              <Text style={styles.labelone}>Net Weight:</Text>
              <Text style={styles.valueone}>{parsedData.NetWeight}</Text>
            </View>
            <View style={styles.rowone}>
              <Text style={styles.labelone}>Tare Weight:</Text>
              <Text style={styles.valueone}>{parsedData.TareWeight}</Text>
            </View>
          </>
        );
      })()}

      {/* Button to Show/Hide Images */}
      <TouchableOpacity style={styles.showImageButton} onPress={() => setShowImages(!showImages)}>
        <Text style={styles.buttonText}>{showImages ? 'Hide Images' : 'Show Images'}</Text>
      </TouchableOpacity>

      {showImages && (
  <FlatList
    data={selectedReport.files}
    keyExtractor={(item, index) => index.toString()}
    horizontal={true}  // Horizontal scrolling
    showsHorizontalScrollIndicator={false}  // Hide scrollbar
    contentContainerStyle={{ paddingHorizontal: 10 ,  paddingVertical : 20}} // Spacing for better UI
    renderItem={({ item }) => (
      <Image 
        source={{ uri: api.defaults.baseURL + item }} 
        style={styles.image} 
      />
    )}
  />
)}

    </>
  )}

  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
    <Text style={styles.buttonText}>Close</Text>
  </TouchableOpacity>
</View>

        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({


  container: { flex: 1, backgroundColor: '#fff' },
  searchInput: { margin: 10, padding: 17, borderWidth: 1, borderRadius: 25, borderColor: '#ccc' ,  backgroundColor : 'fff'  },
  dateFilterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  dateButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  one: { paddingHorizontal: 30 },
  card: { paddingHorizontal: 35, paddingVertical: 20, backgroundColor: 'white', borderRadius: 8, elevation: 3, marginVertical: 10  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8  },
  rowone: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8, 
  
    width: 300, 
    flexWrap: 'wrap',  // Ensure text wraps inside
    overflow: 'hidden',  // Hide overflowing content
    paddingHorizontal: 10  // Add some padding
  },
  
  label: { fontWeight: 'bold', color: '#333' },
  value: { color: '#555' },
  labelone: { fontWeight: 'bold', color: '#333' ,  fontSize: 20 },
  valueone: { color: '#555' ,  fontSize: 18 },
  button: { backgroundColor: '#F79B00', padding: 8, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  parentbutton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
 
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Dark Transparent Overlay
    justifyContent: 'center',
    alignItems: 'center',
 

  },
  heading: {


    
 
    justifyContent : 'center',
    height : '8%',

    width: '90%',
   backgroundColor : '#FF9500',
   borderTopLeftRadius: 10, // Adjust the radius as needed
   borderTopRightRadius: 10,
  },

  text : {
  
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color : 'white'
  
  },
  modalContent: {
  
    borderTopColor: '#ffcc00', 
    width: '90%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10, // Adjust the radius as needed
    borderBottomRightRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  showImageButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  
  
  image: {
    width: 250,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
    resizeMode: 'cover',
    marginLeft : 20
  },
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

export default HealthReportlist;
