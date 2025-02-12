import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native';
import Navbar from '../App/Navbar';
import api from '../service/api/apiInterceptors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Type';


type HealthReportSelection = StackNavigationProp<RootStackParamList, 'HealthReportselect'>;

const GenerateHealthReport = () => {


   const navigation = useNavigation<HealthReportSelection>(); 
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const[feddata , setfeddata] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

  const [selectedValues, setSelectedValues] = useState({
    picker1: '',
    picker2: '',
    picker3: '',
    picker6: '',
    picker4: '',
    picker5: '',
  });

  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [FederationId , setFederationId] = useState('');
  const [VendorId , setVendorId] = useState('');

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  useEffect(() => {
    if (companyId) {
      fetchData3(companyId);
      console.log('useeffect' ,companyId);
    }
  }, [companyId]);


  useEffect(() => {
    if (branchId) {
      fedfetchData(branchId);
     
    }
  }, [branchId]);

  useEffect(() => {
    if (FederationId) {
      fetchData4(FederationId);
      console.log('FederationIddata' , FederationId)
    }
  }, [FederationId]);
  
  useEffect(() => {
    if (VendorId && selectedValues.picker1) {
      fetchData5(VendorId, selectedValues.picker1);
      console.log('last picker' ,VendorId, selectedValues.picker1 );
    }
  }, [VendorId, selectedValues.picker1]);
  

  const fetchData1 = async () => {
    try {
      const response = await api.get('/api/enum/StorageType'); // API endpoint for picker 1
      setData1(response.data);
 
    } catch (error) {
      console.error('Error fetching data1:', error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await api.get('/api/dropdown/company'); // API endpoint for picker 2
      setData2(response.data);
     
    } catch (error) {
      console.error('Error fetching data2:', error);
    }
  };

  const fetchData3 = async (companyId : any) => {
    try {
      const response = await api.get(`/api/group?GroupType=Branch&BranchType=Procuring&ApprovalStatus=APPROVED&CompanyId=${companyId}`);
      
      
      setData3(response.data);
      console.log('branddata' ,response.data);
     
    } catch (error) {
      console.error('Error fetching data3:', error);
      console.log('else');
    }
  };


  const fedfetchData = async (branchId: any) => {
    try {
      const response = await api.get(`/api/group?GroupType=Federation&ApprovalStatus=APPROVED&BranchId=${branchId}`)
      setfeddata(response.data);
      console.log('branchid', response.data);
 
    } catch (error) {
      console.error('Error fetching data4:', error);
   
    }
  };


  const fetchData4 = async (FederationId: any) => {
    try {
      const response = await api.get(`/api/group?GroupType=Vendor&ApprovalStatus=APPROVED&FederationId=${FederationId}`);
      setData4(response.data);

 
    } catch (error) {
      console.error('Error fetching data4:', error);
   
    }
  };
  const fetchData5 = async (VendorId: any, value: any) => {
    try {
      const response = await api.get(`/api/storagelocation?GroupId=${VendorId}&StorageType=${value}&ApprovalStatus=APPROVED`);
      
      if (Array.isArray(response.data)) {
        setData5(response.data);
      } else {
        console.error('Unexpected API response format:', response.data);
        setData5([]);
      }
  
      console.log('Storage location:', response.data);
    } catch (error) {
      console.error('Error fetching data5:', error);
    }
  };
  
  
  
  
  

  const handleValueChange = (value : any , key : any) => {
    setSelectedValues(prev => ({
      ...prev,
      [key]: value
    }));

    if (key === 'picker2') {
      setCompanyId(value); // Set companyId when picker2 (Company) value changes
      console.log('shgdyddjks' ,  value);
    }

   
  };

  
  const handleValueChanges = (id: any, key: any) => {
    setSelectedValues(prev => ({
      ...prev,
      [key]: id // id store ho rha h
    }));
  
    if (key === 'picker3') {
      setBranchId(id);  // FederationId set ho rha h
      console.log('branchid', id);
    }


    if (key === 'picker6') {
      setFederationId(id);  // FederationId set ho rha h
      console.log('federation', id);
    }




   
  };




  const handlepicker4Changes = (id: any, key: any) => {
    setSelectedValues(prev => ({
      ...prev,
      [key]: id // id store ho rha h
    }));
  
    if (key === 'picker4') {
      setVendorId(id); // FederationId set ho rha h
      console.log('Vendorid', id);
    }
  };
  


  const handlesubmitPress = () => {
    navigation.navigate('HealthReportselect');  // Now TypeScript knows about this screen




  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar navigation={undefined} />

      <View style={styles.content}>
        <Picker
          selectedValue={selectedValues.picker1}
          onValueChange={(value) => handleValueChange(value, 'picker1')}
          style={styles.picker}
        >
          <Picker.Item label="Select Type" value="" />
          {data1.map((item, idx) => (
            <Picker.Item key={idx} label={item.text} value={item.value} />
          ))}
        </Picker>
      </View>

      <View style={styles.content}>
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

      <View style={styles.content}>
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


      <View style={styles.content}>
      <Picker
  selectedValue={selectedValues.picker3}
  onValueChange={(value) => handleValueChanges(value, 'picker6')}
  style={styles.picker}
>
  <Picker.Item label="Select Federation" value="" />
  {feddata.map((item, idx) => (
    <Picker.Item key={idx} label={item.name} value={item.id} /> // yaha value ko id set kiya hai
  ))}
</Picker>

      </View>

      <View style={styles.content}>
        <Picker
          selectedValue={selectedValues.picker4}
          onValueChange={(value) =>handlepicker4Changes(value, 'picker4')}
          style={styles.picker}
        >
          <Picker.Item label="Select FPC" value="" />
          {data4.map((item, idx) => (
            <Picker.Item key={idx} label={item.name} value={item.id} />
          ))}
        </Picker>
      </View>



      <View style={styles.content}>
        <Picker
          selectedValue={selectedValues.picker5}
      
          style={styles.picker}
        >
          <Picker.Item label="Select storage location" value="" />
          {data5.map((item, idx) => (
            <Picker.Item key={idx} label={item.name} value={item.value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button}  onPress={handlesubmitPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F7FA', 
    
  },
  content: { 
    alignItems: 'center', 
    justifyContent: 'center', 

    padding : 20
  },
  picker: { 
    width: '100%', 
    height: 50, 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent effect
    borderRadius: 10, 
    paddingHorizontal: 12, 
    borderWidth: 1, 
    borderColor: '#007BFF', 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 5, 
    elevation: 3 
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
  dropdownText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  button: { 
    backgroundColor: '#007BFF', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    width: '100%', 
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
  loader: { 
    marginTop: 50 
  }
});


export default GenerateHealthReport;
