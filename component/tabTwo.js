import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class TabTwo extends Component {
    constructor(props){
        super(props)
        this.state={
            edit:false,
            name:this.props.name,
            
            url:''
        }
    }
    render(){
        return(
            <View style= { {flex:1, backgroundColor:'blue'} }>
                <Text>Tab Two  {this.state.name}</Text>
            </View>
        );
    }
}