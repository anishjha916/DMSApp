import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function FileItemCard({ file, onPreview, onDownload }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{file.name}</Text>
      <Text style={styles.detail}>Type: {file.type}</Text>
      <Text style={styles.detail}>
        Date: {new Date(file.date).toLocaleDateString()}
      </Text>

      <View style={styles.actions}>
        <Button title="Preview" onPress={() => onPreview(file)} />
        <Button title="Download" onPress={() => onDownload(file)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    marginBottom: 3,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
