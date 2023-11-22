import React, {useCallback, useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useApi from '../hooks/fetchApiData';
import ToastComponent from './ToastComponent';
import Toast, {BaseToast} from 'react-native-toast-message';
import {Dropdown} from 'react-native-element-dropdown';
import tw from 'twrnc';
import ImageUploader from './ImageUploader';
import usePostApi from '../hooks/postData';

const UpdateModal = ({Id, Name}: any) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleImageSelect = (selectedImageUri: string | null) => {
    setImageUri(selectedImageUri);
  };

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useApi('http://172.16.69.26:5113/api/Category');

  const productArray =
    response?.data?.map((item: any) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Fetch data when the screen is focused
      refetch();
    }, [refetch, navigation]),
  );

  const toastConfig = {
    success: ({text1, text2, props}: any) => (
      <ToastComponent text1={text1} text2={text2} {...props} />
    ),
    error: ({text1, text2, props}: any) => (
      <ToastComponent text1={text1} text2={text2} {...props} />
    ),
  };

  const postApi = usePostApi(); // Move this line outside the component body

  const handlePostRequest = async () => {
    try {
      const formData = new FormData();
      formData.append('id', Id);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
     
      formData.append('ProductImage', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'product_image.jpg',
      });
 formData.append('categoryId', value);
     
console.log(formData);

      const data = await postApi.mutateAsync({
        url: 'http://172.16.69.26:5113/api/Products/update',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Toast.show({
        type: 'success',
        text1: 'success',
        text2: 'green',
      });
      console.log('Response:', data.message);
    } catch (error: any) {
      console.error('Error posting data:', error);
      Toast.show({
        type: 'error',
        text2: 'red',
        text1: 'Error : ' + error.message,
      });
    }
  };

  return (
    <View>
      <Text>{Name}</Text>
      <View style={tw`mt-4 mx-2`}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={productArray}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: any) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <TextInput
          placeholder="Name"
          onChangeText={text => setName(text)}
          value={name}
          style={tw`h-12 border border-gray-500 mb-2`}
        />
        <TextInput
          placeholder="Description"
          onChangeText={text => setDescription(text)}
          value={description}
          style={tw`h-12 border border-gray-500 mb-2`}
        />
        <TextInput
          placeholder="Price"
          onChangeText={text => setPrice(text)}
          value={price}
          style={tw`h-12 border border-gray-500 mb-5`}
        />
      </View>
      <View style={tw`mt-5 h-35`}>
        <ImageUploader onImageSelect={handleImageSelect} />
      </View>
      <View style={tw`mx-2 bg-red-300 mt-11`}>
        <Button title="Make POST Request" onPress={handlePostRequest} />
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 7,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default UpdateModal;
