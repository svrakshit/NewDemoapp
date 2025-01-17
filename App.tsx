import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginApp from './MainComponent/LoginApp';
import Sidepanel from './Sidepanel/Sidepanel';

const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'LoginApp'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginApp"
        component={LoginApp} />

        <Stack.Screen name="Sidepanel" component={Sidepanel} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
