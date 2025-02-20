import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer: React.FC = () => {
  return (
   

      <View style={styles.circle} />
   
  );
};

const styles = StyleSheet.create({

 
  circle: {
    position: "absolute",
    bottom: -30,
    left: -50,
    width: 100,
    height: 100,
    backgroundColor: "#F6A00191",
    borderRadius: 50,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default Footer;