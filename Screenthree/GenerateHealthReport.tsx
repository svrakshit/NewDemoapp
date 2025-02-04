import React from 'react';
import {  SafeAreaView ,  StyleSheet , Text } from 'react-native';
import Navbar from '../App/Navbar';

const GenerateHealthReport = () => {
  return (
   <SafeAreaView >
    <Navbar navigation={undefined} />
          <Text>GenerateHealthReport</Text>

   </SafeAreaView>
   
 
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
})
export default GenerateHealthReport;
