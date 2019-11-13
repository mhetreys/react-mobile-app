import { AsyncStorage } from "react-native";

// Persisting data:
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
}

// Fetching data:
export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      return value;
    }
   } catch (error) {
     // Error retrieving data
   }
}

// Clear specific data:
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error removing data
  }
};

// Clear all data:
export const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    // Error clearing data
  }
};
