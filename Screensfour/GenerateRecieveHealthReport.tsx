import React from 'react';
import {  SafeAreaView ,  StyleSheet , Text } from 'react-native';
import Navbar from '../App/Navbar';

const GenerateRecieveHealthReport = () => {
  return (
   <SafeAreaView >
    <Navbar navigation={undefined} />
          <Text>Generate Recieve Health Report</Text>

   </SafeAreaView>
   
 
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
})
export default GenerateRecieveHealthReport;
