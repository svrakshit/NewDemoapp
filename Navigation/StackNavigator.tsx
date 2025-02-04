import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import LoginApp from '../MainComponent/LoginApp';


import WarehouseDrawernavigator from './WarehouseDrawernavigator';
import Cards from '../Screens/Card';
import SelectFederation from '../Screens/SelectFederation';
import MainScreen from '../MainComponent/MainScreen';
import AssyingDrawernavigator from './AssyingDrawernavigator';
import Navbar from '../App/Navbar';
import SwitchScreens from '../MainComponent/SwitchScreens';
import DispatchDrawernavigator from './DispatchDrawernavigator';
import RecieveDrawernavigator from './RecieveDrawernavigator';



const Stack = createStackNavigator();

export default function StackNavigator() {


  return (

    <Stack.Navigator
    id={undefined} 

    initialRouteName={'MainScreen'}
    screenOptions={{ headerShown: false }}
 
  >
  
  <Stack.Screen name="LoginApp" component={LoginApp} />


  <Stack.Screen name="WarehouseDrawernavigator" component={WarehouseDrawernavigator} />
  <Stack.Screen name="AssyingDrawernavigator" component={AssyingDrawernavigator} />
  <Stack.Screen name="DispatchDrawernavigator" component={DispatchDrawernavigator} />
  <Stack.Screen name="RecieveDrawernavigator" component={RecieveDrawernavigator} />
  <Stack.Screen name="Cards" component={Cards} />
  <Stack.Screen name="SelectFederation" component={SelectFederation}   />
  <Stack.Screen name="MainScreen" component={MainScreen}   />
  <Stack.Screen name="Navbar" component={Navbar}   />
  <Stack.Screen name=" SwitchScreens" component={SwitchScreens}   />





   
    

  

 
  
  </Stack.Navigator>
  
  );
}



