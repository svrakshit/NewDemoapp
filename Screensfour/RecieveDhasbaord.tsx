import React from 'react';
import {  SafeAreaView ,  StyleSheet , Text } from 'react-native';
import Navbar from '../App/Navbar';

const RecieveDhasbaord = () => {
  return (
   <SafeAreaView >
    <Navbar navigation={undefined} />
          <Text>Recieve Dhasbaord</Text>

   </SafeAreaView>
   
 
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',

    },
})
export default RecieveDhasbaord;
