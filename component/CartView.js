import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView,
    Dimensions, StyleSheet, Image, ListView, FlatList, Alert
} from 'react-native';
import Firebase from '../config/Firebase'
import { database } from 'firebase';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
var count = 0;

class CartView extends Component {

    
    constructor(props) {
        super(props);
        console.log('state is active')
        // this.handleUpdateCount = this.handleUpdateCount.bind(this);
        // this.updateCount = this.updateCount.bind(this);
        this.itemRef = Firebase.database().ref("HongKhanh").child('cart');
        this.state = {

            count2: 1,

            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),

            dem: 1,
        }

    }
    updateCount() {

        count+=1;
        
    }



    handleUpdateCount = () => {

        count++;
        this.setState({ count2: count });
        console.log(this.state.count2 + "=======================================")
    }
    _delete = (key) => {
        Firebase.database().ref("HongKhanh").child('cart').child(key).remove()
    }





    listenForItems(itemRef) {
        itemRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                let t = {
                    key: (child.key),
                    image: child.val().product_image,
                    name: child.val().product_name,
                    price: child.val().product_price,
                    info: child.val().product_info
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


        const { main, checkoutButton, checkoutTitle, wrapper,
            product, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        return (

            <FlatList

                data={this.state.post}
                renderItem={({ item }) =>
                    <View style={wrapper}>
                        <ScrollView style={main}>


                            <View style={product}>

                                <Image
                                    style={productImage}
                                    source={{ uri: item.image }}
                                />
                                <View style={[mainRight]}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={txtName}>{item.name}</Text>
                                        <TouchableOpacity onPress={() => {
                                            this._delete(item.key)
                                        }}>
                                            <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={txtPrice}>{item.price}</Text>
                                    </View>
                                    <View style={productController}>
                                        <View style={numberOfProduct}>

                                            <TouchableOpacity onPress={this.handleUpdateCount.bind(this)}>
                                                <Text>+</Text>
                                            </TouchableOpacity>
                                            <Text>{this.state.count2}</Text>
                                            <TouchableOpacity onPress={() => { this.updateCount }}>
                                                <Text>-</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={showDetailContainer}>
                                            <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={checkoutButton}>
                            <Text style={checkoutTitle}>TOTAL {item.price} CHECKOUT NOW</Text>
                        </TouchableOpacity>
                    </View>
                    // <View>
                    //     <Text>{item.image}, {item.name}, {item.info}</Text>
                    // </View>

                }
            />

            //  <TouchableOpacity onPress={()=>{this.setState({count:5})}}><Text >{this.state.count},  {this.state.dem}</Text></TouchableOpacity>

        );
    }
    componentDidMount() {
        this.listenForItems(this.itemRef)


    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    product: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default CartView;
