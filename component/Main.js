import React, { Component } from 'react';

import Menu from '../component/Menu'
import Shop from '../component/Shop'
import Login from '../component/Login'
import TopProduct from '../component/TopProduct'
import { Text, View } from 'react-native';


   
export default class Main extends Component {  
       
        render () {
          return (
           <View>
             <TopProduct/>

           </View>
          );
        }
      }