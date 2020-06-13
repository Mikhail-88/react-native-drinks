import * as Font from 'expo-font';

export async function fonts() {
  try {
    await Font.loadAsync({
      'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf')
    });
  } catch (error) {
    console.error('fonts catch', error.message);
    throw error;
  }
};