import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import {Dropdown} from 'react-native-element-dropdown';
import ImageUploader from '../../components/ImageUploader';
import useApi from '../../hooks/fetchApiData';
import usePostApi from '../../hooks/postData';

const CreateProductDetails = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [rate, setRate] = useState('');
  const [productData, setProductData] = useState<any>([]);
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
  } = useApi('http://172.16.69.26:5113/api/Products');

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



  const postApi = usePostApi();
  const handlePostRequest = async () => {
    try {
      const formData = new FormData();

      formData.append('productId', value);
      formData.append('rate', rate);
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'product_image.jpg',
      });

      const data = await postApi.mutateAsync({
        url: 'http://172.16.69.26:5113/api/ProductDetails',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', data.message);
    } catch (error: any) {
      console.error('Error posting data:', error.message);
    }
  };

  if (isLoading) {
    return <ActivityIndicator style={tw`flex-1`} />;
  }

  if (isError) {
    return <Text>Error fetching data from API</Text>;
  }





  
  return (
    <ScrollView style={tw`mt-4`}>
      <Text>Product</Text>
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
          placeholder="rate"
          onChangeText={text => setRate(text)}
          value={rate}
          keyboardType="numeric"
          style={tw`h-12 border border-gray-500 mb-2`}
        />
      </View>
      <ImageUploader onImageSelect={handleImageSelect} />
      <View style={tw`mx-2 bg-red-300 mt-4`}>
        <Button title="Make POST Request" onPress={handlePostRequest} />
      </View>
    </ScrollView>
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

export default CreateProductDetails;
