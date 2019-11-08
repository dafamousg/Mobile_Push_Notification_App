import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';


const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
  });
  
  const LoginStack = createStackNavigator(
    {
      Login: LoginScreen,
    },
    config
  );
  
  LoginStack.navigationOptions = {
    tabBarLabel: 'Login',
/*     tabBarIcon: ({ focused }) => (
        <i class="fas fa-address-card"></i>
    ), */
  };
  
  LoginStack.path = '';
  
  const tabNavigator = createBottomTabNavigator({
    LoginStack,
  });
  
  tabNavigator.path = '';
  
  export default tabNavigator;