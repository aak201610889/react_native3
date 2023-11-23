import React, {useCallback} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {selectThemeColor} from '../../redux/themeSlice';
import {useSelector} from 'react-redux';
import useApi from '../../hooks/fetchApiData';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-gesture-handler';

const GetProductsDetail = () => {
  const themeColor = useSelector(selectThemeColor);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColor.background,
    },
    text: {
      color: themeColor.textColor,
    },
  });

 
  const navigation = useNavigation();
  const apiUrl = 'http://172.16.69.26:5113/api/ProductDetails';
  const {data, isLoading, isError, refetch} = useApi(apiUrl);
  console.log(data?.message);

  useFocusEffect(
    useCallback(() => {
      // Fetch data when the screen is focused
      refetch();
    }, [refetch, navigation]),
  );

  if (isLoading) {
    return <ActivityIndicator style={tw`flex-1`} />;
  }

  if (isError) {
    return <Text>Error fetching data from API</Text>;
  }
if (!data.data || data.data.length === 0) {
  return (
    <View>
      <TouchableOpacity
        style={{
          ...tw` w-98% m-auto mt-10`,
          backgroundColor: themeColor.background,
        }}
        onPress={() => navigation.navigate('CreateProductDetails')}>
        <Text style={{...tw` m-auto my-2 `, color: themeColor.textColor}}>
          Create Product
        </Text>
      </TouchableOpacity>
  
    </View>
  );
}


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>ProductsDetail</Text>

        {data?.data?.map((item: any) => (
          <View key={item?.id} style={tw`mb-4`}>
            <Text>{item?.rate}</Text>
            <Text>productId :{item?.productId}</Text>
            <Image
              source={{uri: `data:image/png;base64,${item?.image}`}}
              style={tw`w-full h-48`}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default GetProductsDetail;
