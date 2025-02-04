import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DispatchDhasboard from '../Screenthree/DispatchDhasboard';
import GenerateHealthReport from '../Screenthree/GenerateHealthReport';
import HealthReportlist from '../Screenthree/HealthReportlist';








const Drawer = createDrawerNavigator();




export default function  DispatchDrawernavigator() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
 
    
      <Drawer.Navigator
      initialRouteName="DispatchDhasboard"
      
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
        name="DispatchDhasboard"
        options={{
          headerShown: false,
        
        }}
        component={DispatchDhasboard}
      />
      <Drawer.Screen
        name="GenerateHealthReport"
        options={{
          headerShown: false,
        
        }}
        component={GenerateHealthReport}
      />


<Drawer.Screen
        name="HealthReportlist"
        options={{
          headerShown: false,
         
        }}
        component={HealthReportlist}
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
