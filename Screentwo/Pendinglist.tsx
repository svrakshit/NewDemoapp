import React from 'react';
import {  SafeAreaView ,  StyleSheet , Text } from 'react-native';
import Navbar from '../App/Navbar';

const Pendinglist = () => {
  return (
   <SafeAreaView >
    <Navbar navigation={undefined} />
          <Text>Pending list</Text>

   </SafeAreaView>
   
 
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
})
export default Pendinglist;
