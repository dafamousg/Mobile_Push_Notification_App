import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import ButtonScreen from '../screens/ButtonScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ChatScreen from '../screens/ChatScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ButtonStack = createStackNavigator(
  {
    Button: ButtonScreen,
  },
  config
);

ButtonStack.navigationOptions = {
  tabBarLabel: 'Buttons',
/*   tabBarIcon: ({ focused }) => (
    <i class="fas fa-address-card"></i>
  ), */
};

ButtonStack.path = '';


const HistoryStack = createStackNavigator(
    {
      History: HistoryScreen,
    },
    config
  );
  
  HistoryStack.navigationOptions = {
    tabBarLabel: 'History',
  /*   tabBarIcon: ({ focused }) => (
      <i class="fas fa-address-card"></i>
    ), */
  };
  
  HistoryStack.path = '';

  const ChatStack = createStackNavigator(
    {
      Chat: ChatScreen,
    },
    config
  );
  
  ChatStack.navigationOptions = {
    tabBarLabel: 'Chat',
  /*   tabBarIcon: ({ focused }) => (
      <i class="fas fa-address-card"></i>
    ), */
  };
  
  ChatStack.path = '';

const tabNavigator = createBottomTabNavigator({
    ButtonStack,
    HistoryStack,
    ChatStack,
});

tabNavigator.path = '';

export default tabNavigator;