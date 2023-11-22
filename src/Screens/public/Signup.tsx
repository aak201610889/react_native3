import React, {useState} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {selectThemeColor} from '../../redux/themeSlice';
import {useSelector} from 'react-redux';

import tw from 'twrnc';
import {useTranslation} from 'react-i18next';
import usePostApi from '../../hooks/postData';
const Signup = () => {
  const {t} = useTranslation();
  const themeColor = useSelector(selectThemeColor);
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const postApi = usePostApi();

  const handlePostRequest = async () => {
    try {
      const data = await postApi.mutateAsync({
        url: 'http://172.16.69.26:5000/',
        body: {email: Email, password: Password, fullname: Name},
      });
      console.log('Post successful:', data);
    } catch (error: any) {
      console.error('Error posting data:', error.message);
    }
  };

  return (
    <View style={tw`mt-4`}>
      <Text
        style={
          themeColor === 'light '
            ? tw` mt-8 mb-4  text-3xl pt-2 m-auto  text-blue-300 mb-4`
            : tw` mt-8 mb-4  text-3xl pt-2 m-auto  text-blue-400 mb-4`
        }>
        {t('Signup')}
      </Text>
      <View style={tw`mt-4 mx-2`}>
        <TextInput
          placeholder={t('FullName')}
          onChangeText={text => setName(text)}
          value={Name}
          style={tw`h-12 border border-gray-500 mb-2 px-2`}
        />
        <TextInput
          placeholder={t('Email')}
          onChangeText={text => setEmail(text)}
          value={Email}
          style={tw`h-12 border border-gray-500 mb-2 px-2`}
        />
        <TextInput
          placeholder={t('Password')}
          onChangeText={text => setPassword(text)}
          value={Password}
          style={tw`h-12 border border-gray-500 mb-2 px-2`}
        />
      </View>
      <View style={tw`mx-2 bg-red-300`}>
        <Button title={t('Signupbtn')} onPress={handlePostRequest} />
      </View>
    </View>
  );
};

export default Signup;
