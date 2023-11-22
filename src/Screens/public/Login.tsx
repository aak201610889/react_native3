import React, {useState} from 'react';
import {Text, View, Button, TextInput, ScrollView} from 'react-native';
import {selectThemeColor} from '../../redux/themeSlice';

import tw from 'twrnc';
import {useTranslation} from 'react-i18next';
import usePostApi from '../../hooks/postData';
import { login, logout, selectAuth } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {saveToken}from '../../services/tokenService'
const Login = () => {
  const {t} = useTranslation();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const themeColor = useSelector(selectThemeColor);

  const postApi = usePostApi();
  const dispatch = useDispatch();
  const handlePostRequest = async () => {
    try {
      const data = await postApi.mutateAsync({
        url: 'http://172.16.69.26:5000/',
        body: {email: Email, password: Password},
        headers: {'Content-Type': 'application/json'},
      });
      dispatch(login(data));
      
      saveToken(data)
      
    } catch (error: any) {
      console.error('Error posting data:', error.message);
    }
  };

  return (
    <ScrollView 
      style={
        themeColor === 'light'
          ? tw`bg-[#333] text-white`
          : tw`bg-white text-[#333]`
      }>
      <View>
        <Text
          style={
            themeColor === 'light'
              ? tw`bg-[#333] text-white mt-8 mb-4  text-3xl pt-2 m-auto  `
              : tw`bg-white text-[#333] mt-8 mb-4  text-3xl pt-2 m-auto  `
          }>
          {t('Login')}
        </Text>

        <View style={tw`mt-4 mx-2`}>
          <TextInput
            placeholderTextColor={
              themeColor == 'light'
                ? tw.color('gray-200')
                : tw.color('gray-800')
            }
            placeholder={t('Username')}
            onChangeText={text => setEmail(text)}
            value={Email}
            style={tw`h-12 border border-gray-500 mb-2 px-2  `}
          />
          <TextInput
            placeholder={t('Password')}
            onChangeText={text => setPassword(text)}
            value={Password}
            placeholderTextColor={
              themeColor == 'light'
                ? tw.color('gray-800')
                : tw.color('gray-800')
            }
            style={tw`h-12 border border-gray-500 mb-2 px-2  `}
          />
        </View>
        <View style={tw`mx-2 bg-red-300`}>
          <Button title={t('loginbtn')} onPress={handlePostRequest} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
