import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function TagInput({ tags, setTags }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get('http://<YOUR_IP>:3000/tags').then(res => setSuggestions(res.data));
  }, []);

  const addTag = () => {
    if (input && !tags.includes(input)) {
      setTags([...tags, input]);
      axios.post('http://<YOUR_IP>:3000/tags', { tag: input }); // Save new tag
    }
    setInput('');
  };

  return (
    <View>
      <TextInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={addTag}
        placeholder="Add tags"
        style={{ borderBottomWidth: 1 }}
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
        {tags.map(tag => (
          <Text key={tag} style={{ backgroundColor: '#ddd', margin: 2, padding: 5 }}>{tag}</Text>
        ))}
      </View>
    </View>
  );
}
