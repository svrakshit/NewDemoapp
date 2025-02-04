import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navbar from '../App/Navbar';


const Login = () => {


    return (

        <SafeAreaView style={styles.container}>
            <Navbar navigation={undefined} />
            
       
     
    


        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});

export default Login;
