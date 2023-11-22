import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';

// Save the token to local storage
const saveToken = async (token:string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token to local storage:', error);
  }
};

// Get the token from local storage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error retrieving token from local storage:', error);
    return null;
  }
};

// Remove the token from local storage
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token from local storage:', error);
  }
};

// Clear all data from local storage
const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing local storage:', error);
  }
};

export {saveToken, getToken, removeToken, clearLocalStorage};
