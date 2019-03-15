import React, { Component } from 'react';
import {
    View, StyleSheet, TextInput, Text, ListView, FlatList, Image
} from 'react-native';
import Firebase from '../config/Firebase'
import Header from './Header'
import Main from './Main'
import TabOne from './tabOne'
import TabTwo from './tabTwo'
import Contact from './Contact'
import CartView from './CartView'

import TabNavigator from 'react-native-tab-navigator';
export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'hongkhanh',
            selectedTab:"home",
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        }
        var user = Firebase.auth().currentUser;
        var database = Firebase.database();
        
         
        if (user != null) {
            // User is signed in.
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
            });
        } else {
            // No user is signed in.
        }
    }

   
    openMenu() {
        const { open } = this.props;
        open();
    }

    render() {
        const { navigator } = this.props;
        const { ic_image } = styles
        return (
            // <View>
            //     <Header />
            //     <Main/>    
            // </View>

            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="Home"
                    
                    renderIcon={() => <Image style={ic_image} source={require("../image/ic_home4.png")} />}
                    renderSelectedIcon={() => <Image style={ic_image} source={require("../image/ic_home2.png")} />}

                    badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <View style = {{ flex: 1}}>
                        <Header/>
                        <Main/>
                    </View>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'shop'}
                    title="Cart"
                    renderIcon={() => <Image style={ic_image} source={require("../image/ic_cart4.png")} />}
                    renderSelectedIcon={() => <Image style={ic_image} source={require("../image/ic_cart2.png")} />}  
                    onPress={() => this.setState({ selectedTab: 'shop' })}>
                    <View style = {{ flex: 1}}>
                        <Header/>
                        <CartView/>
                    </View>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'contact'}
                    title="Contact"
                    renderIcon={() => <Image style={ic_image} source={require("../image/ic_contact2.png")} />}
                    renderSelectedIcon={() => <Image style={ic_image} source={require("../image/ic_contact4.png")} />}  
                    onPress={() => this.setState({ selectedTab: 'contact' })}>
                    <View style = {{ flex: 1}}>
                        <Header/>
                        <Contact/>
                    </View>
                </TabNavigator.Item>        
            </TabNavigator>
        );
    }
}
const styles = StyleSheet.create({
    ic_image: {
        width:20, height:20
    }
});



{/* <View >
<FlatList

  data={[
    {
    key: 'sản phẩm 1', 
    },

    
  ]}
  renderItem={({item}) => 
        <View style={styleMain.container}>
            <View style={styleMain.content}>
                <View style={styleMain.image}>
                <Image
                    style={styleMain.imageItem}
                     source={{uri: item.img}} />
                </View>
                <View style={styleMain.subTittle}>
                    <Text style={{fontSize:20}}>{item.key}</Text>
                    <Text>{item.price}</Text>
                </View>
            </View>

            <View style={styleMain.content}>
                <View style={styleMain.image}>
                <Image
                    style={styleMain.imageItem}
                     source={{uri: item.img2}} />
                </View>
                <View style={styleMain.subTittle}>
                    <Text style={{fontSize:20}}>{item.key2}</Text>
                    <Text>{item.price2}</Text>
                </View>
            </View>

           
        </View>}
 

 
  
/>

        </View> */}