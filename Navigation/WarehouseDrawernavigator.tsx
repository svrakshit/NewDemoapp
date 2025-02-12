import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Dhasboard from '../Screens/WarehouseDhasboard';
import Profile from '../Screens/Profile';
import List from '../Screens/List';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


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

export default function WarehouseDrawernavigator() {
  return (
    <Drawer.Navigator
         id={undefined}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '',
        },
        headerTintColor: '#fff',
        drawerStyle: {
          backgroundColor: '#F5F5F5',
          width: 280,
          
        },
        drawerActiveTintColor: '#7F265B',
        drawerInactiveTintColor: 'grey',
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
         
        },
      }}
    >
      <Drawer.Screen name="Dhasboard" component={Dhasboard} options={{ headerShown: false,
 drawerIcon: ({ color}) => (
  <MaterialIcons name="dashboard" size={30} color={color} />
),

       }} />
    <Drawer.Screen 
  name="Warehouse Checklist" 
  component={Profile} 
  options={{ 
    headerShown: false,
    drawerIcon: ({ color }) => (
      <MaterialIcons name="warehouse" size={30} color={color} />
    
    ),
  }} 
/>

      <Drawer.Screen name="Update Warehouse Checklist" component={List} options={{ headerShown: false

,
drawerIcon: ({ color }) => (
  <MaterialIcons name="edit" size={30} color={color} />
),
       }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  logoutContainer: {
    marginTop: 'auto',
   alignItems : 'center'

    
   
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent : 'center',
    width : 140,
    backgroundColor : 'orange',
   
   
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#6200EE',
    fontSize: 16,
    marginLeft: 10,
  },
});
