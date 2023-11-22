import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';


const ImageUploader = ({onImageSelect}: any) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    try {
      const response: any = await launchImageLibrary(options);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImageUri = response.assets[0].uri;
        setSelectedImage(selectedImageUri);
        onImageSelect(selectedImageUri); // Call the callback function with the selected image URI
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.image} />
        ) : (
          <Text style={styles.uploadText}>Upload Image</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  uploadText: {
    color: '#888',
  },
});

export default ImageUploader;
