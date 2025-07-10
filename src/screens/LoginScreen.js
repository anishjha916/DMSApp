import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://<YOUR_IP>:3000/send-otp', { phone });
      Alert.alert('Success', 'OTP sent successfully');
      navigation.navigate('OTP', { phone });
    } catch (err) {
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Mobile Number:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Send OTP" onPress={sendOtp} />
    </View>
  );
}
