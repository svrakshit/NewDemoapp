import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navbar from '../App/Navbar';
import ListApp from '../MainComponent/ListApp';



const List = () => {


    return (

        <SafeAreaView style={styles.container}>
            <Navbar navigation={undefined} />


            <ListApp />


        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});

export default List;
