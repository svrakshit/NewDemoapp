import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Header as HeaderRNE } from 'react-native-elements';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from './Text'; // Import custom Text component
import { MMKV } from 'react-native-mmkv';


// Initialize MMKV
const storage = new MMKV();

// Define the type for the drawer navigator
type DrawerParamList = {
  Home: undefined; // Add other screens here if needed
  Login: undefined; // Login screen
};

const Navbar: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const route = useRoute();
  const currentRouteName = route.name;

  const handleMenuPress = () => {
    navigation.openDrawer(); // Opens the sidebar
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            processLogout();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const processLogout = () => {
    try {
      // Remove token or user data from MMKV storage
      storage.delete('userToken'); // Replace 'userToken' with your actual key
      // Navigate to Login screen
     
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaView>
      <HeaderRNE
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          onPress: handleMenuPress,
        }}
        centerComponent={
          <Text style={styles.headerTitle}>{currentRouteName}</Text>
        }
        rightComponent={{
          icon: 'home',
          color: '#fff',
          onPress: handleLogoutPress, // Logout on press
        }}
        backgroundColor="#007BFF"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Navbar;
