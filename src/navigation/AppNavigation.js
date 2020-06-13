import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { MainScreen } from '../screens/MainScreen';
import { FilterScreen } from '../screens/FilterScreen';

const navigatorOptions = {
  defaultNavigationOptions: {
    headerTitleAlign: 'left',
    headerTitleStyle: {
      fontFamily: 'roboto-bold',
      fontSize: 24
    },
  }
};

const AppNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Filter: FilterScreen
  },
  navigatorOptions
);

export const AppNavigation = createAppContainer(AppNavigator);