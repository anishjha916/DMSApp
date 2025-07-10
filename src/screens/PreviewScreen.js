import { View, Text, Button, Image } from 'react-native';
import PDFView from 'react-native-view-pdf';

export default function PreviewScreen({ route }) {
  const { file } = route.params;

  if (file.type.includes('image')) {
    return <Image source={{ uri: file.uri }} style={{ width: '100%', height: 400 }} />;
  } else if (file.type.includes('pdf')) {
    return (
      <PDFView
        fadeInDuration={250}
        style={{ flex: 1 }}
        resource={file.uri}
        resourceType="url"
      />
    );
  } else {
    return <Text>Preview not available</Text>;
  }
}
