import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class TabOne extends Component {
    render(){
        return(
            <View style= { {flex:1, backgroundColor:'red'} }>
                <Text>Tab One</Text>
            </View>
        );
    }
}