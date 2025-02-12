import React, { useState } from 'react';
import { StyleSheet, View, Alert, TextInput, TouchableOpacity, Image, StatusBar , ImageBackground} from 'react-native';
import { Text } from 'react-native-elements';
import api from '../service/api/apiInterceptors';
import { mmkvStorage } from '../service/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { screenWidth } from '../utils/Constants';

interface LoginAppProps {
  navigation: StackNavigationProp<any>;
}

const LoginApp: React.FC<LoginAppProps> = ({ navigation }) => {
  const [mobileno, setMobileno] = useState('9990665359');
  const [password, setPassword] = useState('Onion@2025');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobileno || !password) {
      Alert.alert('Error', 'Please enter both mobile number and password.');
      return;
    }
    if (mobileno.length !== 10 || isNaN(Number(mobileno))) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post('/api/login/assayer', { mobileno, password });
  
      if (response.status === 200) {
        const responseData = response.data;
        mmkvStorage.setItem('userinfo', JSON.stringify(responseData));
        mmkvStorage.setItem('token', responseData?.token);
        navigation.navigate('MainScreen');
  
       
  
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Password might be incorrect.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F6A001" barStyle="light-content" />
      <View style={styles.phototcontainer}>

    
      <Image source={require('../assets/Ellipse7.png')} style={styles.topRightImage} />
      </View>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>Login in to your account</Text>
       
      </View>


      
      <ImageBackground 
    source={require('../assets/Ellipse8.png')}  
    style={styles.inputBackground}
    resizeMode="contain"
  >
   
     
   
   


     <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="number-pad"
          autoCapitalize="none"
          value={mobileno}
          onChangeText={setMobileno}
          maxLength={10}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="#666" />
        </TouchableOpacity>
      </View>
      

      </ImageBackground> 

<View style={styles.view}>


      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <Text style={styles.footerText}>Don't have an account? Sign Up</Text>
      </View>

      <View style={styles.photobottomtcontainer}>
      <Image source={require('../assets/Ellipse9.png')} style={styles.bottomLeftImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,

  },

  phototcontainer :{
    width : 80,
    height : 80,
  
    position: 'absolute',
    top: 0,
    right: 0,
   

  },


  
  topRightImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 80,  // Reduce width
    height: 70,
   
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: -50,
    marginLeft: -170,
  },
  logo: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.2,
    resizeMode: 'contain',
   

  },
  logoText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginLeft: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F6A001',
    borderRadius: 28,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  input: {
    flex: 1,
    height: 50,
    padding: 10,
    fontSize: 16,
   
  },
  icon: {
    marginRight: 10,
  },
  button: {
    width: '70%',
    height: 50,
    backgroundColor: '#F6A001',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  view : {
  
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop : -30

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 15,
    color: '#888',
    fontSize: 14,
  },
  bottomLeftImage: {
    position: 'absolute',
    bottom: 1,
    left: '50%',
    transform: [{ translateX: -35 }],

   
  },

  photobottomtcontainer : {
    position: 'absolute',
    bottom: 1,
    left: '50%',
    transform: [{ translateX: -42 }],
    width: 60,
    height: 60,

  },
  inputBackground: {
    width: '100%',
    height: 350,
    justifyContent: 'center', 
    alignItems: 'center',
    

  }
});

export default LoginApp;
