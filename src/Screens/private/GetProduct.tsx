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
import {useSelector} from 'react-redux';
import {selectThemeColor} from '../../redux/themeSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useApi from '../../hooks/fetchApiData';
import tw from 'twrnc';
import useDeleteApi from '../../hooks/useDeleteApi';
import {Dialog} from '@rneui/themed';
import UpdateModal from '../../components/UpdateModal';

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
  console.warn(data?.message);

  useFocusEffect(
    useCallback(() => {
      // Fetch data when the screen is focused
      refetch();
    }, [refetch, navigation]),
  );

  //handling the deleteProduct
  const deleteMutation = useDeleteApi(
    'http://172.16.69.26:5113/api/Products',
  );
  const deleteProduct = (id: any) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        console.log('Delete successful');
      },
      onError: error => {
        console.error('Delete failed', error);
      },
    });
  };
//Handle update 
  const [visible6, setVisible6] = useState(false);




  const handleUpdate = (id: any) => {
        setVisible6(true);
console.log(id);

  
}
const toggleDialog6 = () => {
  setVisible6(false);
};


  //rendering section

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
              onPress={() => handleUpdate(item.id)}>
              <Text style={{...tw` m-auto mt-1`, ...styles.text}}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`absolute right-[-3] top-[-3] bg-red-800 w-8 h-8 rounded-5`}
              onPress={() => deleteProduct(item.id)}>
              <Text style={tw`text-white m-auto`}>X</Text>
            </TouchableOpacity>
      <Dialog isVisible={visible6}  onBackdropPress={toggleDialog6}>
        <Dialog.Title title="Choose Account" />
              <UpdateModal  Id={item?.id} Name={item?.name} />
      </Dialog>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default GetProducts;
