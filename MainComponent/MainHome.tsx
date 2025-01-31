import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  , Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyCard from '../Card/Card';



const MainHome = () => {


  return (
    <SafeAreaView style={styles.container}>
    


          <MyCard/>



 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 

});

export default MainHome;
