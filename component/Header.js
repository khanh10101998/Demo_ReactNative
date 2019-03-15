import React, { Component } from 'react'
import { 
    View,Text, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput
 } from "react-native";
import icMenu from '../image/iconUserAwatar.png'



export default class Header extends Component {
    render(){
        const { container, toolbar, iconStyle, textInput, tittle } = styles;
        return(
            <View style={container}>
                <View style = {toolbar}>
                    {/* <TouchableOpacity>
                        <Image source ={icMenu} style={iconStyle}/>
                    </TouchableOpacity> */}
                    <Text style = {tittle}>shop</Text>
                    {/* <TouchableOpacity>
                        <Image source ={icMenu} style={iconStyle}/>
                    </TouchableOpacity> */}
                </View>
                <TextInput 
                    underlineColorAndroid='white'
                    placeholder='What do you want to buy?'
                    style = {textInput}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00cdcd',  padding:7, justifyContent:'space-between'
    },
    toolbar: {
        flexDirection:'row', justifyContent:'center',
    },
    iconStyle: {
        width:25, height:25
    },
    tittle:{
        fontSize:20, color:'white', alignContent:'center'
    },
    textInput: {
           backgroundColor:'white', paddingLeft:10, padding:0, 
    }
})
