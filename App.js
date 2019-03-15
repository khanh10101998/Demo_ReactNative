import React, { Component } from 'react';
import {

} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Login from './component/Login';
import Register from './component/Register';
import Main from './component/Main';
import Shop from './component/Shop'
import TopProduct from './component/TopProduct'



const App = StackNavigator({
  
  
  login: { screen: Login },
  main: { screen: Shop },
  register: { screen: Register },
  topProduct: {screen: TopProduct},
 
},
{
  headerMode: 'none'
},
);

export default App

