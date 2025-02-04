import React from 'react';
import {  SafeAreaView ,  StyleSheet , Text } from 'react-native';
import Navbar from '../App/Navbar';

const Approvedlist = () => {
  return (
   <SafeAreaView >
    <Navbar navigation={undefined} />
          <Text>Approved list</Text>

   </SafeAreaView>
   
 
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
})
export default Approvedlist;
