import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navbar from '../App/Navbar';
import ProfileApp from '../MainComponent/ProfileApp';



const Profile = () => {


    return (

        <SafeAreaView style={styles.container}>
            <Navbar  navigation={undefined}/>
            <ProfileApp />

   



        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});

export default Profile;
