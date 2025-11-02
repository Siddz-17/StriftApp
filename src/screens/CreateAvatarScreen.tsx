import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { apiService } from '../services/api';
import { useUser } from '../contexts/UserContext';

interface CreateAvatarScreenProps {
  navigation: any;
}

const CreateAvatarScreen: React.FC<CreateAvatarScreenProps> = ({ navigation }) => {
  const { userId } = useUser();
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera roll permission is required');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...newImages].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (images.length < 8) {
      Alert.alert('Not enough images', 'Please select at least 8 images');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    setUploading(true);
    try {
      // Convert URIs to File objects
      const files: File[] = [];
      for (let i = 0; i < images.length; i++) {
        const response = await fetch(images[i]);
        const blob = await response.blob();
        const file = new File([blob], `image_${i}.jpg`, { type: 'image/jpeg' });
        files.push(file);
      }

      const response = await apiService.uploadTrainingImages(userId, files);
      Alert.alert(
        'Success',
        'Training started! Check progress in your profile.',
        [
          {
            text: 'View Progress',
            onPress: () => navigation.navigate('JobProgress', { jobId: response.job_id }),
          },
        ]
      );
      setImages([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to start training. Please try again.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Your Avatar</Text>
      </View>
      
      <Text style={styles.subtitle}>
        Select 8-10 clear photos of yourself
      </Text>
      <Text style={styles.counter}>
        {images.length}/10 images selected
      </Text>

      <ScrollView style={styles.imageGrid}>
        <View style={styles.gridContainer}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <Text style={styles.removeText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          {images.length < 10 && (
            <TouchableOpacity style={styles.addButton} onPress={pickImages}>
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.uploadButton,
          (images.length < 8 || uploading) && styles.uploadButtonDisabled,
        ]}
        onPress={handleUpload}
        disabled={images.length < 8 || uploading}
      >
        {uploading ? (
          <View style={styles.uploadingContainer}>
            <ActivityIndicator color="#FFF" />
            <Text style={styles.uploadingText}>Uploading...</Text>
          </View>
        ) : (
          <Text style={styles.uploadText}>Start Training</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  counter: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  imageGrid: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 40,
    color: '#DDD',
  },
  uploadButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  uploadButtonDisabled: {
    backgroundColor: '#CCC',
  },
  uploadText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadingText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});