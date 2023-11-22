import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import tw from 'twrnc';

const Home = () => {
  const {t} = useTranslation();

  return (
    <View style={tw` h-[100%]`}>
      <Text>{t('test')}</Text>
    </View>
  );
};

export default Home;
