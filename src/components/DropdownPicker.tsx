import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  lightGreenTheme,
  lightRedTheme,
  lightBlueTheme,
  lightYellowTheme,
  darkGreenTheme,
  darkRedTheme,
  darkBlueTheme,
} from './../constant/theme';
import tw from 'twrnc';
import {useDispatch, useSelector} from 'react-redux';
import {selectThemeColor, setThemeColor} from '../redux/themeSlice';
import {Dropdown} from 'react-native-element-dropdown';
interface Theme {
  // Define your Theme type if it's not already defined
  // Example: You might need to define properties like backgroundColor, textColor, etc.
}

const MyDropdownPicker = () => {
  const [items, setItems] = useState([
    {label: 'Light Green', value: lightGreenTheme},
    {label: 'Light Red', value: lightRedTheme},
    {label: 'Light Blue', value: lightBlueTheme},
    {label: 'Light Yellow', value: lightYellowTheme},
    {label: 'Dark Green', value: darkGreenTheme},
    {label: 'Dark Red', value: darkRedTheme},
    {label: 'Dark Blue', value: darkBlueTheme},
  ]);

  const dispatch = useDispatch();
  // const selectedThemeColor = useSelector(selectThemeColor); // Not used in the provided code
  const themeColor = useSelector(selectThemeColor);
  const styles = StyleSheet.create({
    container: {
      height: 100,
      backgroundColor: themeColor.background,
    },
    text: {
      color: themeColor.textColor,
    },
    dropdown: {
      marginTop: 80,
      width: 200,
      marginBottom: 7,
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> drop down</Text>
      <View style={tw`flex-1 items-center justify-center`}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={items}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: any) => {
            setValue(item.value);
            setIsFocus(false);
            dispatch(setThemeColor(item.value));
          }}
        />
      </View>

      <View style={tw`flex-1 items-center justify-center`}></View>
    </View>
  );
};

export default MyDropdownPicker;
