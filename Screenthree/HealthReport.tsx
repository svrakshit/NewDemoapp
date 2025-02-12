import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

const HealthReport = ({ route, navigation }) => {
  // Existing state variables
  const [stainingColour, setStainingColour] = useState(false);
  const [stainingColourPercent, setStainingColourPercent] = useState('');
  
  const [blackSmutOnion, setBlackSmatOnion] = useState(false);
  const [BlackSmutPercent, setBlackSmatPercent] = useState('');
  
  const [sproutedOnion, setSproutedOnion] = useState(false);
  const [sproutedPercent, setSproutedPercent] = useState('');
  
  const [spoiledOnion, setSpoiledOnion] = useState(false);
  const [spoiledPercent, setSpoiledPercent] = useState('');

  // New state variables for OnionSkin and Moisture
  const [onionSkin, setOnionSkin] = useState('DOUBLE');
  const [moisture, setMoisture] = useState('DRY');
  const [onionSkinPercent, setOnionSkinPercent] = useState('');
  const [moisturePercent, setMoisturePercent] = useState('');

  // New field for FPC Person Name
  const [fpcPersonName, setFpcPersonName] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      // Reset state when screen is focused
      setStainingColour(false);
      setStainingColourPercent('');
      setBlackSmatOnion(false);
      setBlackSmatPercent('');
      setSproutedOnion(false);
      setSproutedPercent('');
      setSpoiledOnion(false);
      setSpoiledPercent('');
      // setOnionSkin('NONE');
      // setMoisture('NONE');
      setOnionSkin('DOUBLE');
      setMoisture('DRY');
      setOnionSkinPercent('');
      setMoisturePercent('');
      setFpcPersonName('');
    }, [])
  );

  const handleNext = () => {
    // Validation logic
    if (
      (stainingColour && !stainingColourPercent) ||
      (blackSmutOnion && !BlackSmutPercent) ||
      (sproutedOnion && !sproutedPercent) ||
      (spoiledOnion && !spoiledPercent) ||
      !onionSkinPercent ||
      !moisturePercent ||
      !fpcPersonName
    ) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Combine the previous screen's data with this screen's data and navigate to the next screen
    const previousData = route.params || {};
    const currentData = {
      stainingColour,
      stainingColourPercent,
      blackSmutOnion,
      BlackSmutPercent,
      sproutedOnion,
      sproutedPercent,
      spoiledOnion,
      spoiledPercent,
      onionSkin,
      onionSkinPercent,
      moisture,
      moisturePercent,
      fpcPersonName,
    };

    navigation.navigate('PhotoClick', {
      ...previousData,
      ...currentData,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.switchContainer}>
          <Text>Staining Colour</Text>
          <Switch
            value={stainingColour}
            onValueChange={(value) => {
              setStainingColour(value);
              if (!value) setStainingColourPercent('');
            }}
          />
        </View>
        {stainingColour && (
          <TextInput
            style={styles.input}
            placeholder="Staining Colour Percent"
            value={stainingColourPercent}
            onChangeText={(text) => setStainingColourPercent(text)}
            keyboardType="numeric"
          />
        )}

        <View style={styles.switchContainer}>
          <Text>Black Smat Onion</Text>
          <Switch
            value={blackSmutOnion}
            onValueChange={(value) => {
              setBlackSmatOnion(value);
              if (!value) setBlackSmatPercent('');
            }}
          />
        </View>
        {blackSmutOnion && (
          <TextInput
            style={styles.input}
            placeholder="Black Smat Percent"
            value={BlackSmutPercent}
            onChangeText={(text) => setBlackSmatPercent(text)}
            keyboardType="numeric"
          />
        )}

        <View style={styles.switchContainer}>
          <Text>Sprouted Onion</Text>
          <Switch
            value={sproutedOnion}
            onValueChange={(value) => {
              setSproutedOnion(value);
              if (!value) setSproutedPercent('');
            }}
          />
        </View>
        {sproutedOnion && (
          <TextInput
            style={styles.input}
            placeholder="Sprouted Percent"
            value={sproutedPercent}
            onChangeText={(text) => setSproutedPercent(text)}
            keyboardType="numeric"
          />
        )}

        <View style={styles.switchContainer}>
          <Text>Spoiled Onion</Text>
          <Switch
            value={spoiledOnion}
            onValueChange={(value) => {
              setSpoiledOnion(value);
              if (!value) setSpoiledPercent('');
            }}
          />
        </View>
        {spoiledOnion && (
          <TextInput
            style={styles.input}
            placeholder="Spoiled Percent"
            value={spoiledPercent}
            onChangeText={(text) => setSpoiledPercent(text)}
            keyboardType="numeric"
          />
        )}

        {/* New OnionSkin Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text>Onion Skin</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={onionSkin}
              onValueChange={(itemValue) => setOnionSkin(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="DOUBLE" value="DOUBLE" />
              <Picker.Item label="SINGLE" value="SINGLE" />
            </Picker>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Onion Skin Percent"
          value={onionSkinPercent}
          onChangeText={setOnionSkinPercent}
          keyboardType="numeric"
        />

        {/* New Moisture Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text>Moisture</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={moisture}
              onValueChange={(itemValue) => setMoisture(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="DRY" value="DRY" />
              <Picker.Item label="WET" value="WET" />
            </Picker>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Moisture Percent"
          value={moisturePercent}
          onChangeText={setMoisturePercent}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="FPC Person Name"
          value={fpcPersonName}
          onChangeText={setFpcPersonName}
        />
        
        <Button
          title="Next"
          onPress={handleNext}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    padding: 20,
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,  // Match the height of the text inputs
    justifyContent: 'center',
  },
  picker: {
    height: 50,  // Match the height of the text inputs
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    height: 50,  // Ensure all inputs are the same height
  },
});

export default HealthReport;