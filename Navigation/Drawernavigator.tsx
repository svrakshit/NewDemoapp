import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dhasboard from '../Screens/Dhasboard';
import Profile from '../Screens/Profile';
import List from '../Screens/List';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';






const Drawer = createDrawerNavigator();




export default function Drawernavigator() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
 
    
      <Drawer.Navigator
      initialRouteName="Dhasboard"
      
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
        name="Dhasboard"
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
       
        }}
        component={Dhasboard}
      />
      <Drawer.Screen
        name="Profile"
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>👤</Text>
          ),
        }}
        component={Profile}
      />
      <Drawer.Screen
        name="List"
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>📋</Text>
          ),
        }}
        component={List}
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
