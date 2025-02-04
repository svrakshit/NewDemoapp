import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';
import api from '../service/api/apiInterceptors';
import { mmkvStorage } from '../service/storage';

;
import { StackNavigationProp } from '@react-navigation/stack';


interface LoginAppProps {
  navigation: StackNavigationProp<any>; 
}

const  LoginApp: React.FC<LoginAppProps> = ({ navigation }) => {
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
        

   
        // setIsLoggedIn(true);
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
      <Text h3 style={styles.title}>
        Welcome Back!
      </Text>
      <Input
        placeholder="Mobile Number"
        leftIcon={<Icon name="call-outline" type="ionicon" color="#888" />}
        keyboardType="number-pad"
        autoCapitalize="none"
        value={mobileno}
        onChangeText={setMobileno}
        containerStyle={styles.inputContainer}
        maxLength={10}
      />
      <Input
        placeholder="Password"
        leftIcon={<Icon name="key-outline" type="ionicon" color="#888" />}
        rightIcon={
          <Icon
          
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            type="ionicon"
            color="#888"
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
        secureTextEntry={!passwordVisible}
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.inputContainer}
      />
      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        buttonStyle={styles.loginButton}
        disabled={isLoading}
      />
      <Text style={styles.footerText}>Don't have an account? Sign Up</Text>





    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
    // borderWidth: 1, // Border for definition
    // borderColor: '#ccc',
  },
  loginButton: {
    backgroundColor: 'blue',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 10,
    width: '45%',
  },
  footerText: {
    marginTop: 15,
    color: '#888',
    fontSize: 14,
  },
  googleButton: {
    width: 230,
    height: 48,
  },
});

export default LoginApp;
