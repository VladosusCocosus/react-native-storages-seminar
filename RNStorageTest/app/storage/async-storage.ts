import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error(e)
    }
};

export const storeObjectData = async (key: string, value: Record<string, unknown>) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error(e)
    }
};

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null ? value : null
    } catch (e) {
        console.error(e)
    }
};

export const getObjectData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e)
    }
};
