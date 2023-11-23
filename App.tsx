import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import tw from 'twrnc';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';

import {selectThemeColor} from './src/redux/themeSlice';

// Import your screen components
import Home from './src/Screens/private/Home';
import Login from './src/Screens/public/Login';
import CreateProduct from './src/Screens/private/CreateProduct';
import Signup from './src/Screens/public/Signup';
import MyDropdownPicker from './src/components/DropdownPicker';
import CreateProductDetails from './src/Screens/private/CreateProductDetails';
import GetProductsDetail from './src/Screens/private/GetProductsDetail';
import CreateCategory from './src/Screens/private/CreateCategory';
import CustomDrawer from './src/components/CustomDrawer';
import {getToken} from './src/services/tokenService';
import GetProducts from './src/Screens/private/GetProduct';
import GetProductsClient from './src/Screens/public/GetProductsClient';
import CreateOrderClient from './src/Screens/public/CreateOrderClient';


const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = getToken();
  const {t, i18n} = useTranslation();
  const themeColor = useSelector(selectThemeColor);

  const toggleSwitch = () => {
    const newLanguage = isEnabled ? 'ar' : 'en';


    try {
      i18n.changeLanguage(newLanguage);
      setIsEnabled(!isEnabled);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };



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
  });
// const navigation = useNavigation();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={isAuthenticated ? 'Home' : 'Login'}
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: styles.container.backgroundColor,
              borderTopLeftRadius: 2,
              borderTopRightRadius: 4,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            },
            headerTintColor: styles.headerText.color,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <View style={tw`flex flex-row items-center justify-around w-30`}>
                <FontAwesomeIcon
                  name="globe"
                  size={20}
                  onPress={toggleSwitch}
                  color={styles.drawerItemText.color}
                  style={tw`mr-2`}
                />
                {/* <FontAwesomeIcon
                  name="shopping-bag"
                  size={20}
                  onPress={() => navigation.navigate('screenName')}
                  color={styles.drawerItemText.color}
                  style={tw`mr-2`}
                /> */}
              </View>
            ),
          }}
          drawerContent={props => <CustomDrawer {...props} />}>
          {isAuthenticated ? (
            <>
              <Drawer.Screen name={t('Home')} component={Home} />
              <Drawer.Screen
                name={t('CreateCategory')}
                component={CreateCategory}
              />
              <Drawer.Screen
                name={t('CreateProduct')}
                component={CreateProduct}
              />
              <Drawer.Screen name={t('GetProducts')} component={GetProducts} />

              <Drawer.Screen name={t('theme')} component={MyDropdownPicker} />
              <Drawer.Screen
                name={t('GetProductsDetail')}
                component={() => <GetProductsDetail />}
              />
              <Drawer.Screen
                name={t('CreateProductDetails')}
                component={() => <CreateProductDetails />}
              />
              <Drawer.Screen
                name={t('GetProductsClient')}
                component={() => <GetProductsClient />}
              />
              <Drawer.Screen
                name={t('CreateOrderClient')}
                component={() => <CreateOrderClient />}
              />
            </>
          ) : (
            <>
              <Drawer.Screen name={t('Login')} component={() => <Login />} />
              <Drawer.Screen name={t('Signup')} component={Signup} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>

      <Toast />
    </QueryClientProvider>
  );
};

export default App;
