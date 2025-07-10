import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, TouchableOpacity, Platform,
  Alert, Image
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import TagInput from '../components/TagInput';

export default function FileUploadScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [category, setCategory] = useState('Personal');
  const [subCategory, setSubCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [file, setFile] = useState(null);

  const personalOptions = ['John', 'Tom', 'Emily'];
  const professionalOptions = ['Accounts', 'HR', 'IT', 'Finance'];

  const openPicker = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setFile(res);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) Alert.alert('Error', 'File selection failed');
    }
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (res) => {
      if (!res.didCancel && res.assets) {
        setFile(res.assets[0]);
      }
    });
  };

  const upload = () => {
    if (!file) return Alert.alert("Missing", "Please upload a file");
    // Implement upload logic via API
    console.log({ date, category, subCategory, tags, remarks, file });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Select Date:</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker value={date} mode="date" onChange={(e, selected) => {
          setShowPicker(false);
          if (selected) setDate(selected);
        }} />
      )}

      <Text>Category:</Text>
      <Picker selectedValue={category} onValueChange={setCategory}>
        <Picker.Item label="Personal" value="Personal" />
        <Picker.Item label="Professional" value="Professional" />
      </Picker>

      <Text>Sub-Category:</Text>
      <Picker selectedValue={subCategory} onValueChange={setSubCategory}>
        {(category === 'Personal' ? personalOptions : professionalOptions).map(opt => (
          <Picker.Item key={opt} label={opt} value={opt} />
        ))}
      </Picker>

      <TagInput tags={tags} setTags={setTags} />

      <TextInput
        placeholder="Enter remarks"
        value={remarks}
        onChangeText={setRemarks}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />

      {file?.name && <Text>Selected: {file.name || file.fileName}</Text>}

      <Button title="Select File" onPress={openPicker} />
      <Button title="Use Camera" onPress={openCamera} />
      <Button title="Upload File" onPress={upload} />
    </View>
  );
}
