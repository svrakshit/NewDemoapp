import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import GenerateRecieveHealthReport from '../Screensfour/GenerateRecieveHealthReport';
import RecieveDhasbaord from '../Screensfour/RecieveDhasbaord';
import RecieveHealthReport from '../Screensfour/RecieveHealthReport';









const Drawer = createDrawerNavigator();




export default function RecieveDrawernavigator() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (


    <Drawer.Navigator
      initialRouteName="RecieveDhasbaord"

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
        name="RecieveDhasbaord"
        options={{
          headerShown: false,

        }}
        component={RecieveDhasbaord}
      />
      <Drawer.Screen
        name="GenerateRecieveHealthReport"
        options={{
          headerShown: false,

        }}
        component={GenerateRecieveHealthReport}
      />


      <Drawer.Screen
        name="RecieveHealthReport"
        options={{
          headerShown: false,

        }}
        component={RecieveHealthReport}
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
});
