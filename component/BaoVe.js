import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Icon, Button, TouchableHighlight, ImageBackground, Alert, ListView,
    FlatList, Dimensions, ScrollView
} from 'react-native';
import Firebase from '../config/Firebase'
import { database } from 'firebase';


export default class Login extends Component {
    constructor(props) {
        super(props);

        var database = Firebase.database();
        this.state = {
            name: '',
            age: '',
            adress: '',
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
        }


        this.itemRef = Firebase.database().ref("HongKhanh").child('BaoVe');
    }

    static navigationOptions = {
        title: 'Welcome',
    };


    handleName = (text) => {
        this.setState({ name: text })
    }
    handleAge = (text) => {
        this.setState({ age: text })
    }
    handleAdress = (text) => {
        this.setState({ adress: text })
    }
    login = (name, age, adress) => {
        Alert.alert(name, age, adress)
        Firebase.database().ref('HongKhanh').child('BaoVe').push({
            NAME: name,
            AGE: age,
            ADRESS: adress,
        })
        Alert.alert('Update okey')
    }
    _delete = (key) => {
        Firebase.database().ref("HongKhanh").child('BaoVe').child(key).remove()
    }
    listenForItems(itemRef) {
        itemRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                let t = {
                    key: (child.key),
                    name: child.val().NAME,
                    age: child.val().AGE,
                }
                items.push(
                    t
                );
            });


            this.setState({
                post: items
            });
            this.state.post.map((item, idx) => {
                console.log(item.key)
            })

        });
    }

    render() {

        const { wrapper, main
          } = styles;
        return (

            <ImageBackground style={{
                flex: 1,
            }} source={require('../image/bg1.jpg')}>


                <View style={styles.container}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                    </View>

                    <View style={styles.textInputContainer}>
                        <View style={styles.passwordContainer}>

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

                            <TextInput
                                style={styles.inputStyle}
                                placeholderTextColor="white"
                                underlineColorAndroid='white'
                                autoCorrect={false}
                                secureTextEntry
                                placeholder="Age"
                                onChangeText={this.handleAge}
                            />
                        </View>
                        <View style={styles.passwordContainer}>

                            <TextInput
                                style={styles.inputStyle}
                                placeholderTextColor="white"
                                underlineColorAndroid='white'
                                autoCorrect={false}
                                secureTextEntry
                                placeholder="adress"
                                onChangeText={this.handleAdress}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}


                        onPress={() => {
                            this.login(this.state.name, this.state.age, )

                        }
                        }>
                        <Text style={styles.submitButtonText}> Update </Text>
                    </TouchableOpacity>



                </View>

                <FlatList

                    data={this.state.post}
                    renderItem={({ item }) =>
                        <View style={wrapper}>
                            <ScrollView style={main}>
                                <View Style={{ flexDirection: 'row' }}>
                                    <View>
                                        <TouchableOpacity onPress={() => {
                                            this._delete(item.key)
                                        }}>
                                            <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View Style={{ flexDirection: "column" }}>
                                        <Text>{item.key}</Text>
                                        <Text>{item.name}</Text>
                                        <Text>{item.age}</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    }
                />
            </ImageBackground>
        )
    }

    componentDidMount() {
        this.listenForItems(this.itemRef)


    }


}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

        backgroundColor: '#DFDFDF'
    },
    main: {
        width, backgroundColor: '#DFDFDF',

    },
    container: {
        backgroundColor: '#a103ad50',
        paddingTop: 0,
        flex: 1,
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        backgroundColor: 'white',
        borderWidth: 1
    },
    submitButton: {
        borderRadius: 20,
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        marginRight: 100,
        marginLeft: 100,
        height: 40,
    },
    submitButtonText: {
        textAlign: 'center',
        color: 'white'
    },
    textInputContainer: {
        marginTop: 10,
        margin: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        paddingBottom: 5,
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
