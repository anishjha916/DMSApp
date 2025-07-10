import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import TagInput from '../components/TagInput';
import { useNavigation } from '@react-navigation/native';
import FileItemCard from '../components/FileItemCard';

export default function SearchScreen() {
  const navigation = useNavigation();

  const [category, setCategory] = useState('Personal');
  const [subCategory, setSubCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [results, setResults] = useState([]);

  const personalOptions = ['John', 'Tom', 'Emily'];
  const professionalOptions = ['Accounts', 'HR', 'IT', 'Finance'];

  const searchFiles = async () => {
    try {
      const res = await axios.post('http://<YOUR_IP>:3000/search-files', {
        category,
        subCategory,
        tags,
        fromDate,
        toDate,
      });
      setResults(res.data.files);
    } catch (err) {
      console.error(err);
      Alert.alert('Search Failed', 'Try again later');
    }
  };

  const previewFile = file => {
    navigation.navigate('Preview', { file });
  };

  const downloadFile = async file => {
    // To be implemented with react-native-fs or WebView
    Alert.alert('Download', `Downloading ${file.name}`);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Category:</Text>
      <Picker selectedValue={category} onValueChange={setCategory}>
        <Picker.Item label="Personal" value="Personal" />
        <Picker.Item label="Professional" value="Professional" />
      </Picker>

      <Text>Sub-category:</Text>
      <Picker selectedValue={subCategory} onValueChange={setSubCategory}>
        {(category === 'Personal' ? personalOptions : professionalOptions).map(
          opt => (
            <Picker.Item key={opt} label={opt} value={opt} />
          ),
        )}
      </Picker>

      <Text>Tags:</Text>
      <TagInput tags={tags} setTags={setTags} />

      <Text>From Date:</Text>
      <TouchableOpacity onPress={() => setShowFromPicker(true)}>
        <Text>{fromDate.toDateString()}</Text>
      </TouchableOpacity>
      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          onChange={(e, selected) => {
            setShowFromPicker(false);
            if (selected) setFromDate(selected);
          }}
        />
      )}

      <Text>To Date:</Text>
      <TouchableOpacity onPress={() => setShowToPicker(true)}>
        <Text>{toDate.toDateString()}</Text>
      </TouchableOpacity>
      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          onChange={(e, selected) => {
            setShowToPicker(false);
            if (selected) setToDate(selected);
          }}
        />
      )}

      <View style={{ marginVertical: 10 }}>
        <Button title="Search Files" onPress={searchFiles} />
      </View>

      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FileItemCard
            file={item}
            onPreview={previewFile}
            onDownload={downloadFile}
          />
        )}
      />
    </View>
  );
}
