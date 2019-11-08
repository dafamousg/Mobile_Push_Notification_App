import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import LoadingScreen from '../screens/LoadingScreen';

export default createAppContainer(
    createSwitchNavigator({
        Loading: LoadingScreen,
        Auth: AuthNavigation,
        Main: MainNavigation,
    },
    {
        initialRouteName: 'Loading',
    })
);