import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  lightGreenTheme,
  lightRedTheme,
  lightBlueTheme,
  lightYellowTheme,
  darkGreenTheme,
  darkRedTheme,
 
} from './../constant/theme';
import tw from 'twrnc';
import {selectThemeColor, setThemeColor} from '../redux/themeSlice';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDrawer = ({navigation}) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const themeColor = useSelector(selectThemeColor);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColor.background,
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    header: {
      marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColor.headerText,
    },
    drawerItem: {
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: themeColor.borderColor,
      paddingVertical: 10,
    },
    drawerItemText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColor.drawerItemText,
    },
    dropdown: {
      marginTop: 80,
      width: 200,
      marginBottom: 7,
      height: 50,
      borderColor: themeColor.dropdownBorderColor,
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

  const items = [
    {label: 'Light Green', value: lightGreenTheme},
    {label: 'Light Red', value: lightRedTheme},
    {label: 'Light Blue', value: lightBlueTheme},
    {label: 'Light Yellow', value: lightYellowTheme},
    {label: 'Dark Green', value: darkGreenTheme},
    {label: 'Dark Red', value: darkRedTheme},

  ];

  const navigateToScreen = screenName => {
      console.log('Navigating to:', screenName);
    navigation.navigate(screenName);
  };

  const renderAuthScreens = () => {
    return isAuthenticated ? (
      <>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('Home')}>
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('CreateCategory')}>
          <Text style={styles.drawerItemText}>Create Category</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('CreateProduct')}>
          <Text style={styles.drawerItemText}>Create Product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('GetProducts')}>
          <Text style={styles.drawerItemText}>Get Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('CreateProductDetails')}>
          <Text style={styles.drawerItemText}>Create Product Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('GetProductsDetail')}>
          <Text style={styles.drawerItemText}>Get Products Detail</Text>
        </TouchableOpacity>
      </>
    ) : (
      <>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('Login')}>
          <Text style={styles.drawerItemText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('Signup')}>
          <Text style={styles.drawerItemText}>Signup</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Prodix</Text>
      </View>
      {renderAuthScreens()}
      <View style={tw`flex-1 items-center justify-center`}>
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && {borderColor: themeColor.activeBorderColor},
          ]}
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
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            dispatch(setThemeColor(item.value));
          }}
        />
      </View>
    </View>
  );
};

export default CustomDrawer;
