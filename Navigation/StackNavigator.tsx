import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import LoginApp from '../MainComponent/LoginApp';

import Dhasboard from '../Screens/Dhasboard';
import Drawernavigator from './Drawernavigator';
import Cards from '../Screens/Card';
import SelectFederation from '../Screens/SelectFederation';
import Navbar from '../App/Navbar';



const Stack = createStackNavigator();

export default function StackNavigator() {


  return (

    <Stack.Navigator

    initialRouteName={'LoginApp'}
    screenOptions={{ headerShown: false }}
  >
  
  <Stack.Screen name="LoginApp" component={LoginApp} />
  <Stack.Screen name="Drawernavigator" component={Drawernavigator} />
  <Stack.Screen name="Cards" component={Cards} />
  <Stack.Screen name="SelectFederation" component={SelectFederation} />
  <Stack.Screen name="Navbar" component={Navbar} />




   
    

  

 
  
  </Stack.Navigator>
  
  );
}



