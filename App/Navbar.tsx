import React, { useContext } from 'react';
import { StyleSheet, Alert, View, TouchableOpacity } from 'react-native';
import { Header as HeaderRNE } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from './Text'; // Import custom Text component
import { MMKV } from 'react-native-mmkv';
import { NavigationContext } from '@react-navigation/native'; // Ensure this is correctly imported
import { DrawerActions } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
// Initialize MMKV
const storage = new MMKV();

// Define RootStackParamList with all your screens
type RootStackParamList = {
  AssyingDrawernavigator: undefined; // Define your screens here
  LoginApp : undefined;
  WarehouseDrawernavigator : undefined;
  DispatchDrawernavigator : undefined;
  RecieveDrawernavigator :  undefined;

  
  // other screens
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

const Navbar: React.FC<Props> = () => {
  // Typecast NavigationContext to NavigationProp
  const navigation = useContext(NavigationContext) as NavigationProp<RootStackParamList>;

  const route = useRoute();
  const currentRouteName = route.name;

  const [selectedScreen, setSelectedScreen] = React.useState('');

  const handleSelectScreen = (value: string) => {
    setSelectedScreen(value);
    if (value === 'AssyingDrawernavigator') {
      navigation.navigate('AssyingDrawernavigator');
    }
    if (value === 'WarehouseDrawernavigator') {
      navigation.navigate('WarehouseDrawernavigator');
    }

    if (value === 'DispatchDrawernavigator') {
      navigation.navigate('DispatchDrawernavigator');
    }
  if (value === 'RecieveDrawernavigator') {
      navigation.navigate('RecieveDrawernavigator');
    }
  };

  const handleMenuPress = () => {
    if (navigation) {
      navigation.dispatch(DrawerActions.openDrawer()); // Opening the drawer
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
        rightComponent={
          <View style={styles.rightComponentContainer}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedScreen}
                onValueChange={handleSelectScreen}
                style={styles.picker}
              >
                <Picker.Item label="Assying" value="AssyingDrawernavigator" />
                <Picker.Item label="Warehouse Checklist" value="WarehouseDrawernavigator" />
                <Picker.Item label="Dispatch Health Report" value="DispatchDrawernavigator" />
                <Picker.Item label="Recieve Health Report" value="RecieveDrawernavigator" />
              </Picker>
            </View>
            <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutButton}>
            <MaterialIcons name="logout" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        }
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
  rightComponentContainer: {
    flexDirection: 'row',
   

  },
  pickerContainer: {
    width: 50,
  
   
  },
  picker: {
    height: 40,
    color: '#fff',
  },
  logoutButton: {
    marginLeft: 10,
    padding: 5,
  
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Navbar;
