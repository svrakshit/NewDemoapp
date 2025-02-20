import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import GenerateHealthReport from '../Screenthree/GenerateHealthReport';
import HealthReportlist from '../Screenthree/HealthReportlist';
import DispatchReportlist from '../Screenthree/DispatchReportlist';
import RecieveDhasboard from '../Screenthree/RecieveDhasboard';
import Dispatchlist from '../Screenthree/Dispatchlist';

import Recievelist from '../Screenthree/Recievelist';
import { RootStackParamList } from '../types/Type';





const Drawer = createDrawerNavigator<RootStackParamList>();

export default function DispatchDrawernavigator() {
  return (
    <Drawer.Navigator
    id = {undefined}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
      
      screenOptions={{
        headerStyle: { backgroundColor: '#6200EE' },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#FFFFFF', width: 290 },
        drawerActiveTintColor: '#6200EE',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: { fontSize: 16, fontWeight: 'bold' },
      }}
 
    >
      <Drawer.Screen
       
        name="Dhasboard"
        component={RecieveDhasboard}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => <Icon name="dashboard" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Generate Health Report"
        component={GenerateHealthReport}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => <Icon name="health-and-safety" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Health Report list"
        component={HealthReportlist}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => <Icon name="medical-services" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Dispatch Report list"
        component={DispatchReportlist}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => <Icon name="assignment" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Dispatch Truck list"
        component={Dispatchlist}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => <Icon name="local-shipping" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Recieve Truck list"
        component={Recievelist}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => <Icon name="move-to-inbox" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>

      <View style={styles.drawerFooter}>
        <Image source={require('../assets/profile.jpg')} style={styles.image} />
        <Text style={styles.footerText}>Tupac Shakur</Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}



const styles = StyleSheet.create({
  drawerFooter: {
    marginTop: 30,
  
    padding: 10,
    marginBottom : 40

  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',

  },
});
