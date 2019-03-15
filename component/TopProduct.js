import React, { Component } from 'react'
import Firebase from '../config/Firebase'
import {
    View, Text, StyleSheet, Dimensions, Image, ListView, FlatList, TouchableWithoutFeedback, TouchableOpacity, Alert, navigate
} from 'react-native'
import { database } from 'firebase';
import Shop from './Shop'

export default class TopProduct extends Component {
    constructor(props) {
        super(props);
        //this.itemRef = Firebase.database();
        var database = Firebase.database();
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
        }

        database.ref('HongKhanh/' + "shop/sp4").set({
            image: "http://www.thol.com.vn/media/catalog/product/cache/5/image/500x523/9df78eab33525d08d6e5fb8d27136e95/a/c/activemen_02.jpg",
            product_name: "Multivitamin",
            product_price: "555.000 vnd",
            product_info: "ActiveMan cung cấp vitamin khoáng chất quan trọng dành cho nam giới, tăng cường sinh lực, hỗ trợ tập luyện thể dục thể thao, duy trì phong độ suốt 24h",
        });
        this.itemRef = Firebase.database().ref("HongKhanh").child('shop');
    }

    updateCart = (img, name, price, info) =>{
        Firebase.database().ref('HongKhanh').child('cart').push({
            product_image: img,
            product_name : name,
            product_price: price,
            product_info : info,
        })
        Alert.alert('Đặt hàng hoàn tất')
    }
    listenForItems(itemRef) {
        itemRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                let t = {
                    key: (child.key),
                    id:    child.val().image,
                    name:  child.val().product_name,
                    price: child.val().product_price,
                    info:  child.val().product_info
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

   clickItem = (text) =>{
       console.log('ITEM_DEMO: ' + text )
   }

    render() {
       
      //  const { navigate } = this.props.navigation;
        const {
            container, titleContainer, title, body, productContainer, productImage, productName,
            productPrice, ScrollView, productInfo, order, orderText
        } = styles
        return (

            <View style={container}>
            
                <View style={titleContainer}>
                    <Text
                        style={title}
                        onPress={ () => { navigate('register') } }
                        >
                    
                    NEW PRODUCT</Text>
                </View>
                <View style={body}>
                    <FlatList

                        data={this.state.post}
                        renderItem={({ item }) =>
                       
                            <View style={{marginBottom: 30}}>
                                <View style={productContainer}>
                                    <View>
                                        <Image
                                            style={productImage}
                                            source={{ uri: item.id }}
                                        />
                                        
                                    </View>
                                    <View style={productInfo}>
                                        <Text style={productName}>{item.name}</Text>
                                        <Text style={productPrice}>{item.price}</Text>
                                        <Text>{item.info}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={order}
                                    onPress = { () => { 
                                    this.updateCart(item.id, item.name, item.price, item.info)        
                                    }
                            }>
                                    <Text style={orderText}>ĐẶT HÀNG</Text>
                                </TouchableOpacity>
                            </View>
                           
                        }
                    />

                </View>
               
            </View>
        );
    }

    componentDidMount() {
        this.listenForItems(this.itemRef)
    }
}

const { width, height } = Dimensions.get('window');
const productWidth = (width - 50) / 2


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,

        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        color: '#D3D3CF',
        paddingLeft: 20
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    productContainer: {
        flexDirection: 'row',
        width: productWidth,
        marginBottom: 5
    },
    productImage: {
        width: productWidth,
        height: productWidth,
    },
    productName: {
        color:'black',
        fontWeight:'bold',
        fontSize:15,
        marginVertical: 1,
        paddingLeft: 10
    },
    productPrice: {
        
        paddingLeft: 10,
        color: '#cd0000'
    },
    productInfo: {
        borderRadius:10,
        height:productWidth,
        backgroundColor: '#dddddd70'
    },
    order: {
        backgroundColor:'#00cdcd',
        height:35,

        justifyContent: 'center',
    },
    orderText: {
        color:'white',
        fontSize:15,
        textAlign:'center',
        fontWeight:'bold',
    },
});