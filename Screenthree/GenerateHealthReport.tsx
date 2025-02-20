import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, Image, KeyboardAvoidingView, Platform, TextInput, Button, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Navbar from '../App/Navbar';
import api from '../service/api/apiInterceptors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Type';
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';


type HealthReportSelection = StackNavigationProp<RootStackParamList, 'HealthReportselect'>;

type ImageAsset = {
  uri: string;
  fileName: string;
  type: string;
};

const GenerateHealthReport = () => {


  const navigation = useNavigation<HealthReportSelection>();

  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data5, setData5] = useState([]);
  const [truckNumber, setTruckNumber] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [netWeight, setNetWeight] = useState('');
  const [tareWeight, setTareWeight] = useState('');
  const [bagCount, setBagCount] = useState('');
  const [size, setSize] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isComment, setIsComment] = useState(false);

  const [selectedValues, setSelectedValues] = useState({

    picker2: '',
    picker3: '',
    picker5: '',
  });

  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState('');
  const [branchId, setBranchId] = useState('');

  const [stainingColour, setStainingColour] = useState(false);
  const [stainingColourPercent, setStainingColourPercent] = useState('');
  const [destinationBranch, setDestinationBranch] = useState('');
  const [destinationDistrict, setDestinationDistrict] = useState('');
  const [blackSmutOnion, setBlackSmutOnion] = useState(false);
  const [BlackSmutPercent, setBlackSmatPercent] = useState('');
  const [sproutedOnion, setSproutedOnion] = useState(false);
  const [sproutedPercent, setSproutedPercent] = useState('');
  const [spoiledOnion, setSpoiledOnion] = useState(false);
  const [spoiledPercent, setSpoiledPercent] = useState('');
  const [onionSkin, setOnionSkin] = useState('DOUBLE');
  const [moisture, setMoisture] = useState('DRY');
  const [onionSkinPercent, setOnionSkinPercent] = useState('');
  const [moisturePercent, setMoisturePercent] = useState('');
  const [fpcPersonName, setFpcPersonName] = useState('');
  const [isSpoiledPercentVisible, setIsSpoiledPercentVisible] = useState(false);
  const [SpoliedPercent, setSpoliedPercent] = useState('');
  const [SpoliedBranch, setSpoliedBranch] = useState('');
  const [SpoliedComment, setSpoliedComment] = useState('');

  const [imageUri, setImageUri] = useState<ImageAsset[]>([]);


  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        cameraType: 'back',
        quality: 0.4,
        maxWidth: 700,
        maxHeight: 700,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const capturedImage = response.assets[0];
  
          console.log('Captured image URI:', capturedImage.uri); // Debugging ke liye
  
          const image = {
            uri: capturedImage.uri ?? '',
            fileName: capturedImage.fileName || `photo_${Date.now()}.jpg`,
            type: capturedImage.type || 'image/jpeg',
          };
  
          setImageUri((prevImages) => [...prevImages, image]); // **Naye images add honge**
        }
      }
    );
  };
  





  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('companyId', companyId);
    console.log('formcompany', companyId);
    formData.append('branchId', branchId);
    formData.append('truckNumber', truckNumber);
    formData.append('grossWeight', grossWeight);
    formData.append("DestinationBranch", destinationBranch);
    formData.append("DestinationDistrict", destinationDistrict);
    formData.append('tareWeight', tareWeight);
    formData.append('netWeight', netWeight);
    formData.append('bagCount', bagCount);
    formData.append('size', size);
    formData.append('stainingColour', stainingColour.toString());

    formData.append('stainingColourPercent', stainingColourPercent);
    formData.append('blackSmutOnion', blackSmutOnion.toString());
    formData.append('BlackSmutPercent', BlackSmutPercent);
    formData.append('sproutedOnion', sproutedOnion.toString());
    formData.append('sproutedPercent', sproutedPercent);
    formData.append('spoiledOnion', spoiledOnion.toString());
    formData.append('spoiledPercent', spoiledPercent);
    formData.append('onionSkin', onionSkin);
    formData.append('moisture', moisture);
    formData.append('onionSkinPercent', onionSkinPercent);
    formData.append('moisturePercent', moisturePercent);
    formData.append('fpcPersonName', fpcPersonName);
    formData.append('SpoliedPercent', SpoliedPercent);
    formData.append('SpoliedBranch', SpoliedBranch);
    formData.append('SpoliedComment', SpoliedComment);
    formData.append('selectedDate', selectedDate.toISOString());

    if (imageUri) {
      const uris = imageUri.map((image) => image.uri);
      const types = imageUri.map((image) => image.type);
      const fileNames = imageUri.map((image) => image.fileName);  // ✅ Corrected
    
      console.log('Only URIs:', uris);
      console.log('Only Types:', types);
      console.log('Only FileNames:', fileNames);

   


      imageUri.forEach((imageUri) => {
        formData.append('Files', {
          uri: imageUri.uri,
          name: imageUri.fileName,
          type: imageUri.type,
        } as any);
      });
    

   

      imageUri.forEach((image) => {
        console.log('Keyhsgyh:', 'Files');
        console.log('Value:', {
          uri: image.uri,
          name: image.fileName,
          type: image.type,
        });
      });

      


      
    }

    try {
      const response = await api.post('/api/healthreport/receive', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully:', response.data);
      alert('Health Report Submitted Successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit Health Report. Please try again.');
    }
  };



  useEffect(() => {

    fetchData2();
  }, []);

  useEffect(() => {
    if (companyId) {
      fetchData3(companyId);

    }
  }, [companyId]);


  useEffect(() => {
    if (branchId) {
      fetchData5(branchId);
      console.log('abc', branchId);

    }
  }, [branchId]);






  const fetchData2 = async () => {
    try {
      const response = await api.get('/api/dropdown/company'); // API endpoint for picker 2
      setData2(response.data);

    } catch (error) {
      console.error('Error fetching data2:', error);
    }
  };

  const fetchData3 = async (companyId: any) => {
    try {
      const response = await api.get(`/api/group?GroupType=Branch&BranchType=Receiving&ApprovalStatus=APPROVED&CompanyId=${companyId}`);


      setData3(response.data);


    } catch (error) {
      console.error('Error fetching data3:', error);
      console.log('else');
    }
  };
  const fetchData5 = async (branchId: any) => {
    try {
      const response = await api.get(`/api/grouplocation
        `);



      if (Array.isArray(response.data)) {
        setData5(response.data);
      } else {
        console.error('Unexpected API response format:', response.data);
        setData5([]);
      }
    } catch (error) {
      console.error('Error fetching data5:', error);
    }
  };


  const handleValueChange = (value: any, key: any) => {
    setSelectedValues(prev => ({
      ...prev,
      [key]: value
    }));

    if (key === 'picker2') {
      setCompanyId(value); // Set companyId when picker2 (Company) value changes

    }


  };


  const handleValueChanges = (id: any, key: any) => {
    setSelectedValues(prev => ({
      ...prev,
      [key]: id // id store ho rha h
    }));

    if (key === 'picker3') {
      setBranchId(id);  // FederationId set ho rha h

    }

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
      <SafeAreaView style={styles.container}>
        <Navbar />


        <ScrollView contentContainerStyle={styles.scrollView}>

          <View style={styles.HeadingContainer}>
            <Text style={styles.title}> Generate Health Report</Text>
           
          </View>


          <View style={styles.onecontainers}>

            <View style={styles.content}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedValues.picker2}
                  onValueChange={(value) => handleValueChange(value, 'picker2')}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Company" value="" />
                  {data2.map((item, idx) => (
                    <Picker.Item key={idx} label={item.text} value={item.value} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.content}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedValues.picker3}
                  onValueChange={(value) => handleValueChanges(value, 'picker3')}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Branch" value="" />
                  {data3.map((item, idx) => (
                    <Picker.Item key={idx} label={item.name} value={item.id} /> // yaha value ko id set kiya hai
                  ))}
                </Picker>
              </View>

            </View>






            <View style={styles.content}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedValues.picker5}


                  style={styles.picker}
                >
                  <Picker.Item label="Select storage location" value="" />
                  {data5.map((item, idx) => (
                    <Picker.Item key={idx} label={item.name} value={item.text} />
                  ))}
                </Picker>
              </View>
            </View>


            {/* <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={handlesubmitPress}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View> */}
          </View>


          <View style={styles.secondcontainers}>


            <TextInput
              placeholder="Enter Destination Branch"
              value={destinationBranch}
              onChangeText={setDestinationBranch}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Destination District"
              value={destinationDistrict}
              onChangeText={setDestinationDistrict}
              style={styles.input}
            />
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







          </View>


          <View style={styles.thirdcontainers}>
            <View style={styles.switchContainer}>
              <Text>Staining Colour</Text>
              <Switch
                value={stainingColour}
                onValueChange={(value) => {
                  setStainingColour(value);
                  if (!value) setStainingColourPercent('');
                }}
              />
            </View>
            {stainingColour && (
              <TextInput
                style={styles.input}
                placeholder="Staining Colour Percent"
                value={stainingColourPercent}
                onChangeText={(text) => setStainingColourPercent(text)}
                keyboardType="numeric"
              />
            )}

            <View style={styles.switchContainer}>
              <Text>Black Smat Onion</Text>
              <Switch
                value={blackSmutOnion}
                onValueChange={(value) => {
                  setBlackSmutOnion(value);
                  if (!value) setBlackSmatPercent('');
                }}
              />
            </View>
            {blackSmutOnion && (
              <TextInput
                style={styles.input}
                placeholder="Black Smat Percent"
                value={BlackSmutPercent}
                onChangeText={(text) => setBlackSmatPercent(text)}
                keyboardType="numeric"
              />
            )}

            <View style={styles.switchContainer}>
              <Text>Sprouted Onion</Text>
              <Switch
                value={sproutedOnion}
                onValueChange={(value) => {
                  setSproutedOnion(value);
                  if (!value) setSproutedPercent('');
                }}
              />
            </View>
            {sproutedOnion && (
              <TextInput
                style={styles.input}
                placeholder="Sprouted Percent"
                value={sproutedPercent}
                onChangeText={(text) => setSproutedPercent(text)}
                keyboardType="numeric"
              />
            )}

            <View style={styles.switchContainer}>
              <Text>Spoiled Onion</Text>
              <Switch
                value={spoiledOnion}
                onValueChange={(value) => {
                  setSpoiledOnion(value);
                  if (!value) setSpoiledPercent('');
                }}
              />
            </View>
            {spoiledOnion && (
              <TextInput
                style={styles.input}
                placeholder="Spoiled Percent"
                value={spoiledPercent}
                onChangeText={(text) => setSpoiledPercent(text)}
                keyboardType="numeric"
              />
            )}

            {/* OnionSkin Dropdown */}
            <View style={styles.dropdownContainer}>
              <Text>Onion Skin</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={onionSkin}
                  onValueChange={(itemValue) => setOnionSkin(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="DOUBLE" value="DOUBLE" />
                  <Picker.Item label="SINGLE" value="SINGLE" />
                </Picker>
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Onion Skin Percent"
              value={onionSkinPercent}
              onChangeText={setOnionSkinPercent}
              keyboardType="numeric"
            />

            {/* Moisture Dropdown */}
            <View style={styles.dropdownContainer}>
              <Text>Moisture</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={moisture}
                  onValueChange={(itemValue) => setMoisture(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="DRY" value="DRY" />
                  <Picker.Item label="WET" value="WET" />
                </Picker>
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Moisture Percent"
              value={moisturePercent}
              onChangeText={setMoisturePercent}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="FPC Person Name"
              value={fpcPersonName}
              onChangeText={setFpcPersonName}
            />


            <View>

              <Text>Spoiled</Text>

              <Switch
                value={isSpoiledPercentVisible}
                onValueChange={setIsSpoiledPercentVisible}
              />

              {isSpoiledPercentVisible && (
                <TextInput
                  style={styles.input}
                  placeholder="Spoiled Percent"
                  value={SpoliedPercent}
                  onChangeText={setSpoliedPercent}
                  keyboardType="numeric"
                />
              )}

              <TextInput
                style={styles.input}
                placeholder="Branch Person name"
                value={SpoliedBranch}
                onChangeText={setSpoliedBranch}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Type Comments"
                value={SpoliedComment}
                onChangeText={setSpoliedComment}
              />






            </View>







          </View>


          <Button title="Capture Weightment Slip" onPress={openCamera} />

          {imageUri.length > 0 &&
      imageUri.map((img, index) => (
        <Image key={index} source={{ uri: img.uri }} style={styles.image} />
      ))}

          <Button title="Submit" onPress={handleSubmit} />

        </ScrollView>


      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  HeadingContainer: {

    paddingLeft: 30,
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black', // Nice blue shade
  },

  onecontainers: {
    backgroundColor: '#fffff'
  },
  secondcontainers: {
    padding: 20
  },

  thirdcontainers: {
    padding: 20
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  phototcontainer: {
    width: 80,
    height: 80,

    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red'


  },
  topRightImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 70,  // Reduce width
    height: 75,


  },
  pickerContainer: {
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F6A001',
    width: '94%',
    height: 50,
    paddingHorizontal: 13,
    backgroundColor: '#ffffff',
    elevation: 14, // Android ke liye shadow
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 6 }, // Yaha height adjust karke direction control kar sakte ho
    shadowOpacity: 0.3,
    shadowRadius: 6,
  }
  ,
  picker: {
    paddingHorizontal: 10,
    borderColor: '#007BFF',
    shadowColor: '#000',
    shadowRadius: 5,
    elevation: 15
  },
  dropdown: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    paddingHorizontal: 12,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50, // Match the height of the text inputs
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#FF9500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',

    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  bottomLeftImage: {
    position: 'absolute',
    bottom: 1,
    left: '50%',
    transform: [{ translateX: -35 }],


  },
  circleTopLeft: {
    flex: 1,
    position: "absolute",
    top: -50,
    right: -40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "red",


  },

  photobottomtcontainer: {
    position: 'absolute',
    bottom: 1,
    left: '50%',
    transform: [{ translateX: -42 }],
    width: 60,
    height: 60,

  },
  loader: {
    marginTop: 50
  },

  input: {
    height: 50,
  
    borderWidth: 1,

    

    borderColor: '#F6A001',
    borderRadius: 30,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    width: '100%',
   
    paddingHorizontal: 13,
    backgroundColor: '#ffffff',
  },
  // button: {
  //   marginTop: 20,
  //   backgroundColor: '#0066cc',
  //   borderRadius: 10,
  //   paddingVertical: 12,
  //   alignItems: 'center',
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
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

  },
  dateText: {
    fontSize: 16,
    color: '#555',
  },

});


export default GenerateHealthReport;
