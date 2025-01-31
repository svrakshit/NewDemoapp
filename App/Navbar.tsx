import React, { useContext } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Header as HeaderRNE } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from './Text'; // Import custom Text component
import { MMKV } from 'react-native-mmkv';
import { NavigationContext } from '../App'; // Ensure NavigationContext is correctly imported
import { DrawerActions } from '@react-navigation/native';

// Initialize MMKV
const storage = new MMKV();

const Navbar: React.FC = () => {
  const navigation = useContext(NavigationContext); // Using the navigation context here
  const route = useRoute();
  const currentRouteName = route.name;

  const handleMenuPress = () => {
    if (navigation) {
      navigation.dispatch(DrawerActions.openDrawer());  // Opening the drawer
    }
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
      storage.delete('userToken'); // Correct method for deleting an item
      console.log('User logged out successfully');
      
      // Use reset to navigate to the Login screen and clear the navigation stack
      if (navigation) {
        navigation.reset({
          routes: [{ name: 'LoginApp' }],
        });
      }

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
          onPress: handleMenuPress, // Open the drawer
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
