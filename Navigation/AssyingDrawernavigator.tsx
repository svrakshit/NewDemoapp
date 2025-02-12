import React, { useState } from 'react';
import { View, Text, StyleSheet ,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator , DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import Approvedlist from '../Screentwo/Approvedlist';
import Pendinglist from '../Screentwo/Pendinglist';
import Rejectedlist from '../Screentwo/Rejectedlist';
import AssyingDhasboard from '../Screentwo/AssyingDhasboard';







const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Top Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      
      {/* Drawer Items */}
      <DrawerItemList {...props} />
      
      {/* Bottom Logout Button */}
      {/* <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Logout pressed') }>
          <MaterialIcons name="logout" size={24} color="#6200EE" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View> */}
    </DrawerContentScrollView>
  );
}





export default function AssyingDrawernavigator() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (


    <Drawer.Navigator
      initialRouteName="AssyingDhasboard"

      id={undefined}  // Add this line

      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200EE',
        },
        headerTintColor: '#fff',
        drawerStyle: {
          backgroundColor: '#F5F5F5',
          width: 240,
        },
        drawerActiveTintColor: '#6200EE',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}

    >



      <Drawer.Screen
        name="AssyingDhasboard"
        options={{
          headerShown: false,

        }}
        component={AssyingDhasboard}
      />

      <Drawer.Screen
        name="Approvedlist"
        options={{
          headerShown: false,

        }}
        component={Approvedlist}
      />



      <Drawer.Screen
        name="Pendinglist"
        options={{
          headerShown: false,

        }}
        component={Pendinglist}
      />


      <Drawer.Screen
        name="Rejectedlist"
        options={{
          headerShown: false,

        }}
        component={Rejectedlist}
      />











    </Drawer.Navigator>


  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  logoContainer: {
    alignItems: 'center',
    padding: 20,
  },
});
