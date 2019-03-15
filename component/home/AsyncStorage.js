import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, AsyncStorage
} from 'react-native'

export default class Async extends Component {
    save = async() => {
        try {
            await AsyncStorage.setItem('key1', 'Nguyen Hong Khanh');
            console.log('save okey')
        } catch (error) {
            console.log(error)
        }
    }

    get = async() => {
        try {
            const value = await AsyncStorage.getItem('key1');
            if (value !== null){
              // We have data!!
              console.log(value);
            }
          } catch (error) {
            console.log(error)
          }
    }

    render (){
        return(
            <View style = {styles.container}>
                <Button
                    title='set'
                    onPress = { () => {this.save()} }
                />
                <Button
                    title='get'
                    onPress = { () => {this.get()} }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})