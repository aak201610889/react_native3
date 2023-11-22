import {View, Text, StyleSheet, ActivityIndicator, Image, Button} from 'react-native';
import React, {useCallback} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {selectThemeColor} from '../../redux/themeSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useApi from '../../hooks/fetchApiData';
import tw from 'twrnc';

const GetProducts = () => {
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
  //handling the product api
  const navigation = useNavigation();
  const apiUrl = 'http://172.16.69.26:5113/api/Products';
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

  return (
    <ScrollView>
      <Text style={styles.container}>Get Products</Text>
      <View style={tw`flex flex-row justify-between flex-wrap mx-2  `}>
        {data?.data?.map((item: any) => (
          <View
            key={item?.id}
            style={tw`mb-4 mt-2  w-[48%] border-2  border-red-700  rounded-2`}>
            <Text style={{...tw` m-auto mt-1`, ...styles.text}}>
              {item?.name}
            </Text>
            <Text>description :{item?.description}</Text>
            <Text>price :{item?.price}</Text>
            <Text>categoryId :{item?.categoryId}</Text>
            <Image
              source={{uri: `data:image/png;base64,${item?.productImage}`}}
              style={tw`h-48`}
            />
            <View>
              <Button title='Delete'/>
              <Button title='Update'/>
            </View>
          </View>
        ))}
        
      </View>
    </ScrollView>
  );
};

export default GetProducts;
