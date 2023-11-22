import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { ScrollView } from 'react-native-gesture-handler';
const CreateCategory = () => {
 const [name, setName] = useState('');
 const [description, setDescription] = useState('');
  const toastConfig = {
    success: ({text1, props}: any) => (
      <View
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          padding: 2,
          borderRadius: 10,
          width: 120,
          borderLeftColor: 'green',
          borderLeftWidth: 12,
        }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),

    error: ({text1, props}: any) => (
      <View
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          padding: 2,
          borderRadius: 10,
          width: 120,

          borderLeftColor: 'red',
          borderLeftWidth: 12,
        }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  const handlePostRequest = async () => {
    try {
      const url = 'http://172.16.69.26:5113/api/Category';
      const body = {
        name,
        description,
   
      };

      const response = await axios.post(url, body);
      Toast.show({
        type: 'success',
        text1: 'success',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error : ' + error,
      });
      console.log('Error in handlePostRequest:', error);
    }
  };









  return (
    <ScrollView style={tw`bg-white`}>
      <Text style={tw`text-xl m-auto mt-5`}>CreateCategory</Text>
      <TextInput
        placeholder="Name"
        onChangeText={text => setName(text)}
        value={name}
        style={tw`h-12 border border-gray-500 mb-2 w-80 m-auto mt-8`}
      />
      <TextInput
        placeholder="Description"
        onChangeText={text => setDescription(text)}
        value={description}
        style={tw`h-12 border border-gray-500 mb-2 w-80 m-auto mt-5`}
      />
      <View style={tw`mx-2 bg-red-300 w-80 m-auto mt-5`}>
        <Button title="Make POST Request" onPress={handlePostRequest} />
      </View>

      <Toast config={toastConfig} />
    </ScrollView>
  );
}

export default CreateCategory