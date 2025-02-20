import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Navbar from '../App/Navbar';
import Footer from '../App/Footer';


const HealthReportselect = ({ navigation, route }) => {
  const [agencyName, setAgencyName] = useState('');
  const [location, setLocation] = useState('');
  const [truckNumber, setTruckNumber] = useState('');


  const [grossWeight, setGrossWeight] = useState('');
  const [netWeight, setNetWeight] = useState('');
  const [tareWeight, setTareWeight] = useState('');
  const [bagCount, setBagCount] = useState('');
  const [size, setSize] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isComment, setIsComment] = useState(false);






  const handleNext = () => {

    navigation.navigate('HealthReport', {
      truckNumber,
      grossWeight,
      netWeight,
      tareWeight,
      bagCount,
      size,
      selectedDate: new Date().toISOString()





    });
  };

  const onChangeDate = (event: any, selected?: Date) => {
    if (selected) {
      setSelectedDate(selected);
    }
    setShowDatePicker(false);
  };


  useEffect(() => {
    // Net weight calculate aur update karega
    const gross = parseFloat(grossWeight) || 0;
    const tare = parseFloat(tareWeight) || 0;
    setNetWeight((gross - tare).toString());
  }, [grossWeight, tareWeight]);


  return (

<KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >




      <Navbar  />
      <ScrollView contentContainerStyle={styles.container}>


        <TextInput
          maxLength={12}
          style={styles.input}
          placeholder="Truck Number"
          value={truckNumber}
          autoCapitalize="characters"
          onChangeText={(text) => setTruckNumber(text.toUpperCase())}
        />

        <TextInput
          style={styles.input}
          placeholder="Gross Weight(KG)"
          value={grossWeight}
          onChangeText={setGrossWeight}
          keyboardType="numeric"
        />

          <TextInput
          style={styles.input}
          placeholder="Tare Weight(KG)"
          value={tareWeight}
          onChangeText={setTareWeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Net Weight(KG)"
          value={netWeight}
 
          keyboardType="numeric"
        />
       


        <TextInput
          style={styles.input}
          placeholder="Truck Number"
          value={selectedDate ? selectedDate.toLocaleDateString() : ''}
          onFocus={() => setShowDatePicker(true)} // Trigger date picker on input click
        />


        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Bag Count"
          value={bagCount}
          onChangeText={setBagCount}
          keyboardType="numeric"
        />
        {
          isComment == false ?
            (<TextInput
              style={styles.input}
              placeholder="Size"
              value={size}
              onChangeText={setSize}
              keyboardType="numeric"
            />) : (
              <>
              </>
            )
        }
        {
          isComment == false ?
            (<Button
              title="Next"
              onPress={handleNext}
            />) : (<Button
              title="Next"
            // onPress={handleNextWithComment}
            />)
        }


      </ScrollView>
      <Footer />


    </KeyboardAvoidingView>


  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',

  },

  parentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    width: '100%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0066cc',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerWrapper: {
    marginBottom: 20,
  },
  footer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#0066cc',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#555',
  },

});




export default HealthReportselect;