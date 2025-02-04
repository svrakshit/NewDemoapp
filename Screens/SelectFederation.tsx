import React from "react";
import { SafeAreaView, StyleSheet } from 'react-native';
import Navbar from '../App/Navbar';
import Federation from "../MainComponent/Federation";


const SelectFederation = () => {
  return (
    <SafeAreaView style={styles.container}>
                  
                  
                  <Navbar />
    

            <Federation />
     

       


        </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

},

});

export default SelectFederation;
