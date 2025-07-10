import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OtpScreen({ route, navigation }) {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://<YOUR_IP>:3000/verify-otp', {
        phone,
        otp,
      });

      if (res.data.success) {
        // Store token if you return it (mock here)
        const token = res.data.token || 'mock-token';
        await AsyncStorage.setItem('authToken', token);
        navigation.replace('Home');
      } else {
        Alert.alert('Invalid OTP');
      }
    } catch (err) {
      Alert.alert('Error verifying OTP');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter OTP"
        keyboardType="number-pad"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
        value={otp}
        onChangeText={setOtp}
      />
      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
}
