import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navbar from '../App/Navbar';
import Cards from './Card';




const Dhasboard = () => {


    return (

        <SafeAreaView style={styles.container}>
            <Navbar />
            
    <Cards/>
               
      



        </SafeAreaView>
    




    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});

export default Dhasboard;
