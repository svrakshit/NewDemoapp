import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navbar from '../App/Navbar';
import MainHome from '../MainComponent/MainHome';



const Home = () => {


    return (

        <SafeAreaView style={styles.container}>
            <Navbar />
               
            <MainHome />



        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});

export default Home;
