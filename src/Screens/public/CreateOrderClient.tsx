import {View, Text, Image, Button} from 'react-native';
import React, {useState} from 'react';
import {selectThemeColor} from '../../redux/themeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {addItem, selectOrder, sumItem} from '../../redux/OrderSlice';
import tw from 'twrnc';

const CreateOrderClient = () => {
  const dispatch = useDispatch();
  const AddToOrder = (product: any) => {
   

      dispatch(sumItem(product));
  };

  //theme
  const {background, textColor} = useSelector(selectThemeColor);

  //useState
  const [Date, setDate] = useState('');
  const [status, setstatus] = useState('');
  const [shippingAddress, setshippingAddress] = useState('');
  const [userId, setuserId] = useState('');

  //use selector to get all order
  const shope = useSelector(selectOrder);


  //handle To Apis

  return (
    <ScrollView style={{backgroundColor: textColor}}>
      <Text style={{color: background}}>CreateOrderClient</Text>
      <View>
        {shope?.order?.map((i: any, index: any) => (
          <ScrollView key={index}>
            {i?.orderDetails?.map((item: any, index: any) => (
              <ScrollView key={index}>
                <Text>{item.qty}</Text>
                <Image
                  source={{
                    uri: `data:image/png;base64,${item?.product?.productImage}`,
                  }}
                  style={tw`h-48`}
                />
              </ScrollView>
            ))}
            <Button title="ee" onPress={() => AddToOrder(i)} />
          </ScrollView>
        ))}
      </View>
    </ScrollView>
  );
};

// {/* <View></View>
// <Image
//   source={{uri: `data:image/png;base64,${item?.productImage}`}}
//   style={tw`h-48`}
// /> */}
export default CreateOrderClient;
