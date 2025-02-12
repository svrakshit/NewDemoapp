import React from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import Navbar from '../App/Navbar';
import Cards from './Card';

const Dhasboard = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Navbar navigation={undefined} />
          
      <Cards />

           
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
