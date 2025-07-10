import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to DMS App 📁</Text>

      <View style={styles.button}>
        <Button title="Upload File" onPress={() => navigation.navigate('FileUpload')} />
      </View>

      <View style={styles.button}>
        <Button title="Search Files" onPress={() => navigation.navigate('Search')} />
      </View>

      <View style={styles.button}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
  },
  button: {
    marginVertical: 10,
  },
});
