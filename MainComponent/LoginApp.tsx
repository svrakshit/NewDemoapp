import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Firebase auth import karein

const LoginApp = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '528873498711-nchsodfmf1j053rs1vgn51l2taal52ji.apps.googleusercontent.com', // Web Client ID
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log('User logged in:', userCredential.user);
          console.log(response?.url);

        })
        .catch((error) => {
          console.log('Error during login:', error.message);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => promptAsync()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginApp;
