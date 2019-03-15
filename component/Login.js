import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { 
    View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Icon, Button, TouchableHighlight, ImageBackground, navigate,Alert
} from 'react-native';
import Firebase from '../config/Firebase'



export default class Login extends Component {
    static navigationOptions = {
        title: 'Welcome',
      };
    
    state = {
       email: '',
       password: ''
    }
    handleEmail = (text) => {
       this.setState({ email: text })
    }
    handlePassword = (text) => {
       this.setState({ password: text })
    }
    login = (email, pass, navigate) => {
      
       Firebase.auth().signInWithEmailAndPassword(email, pass)
       .then( () => {
           
            navigate('main', { name: 'Jane' })
       })
       .catch(function(err){
            Alert.alert('Email or Password incorrect')
       })
    }

    render(){
        const { navigate } = this.props.navigation;

       return (

        
        
        <ImageBackground style = { { 
             flex:1,
            }} source = {require('../image/bg1.jpg')}>
            <View style = {styles.container}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        style={{ width:250, height:250, justifyContent:'center', alignContent:'center'}}
                        source={require('../image/heart_logo.png')}/>
                </View>
                   <KeyboardAwareScrollView>
            <View style={styles.textInputContainer}>
                <View style={styles.passwordContainer}>
                    <Image
                        style={ styles.iconImage }
                        source={require('../image/iconUserAwatar.png')}/>
                    <TextInput
                        style={styles.inputStyle}
                        placeholderTextColor = "white"
                        underlineColorAndroid='white'
                        autoCorrect={false}
                        
                        placeholder="User"
                        
                        onChangeText={this.handleEmail}
                        />
                </View>
                <View style={styles.passwordContainer}>
                    <Image
                        style={styles.iconImage}
                        source={require('../image/iconPassword.png')}/>
                    <TextInput
                        style={styles.inputStyle}
                        placeholderTextColor = "white"
                        underlineColorAndroid='white'
                        autoCorrect={false}
                        secureTextEntry
                        placeholder="Password"
                        onChangeText={this.handlePassword}
                        />
                </View>
            </View>
                   
             <TouchableOpacity
                style = {styles.submitButton}
               
          
                onPress = { () => { 
                        this.login(this.state.email, this.state.password, navigate)
                           
                        }
                }>
                <Text style = {styles.submitButtonText}> Login </Text>
             </TouchableOpacity>
             
                    <View style = {{flexDirection:'row', justifyContent:'center'}}> 
                        <Text style ={styles.text}>Don't have an account?</Text>
                        <TouchableOpacity 
                        onPress={ () => { navigate('register') } }
                        >
                            <Text style ={styles.text}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                   </KeyboardAwareScrollView>
          </View>
          
          </ImageBackground>

           
       )
    }

    
 }

 
 const styles = StyleSheet.create({
    container: {
      backgroundColor:'#a103ad50',
       paddingTop: 0,
       flex:1,
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       backgroundColor:'white',
       borderWidth: 1
    },
    submitButton: {
        borderRadius:20,
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        marginRight:100,
        marginLeft:100,
        height: 40,
    },
    submitButtonText:{
        textAlign:'center',
       color: 'white'
    },
    textInputContainer: {
        marginTop:30,
        margin:30,
    },
    passwordContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
      },
    iconImage: {
        width:30, height:30, marginTop:12
    },
      inputStyle: {
        flex: 1,
        color:'white',
        marginLeft:10,
      },
      backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },

    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 13,
        

    }

    
 })
  