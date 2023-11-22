import { View, Text } from 'react-native'
import React from 'react'

const ToastComponent = ({text1,text2, props }:any) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 2,
        borderRadius: 10,
        width: 220,
        borderLeftColor: text2,
        borderLeftWidth: 12,
      }}>
      <Text>{text1}</Text>
      <Text>{props}</Text>
    </View>
  );
};

export default ToastComponent