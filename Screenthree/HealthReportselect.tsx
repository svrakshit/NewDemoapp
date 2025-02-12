import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, Switch } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFocusEffect } from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';


const HealthReportselect = ({ navigation, route }) => {
  const [agencyName, setAgencyName] = useState('');
  const [location, setLocation] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [date, setDate] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [netWeight, setNetWeight] = useState('');
  const [tareWeight, setTareWeight] = useState('');
  const [bagCount, setBagCount] = useState('');
  const [size, setSize] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [storeType, setStoreType] = useState([
    {label: 'Quality is Not good', value: 'Quality is Not good'},
    {label: 'bag already packed', value: 'bag already packed'},
    {label: 'truck already loaded', value: 'truck already loaded'},
    {label: 'others', value: 'others'},
  ]);
  const [isFocusType, setIsFocusType] = useState(false);
  const [valueType, setValueType] = useState(null);
  const [commentDetail, setCommentDetail] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      // Reset state when screen is focused
      setAgencyName('');
      setLocation('');
      setTruckNumber('');
      setDate('');
      setGrossWeight('');
      setNetWeight('');
      setTareWeight('');
      setBagCount('');
      setSize('');
      setValueType(false);
      setCommentDetail('')
      setIsComment(false)
    }, [])
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate.toISOString());
    hideDatePicker();
  };

  // const handleTruckNumberChange = (text) => {
  //   // Convert to uppercase and remove spaces and special characters
  //   const filteredText = text.toUpperCase();
  //   setTruckNumber(filteredText);
  // };

  const validateTruckNumber = (number) => {
    const truckNumberPattern = /^[a-zA-Z0-9]{8,12}$/;
    return truckNumberPattern.test(number);
  };

  // const handleNextWithComment = () => {
  //   if (valueType=='others' && !commentDetail) {
  //     Alert.alert("Validation Error", "Please Enter Comment");
  //     return;
  //   }
  //   if (!truckNumber || !date || !bagCount) {
  //     Alert.alert("Validation Error", "Please fill out all fields.");
  //     return;
  //   }

  //   if (!validateTruckNumber(truckNumber)) {
  //     Alert.alert("Validation Error", "Truck Number must be 8 to 12 alphanumeric characters.");
  //     return;
  //   }
  //   navigation.navigate('PhotoClick', {
  //     type:'comment',
  //     CNAName:route.params.CNAName, 
  //     FEDName:route.params.FEDName, 
  //     FPCName:route.params.FPCName, 
  //     StorageId:route.params.StorageId, 
  //     StorageName:route.params.StorageName,
  //     truckNumber,
  //     ReportType:'DISPATCH',
  //     date,
  //     grossWeight,
  //     netWeight,
  //     tareWeight,
  //     bagCount,
  //     valueType,
  //     commentDetail
  //   });
  // };



  const handleNext = () => {
    // if (!truckNumber || !date ||  !bagCount || !size) {
    //   Alert.alert("Validation Error", "Please fill out all fields.");
    //   return;
    // }

    // if (!validateTruckNumber(truckNumber)) {
    //   Alert.alert("Validation Error", "Truck Number must be 8 to 12 alphanumeric characters.");
    //   return;
    // }
    // navigation.navigate('HealthReport', {
    //   CNAName:route.params.CNAName, 
    //   FEDName:route.params.FEDName, 
    //   FPCName:route.params.FPCName, 
    //   StorageId:route.params.StorageId, 
    //   StorageName:route.params.StorageName,
    //   agencyName,
    //   location,
    //   truckNumber,
    //   ReportType:'DISPATCH',
    //   date,
    //   grossWeight,
    //   netWeight,
    //   tareWeight,
    //   bagCount,
    //   size,
    // });
     navigation.navigate('HealthReport');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* <TextInput
          style={styles.input}
          placeholder="Agency Name"
          value={agencyName}
          onChangeText={setAgencyName}
        /> */}
        <View style={{flexDirection:'row',marginBottom:5}}>
          <Text style={{fontSize:13,fontWeight:'600',flex:1}}>Reject Truck</Text>
          <Switch 
            style={{alignSelf:'center'}}
            value={isComment}
            onValueChange={(txt)=>setIsComment(txt)}
          />
        </View>
        {
          isComment==false ?
          (<></>
          // <TextInput
          //   style={styles.input}
          //   placeholder="Location"
          //   value={location}
          //   onChangeText={setLocation}
          // />
          ) : (<>
          <View style={{padding: 0, paddingTop: 8,marginBottom:15}}>
        <Dropdown
          style={[styles.dropdown, isFocusType && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          search={false}
          mode="modal"
          data={storeType}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusType ? '---Select Type---' : '---Select Type---'}
          value={valueType}
          onFocus={() => setIsFocusType(true)}
          onBlur={() => setIsFocusType(false)}
          onChange={item => {
            setValueType(item.value);
            setIsFocusType(false);
          }}
        />
      </View>
      <TextInput
          style={styles.input}
          placeholder="Comment Detail"
          autoCapitalize="characters"
          value={commentDetail}
          onChangeText={(text)=>setCommentDetail(text)}
        />
          </>)
        }
        
        <TextInput
          maxLength={12}
          style={styles.input}
          placeholder="Truck Number"
          value={truckNumber}
          autoCapitalize="characters"
          onChangeText={(text)=>setTruckNumber(text.toUpperCase())}
        />
        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
          <Text style={styles.dateText}>{date ? date : 'Select Date'}</Text>
        </TouchableOpacity>
        {/* <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Gross Weight(KG)"
          value={grossWeight}
          onChangeText={setGrossWeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Net Weight(KG)"
          value={netWeight}
          onChangeText={setNetWeight}
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
          placeholder="Bag Count"
          value={bagCount}
          onChangeText={setBagCount}
          keyboardType="numeric"
        />
        {
          isComment==false ?
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
          isComment==false ?
          (<Button
            title="Next"
            onPress={handleNext}
          />) : (<Button
            title="Next"
            // onPress={handleNextWithComment}
          />)
        }
        
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F7FA', // Light Grayish background
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
  },
  datePicker: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'center',
  },
  dateText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  dropdown: {
    height: 50,
    borderColor: '#007bff', // Blue outline
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
});



export default HealthReportselect;