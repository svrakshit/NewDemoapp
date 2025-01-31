import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';
import api from '../service/api/apiInterceptors';
import { mmkvStorage } from '../service/storage';
import auth from '@react-native-firebase/auth';
;
import { StackNavigationProp } from '@react-navigation/stack';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

interface LoginAppProps {
  navigation: StackNavigationProp<any>; 
}

const  LoginApp: React.FC<LoginAppProps> = ({ navigation }) => {
  const [mobileno, setMobileno] = useState('9990665359');
  const [password, setPassword] = useState('Password@123');
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
        navigation.navigate('Drawernavigator');
        

   
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

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: '528873498711-nchsodfmf1j053rs1vgn51l2taal52ji.apps.googleusercontent.com', // Replace with your Firebase Web Client ID
    });
  }, []);
  const handleGoogleLogin = async () => {
    try {
      // console.log('Checking Google Play services...');
      await GoogleSignin.hasPlayServices();
      // console.log('Google Play services available.');

      // console.log('Signing out the current user if already signed in...');
      await GoogleSignin.signOut(); // Sign out the current user first

      console.log('Prompting user to select a Google account...');
      const userInfo = await GoogleSignin.signIn(); // User is prompted to choose from available accounts
      console.log('Google sign-in successful:', userInfo);

      // Get tokens
      const tokens = await GoogleSignin.getTokens();
      const idToken = tokens.idToken; // Access the idToken
      console.log('ID Token:', idToken);

      // Ensure idToken is not undefined
      if (!idToken) {
        console.log('idToken not found');
        return;
      }

      // Use the idToken to authenticate with Firebase
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);

      console.log('User signed in:', user);
      navigation.navigate('Sidepanel');
    } catch (error) {
      console.log('Google Sign-In Error:', error);
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


      <GoogleSigninButton
        style={styles.googleButton}
       
        color={GoogleSigninButton.Color.Dark}
     
        onPress={handleGoogleLogin}
      />



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
