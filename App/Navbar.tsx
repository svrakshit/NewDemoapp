import React, { useContext } from 'react';
import { StyleSheet, Alert, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MMKV } from 'react-native-mmkv';

// Initialize MMKV
const storage = new MMKV();

const Navbar: React.FC = () => {
  const navigation = useContext(NavigationContext);
  const currentRouteName = navigation?.getState().routes[navigation.getState().index].name;

  const handleMenuPress = () => {
    if (navigation) {
      navigation.dispatch(DrawerActions.openDrawer());
    }
  };

  const handleLogoutPress = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: processLogout },
    ]);
  };

  const processLogout = () => {
    try {
      storage.delete('userToken');
      console.log('User logged out successfully');
      if (navigation) {
        navigation.reset({ routes: [{ name: 'LoginApp' }] });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.leftComponent}>
          <MaterialIcons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.centerComponent}>
          <Text style={styles.headerTitle}>{currentRouteName}</Text>
        </View>
        <TouchableOpacity onPress={handleLogoutPress} style={styles.rightComponent}>
          <MaterialIcons name="logout" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.circleBackground} /> {/* Circle Background */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F79B00',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  leftComponent: {
    flex: 1,
  },
  centerComponent: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightComponent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  circleBackground: {
    backgroundColor: '#F6A00191',
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'relative',
    top: -35,
    left: 310,
    zIndex: -1,
  },
});

export default Navbar;
