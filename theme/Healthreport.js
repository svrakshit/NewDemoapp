// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    image: {
      width: 120,
      height: 120,
      marginTop: 10,
      alignSelf: 'center',
      borderRadius: 10,
    },
    HeadingContainer: {
  
      paddingLeft: 30,
  
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'black', // Nice blue shade
    },
  
    onecontainers: {
      backgroundColor: '#fffff',
      // backgroundColor: 'red',
      paddingVertical : 40
    
    },
    secondcontainers: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    thirdcontainers: {
      padding: 20
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
    },
  
    phototcontainer: {
      width: 80,
      height: 80,
  
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'red'
  
  
    },
    topRightImage: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 70,  // Reduce width
      height: 75,
  
  
    },
    pickerContainer: {
      borderRadius: 40,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#F6A001',
      width: '85%',
      height: 45,
      paddingHorizontal: 5,
      backgroundColor: '#ffffff',
      elevation: 20, // Android ke liye shadow
      shadowColor: 'gray',
      shadowOffset: { width: 0, height: 6 }, // Yaha height adjust karke direction control kar sakte ho
      shadowOpacity: 0.3,
      shadowRadius: 6,
      justifyContent : 'center',
      textAlign : 'center'
    }

    ,
    picker: {
      
      borderColor: '#007BFF',
      shadowColor: '#000',
      shadowRadius: 5,
      elevation: 15,
     
      width: '100%',

    },
    dropdown: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#007BFF',
      paddingHorizontal: 12,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    dropdownContainer: {
      marginBottom: 15,
    },
    pickerWrapper: {
      backgroundColor: '#fff',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#ccc',
      height: 45, // Match the height of the text inputs
      justifyContent: 'center',
      borderRadius: 40,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#F6A001',
      width: '95%',
      height: 50,
      marginTop : 10
    },
    dropdownText: {
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
    },
    button: {
      backgroundColor: '#FF9500',
      padding: 15,
      borderRadius: 40,
      alignItems: 'center',
     
  
      width: '80%',

      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 4,
      marginTop : 10,
      marginBottom : 20
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    },

      
    buttoncontent : {

      width: '100%',

      justifyContent: 'center', // Centers content vertically if `flex: 1` is set
      alignItems: 'center', // Centers content horizontally
      flex: 1, // Takes full height

 
      

    },
    bottomLeftImage: {
      position: 'absolute',
      bottom: 1,
      left: '50%',
      transform: [{ translateX: -35 }],
  
  
    },
    circleTopLeft: {
      flex: 1,
      position: "absolute",
      top: -50,
      right: -40,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "red",
  
  
    },
  
    photobottomtcontainer: {
      position: 'absolute',
      bottom: 1,
      left: '50%',
      transform: [{ translateX: -42 }],
      width: 60,
      height: 60,
  
    },
    loader: {
      marginTop: 50
    },
  
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#F6A001',
      borderRadius: 30,
      marginBottom: 20,
      paddingLeft: 15,
      fontSize: 16,
      width: '95%',
      paddingHorizontal: 13,
      backgroundColor: '#ffffff',
  
     
    
      // Shadow for Android (only at bottom)
      elevation: 1,

    },
  
    datePickerWrapper: {
      marginBottom: 20,
    },
    footer: {
      marginTop: 30,
      padding: 10,
      backgroundColor: '#f1f1f1',
      textAlign: 'center',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    header: {
      paddingTop: 20,
      paddingBottom: 10,
      backgroundColor: '#0066cc',
      alignItems: 'center',
    },
    headerText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    scrollView: {
  
    },
    dateText: {
      fontSize: 16,
      color: '#555',
    },
    text : {
      fontSize: 17,
  
    color: '#000', // Staining color
    }
  
  });

export default styles;
