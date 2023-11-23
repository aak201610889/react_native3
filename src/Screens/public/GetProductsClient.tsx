import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {selectThemeColor} from '../../redux/themeSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useApi from '../../hooks/fetchApiData';
import tw from 'twrnc';
import { addItem } from '../../redux/OrderSlice';


const GetProductsClient = () => {

  const dispatch = useDispatch();
  //theme
  const themeColor = useSelector(selectThemeColor);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColor.background,
    },
    text: {
      color: themeColor.textColor,
    },
  });
//Get All Products
  const navigation = useNavigation();
  const apiUrl = 'http://172.16.69.26:5113/api/Products';
  const {data, isLoading, isError, refetch} = useApi(apiUrl);
  console.warn(data?.message);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch, navigation]),
  );


  //Handle Order

  const AddToOrder = (product: any) => {

 dispatch(addItem(product));
  };


  

  if (isLoading) {
    return <ActivityIndicator style={tw`flex-1`} />;
  }

  if (isError) {
    return <Text>Error fetching data from API</Text>;
  }

  return (
    <ScrollView>
      <View style={tw`flex flex-row justify-between flex-wrap mx-2  `}>
        {data?.data?.map((item: any) => (
          <View
            key={item?.id}
            style={{
              ...tw`mb-4 mt-2 w-[48%] border-2 rounded-2 relative `,
              borderColor: themeColor.background,
            }}>
            <Text style={{...tw` m-auto mt-1`, ...styles.text}}>
              {item?.name}
            </Text>
            <Text>description :{item?.description}</Text>
            <Text>price :{item?.price}</Text>
            {/* <Text>categoryId :{item?.categoryId}</Text> */}
            <Image
              source={{uri: `data:image/png;base64,${item?.productImage}`}}
              style={tw`h-48`}
            />
            <TouchableOpacity
              style={{
                ...tw` w-[95%] m-auto rounded-2 h-8 my-2`,
                backgroundColor: themeColor.background,
                borderColor: themeColor.textColor,
                borderWidth: 1,
              }}
              onPress={() => AddToOrder(item)}>
              <Text style={{...tw` m-auto mt-1`, ...styles.text}}>Add Item</Text>
            </TouchableOpacity>

          
         
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default GetProductsClient;


