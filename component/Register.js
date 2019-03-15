import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Icon, Button, TouchableHighlight, ImageBackground, navigate, Alert
} from 'react-native';
import Firebase from '../config/Firebase'
const reactStringReplace = require('react-string-replace')
export default class Register extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    state = {
        name: '',
        email: '',
        adress: '',
        password: '',
        confirmPassword: '',
    }
    handleName = (text) => {
        this.setState({ name: text })
    }
    handleAdress = (text) => {
        this.setState({ adress: text })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    handleConfirmPassword = (text) => {
        this.setState({ confirmPassword: text })
    }
    register = (email, pass, navigate) => {

        Firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(() => {
                navigate('login')
            }
            )
            .catch(function (err) {
                Alert.alert('xin kiểm tra lại email và password!')
                console.log('err register: ' + err)
            }
            );
    }

    handldUpdateManagerUser = (name, email, adress) => {
        // var sampleEmail = email.replace(".", "ID");
        var newEmail = sampleEmail.replace(".", "ID");
        // reactStringReplace('Apt 111, phone number 5555555555.', /(\d+)/g, (match, i) => (
        //     console.log('apder replace' + match)
        //   ));

        console.log('new Email' + newEmail)
        console.log('thong tin ne: ' + name + "/" + newEmail + "/" + adress)

        Firebase.database().ref('User/' + newEmail + '/ManagerUser').set({
            user_name: name,
            user_email: email,
            adress: adress,
        });
    }
    constructor(props) {
        super(props);
        var database = Firebase.database();
    }

    render() {
        const { navigate } = this.props.navigation;

        return (

            <ImageBackground style={{
                flex: 1, justifyContent: 'center', backgroundColor: '#a103ad50'
            }} source={require('../image/bg1.jpg')}>
                <View style={{
                    flex: 1, backgroundColor: '#a103ad50', justifyContent: 'center'
                }}>
                    <View style={styles.container}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: 25, color: 'white', }}>Register Here</Text>
                        </View>
                        <View style={styles.textInputContainer}>
                            <View style={styles.passwordContainer}>
                                <Image
                                    style={styles.iconImage}
                                    source={require('../image/iconUserAwatar.png')} />
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholderTextColor="white"
                                    underlineColorAndroid='white'
                                    autoCorrect={false}
                                    placeholder="Name"
                                    onChangeText={this.handleName}
                                />
                            </View>

                            <View style={styles.passwordContainer}>
                                <Image
                                    style={styles.iconImage}
                                    source={require('../image/iconLocation.png')} />
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholderTextColor="white"
                                    underlineColorAndroid='white'
                                    autoCorrect={false}
                                    placeholder="Adress"
                                    onChangeText={this.handleAdress}
                                />
                            </View>

                            <View style={styles.passwordContainer}>
                                <Image
                                    style={{ width: 24, height: 24, marginTop: 12, marginLeft: 3 }}
                                    source={require('../image/iconEmail.png')} />
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholderTextColor="white"
                                    underlineColorAndroid='white'
                                    autoCorrect={false}
                                    placeholder="Email"
                                    onChangeText={this.handleEmail}
                                />
                            </View>

                            <View style={styles.passwordContainer}>
                                <Image
                                    style={styles.iconImage}
                                    source={require('../image/iconPassword.png')} />
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholderTextColor="white"
                                    underlineColorAndroid='white'
                                    autoCorrect={false}
                                    secureTextEntry
                                    placeholder="Password"
                                    onChangeText={this.handlePassword}
                                />
                            </View>
                            <View style={styles.passwordContainer}>
                                <Image
                                    style={styles.iconImage}
                                    source={require('../image/iconPassword.png')} />
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholderTextColor="white"
                                    underlineColorAndroid='white'
                                    autoCorrect={false}
                                    secureTextEntry
                                    placeholder="Confirm Password"
                                    onChangeText={this.handleConfirmPassword}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => {
                                if (this.state.password == this.state.confirmPassword) {
                                    this.register(this.state.email, this.state.password, navigate)
                                } else {
                                    Alert.alert('Password không trùng')
                                }
                            }
                            }>
                            <Text style={styles.submitButtonText}> Register </Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.text}>Already a member?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigate('login')
                                }
                                }>
                                <Text style={styles.text}> Login now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a103ad00',

    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        backgroundColor: 'white',
        borderWidth: 1
    },
    submitButton: {
        borderRadius: 7,
        backgroundColor: '#7a42f400',
        borderWidth: 2,

        borderColor: '#7a42f4',
        padding: 10,
        margin: 15,
        marginRight: 100,
        marginLeft: 100,
        height: 40,
    },
    submitButtonText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white'
    },
    textInputContainer: {
        marginTop: 30,
        margin: 30,
    },
    passwordContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    iconImage: {
        width: 30, height: 30, marginTop: 12
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        marginLeft: 10,
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
