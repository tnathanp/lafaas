import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {View,Text,Button,StyleSheet,Image,ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { Input, Card } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

const dummyItems = [
    {
        name: 'Tumbler1',
        image: '../images/bag.jpg',
    },
    {
        name: 'Tumbler2',
        image: '../images/tumbler.jpg',
    },
    {
        name: 'Tumbler1',
        image: '../images/bag.jpg',
    },
    {
        name: 'Tumbler2',
        image: '../images/tumbler.jpg',
    },
    {
        name: 'Tumbler1',
        image: '../images/bag.jpg',
    },
    {
        name: 'Tumbler2',
        image: '../images/tumbler.jpg',
    },    {
        name: 'Tumbler1',
        image: '../images/bag.jpg',
    },
    {
        name: 'Tumbler2',
        image: '../images/tumbler.jpg',
    },
]

const ClaimedItem = () => {
    const [searchClaimed, setSearchClaimed] = useState("");
    return (
        <View>
            <View style={{margin: 10 }}>
                <Input
                    onChangeText={value => setSearchClaimed({ value })}
                    style={styles.inputBox}
                    labelStyle={styles.label}
                    inputStyle={styles.input}
                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                />
            </View>
            <View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text>tt</Text>
                <Card>
                    {
                        dummyItems.map((u, i) => {
                            return (
                                <View key={i}>                           
                                    <View style={styles.cardsWrapper}>
                                        <View style={styles.card}>
                                            <View style={styles.cardImgWrapper}>
                                                <Image
                                                    source={require('../images/bag.jpg')}
                                                    resizeMode="cover"
                                                    style={styles.cardImg}
                                                />
                                            </View>
                                            <View style={styles.cardInfo}>
                                                <Text>{u.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    }
                </Card>
            </ScrollView>
            </View>
        </View>
    );
}

const RegisteredItem = () => {
    const [searchRegisterd, setSearchRegisterd] = useState("");
    return (
        <Text>registerd</Text>
    );
}

const Top = createMaterialTopTabNavigator();
const Item = () => {
    return ( 
        <View style={{ flex: 1, marginTop: 30}}>      
            <Top.Navigator>
                <Top.Screen name="ClaimedItem" component={ClaimedItem}/>
                <Top.Screen name="RegisteredItem" component={RegisteredItem}/>
            </Top.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        borderWidth: 1.5,
        borderColor: 'white',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.4,
        elevation: 5
    },
    input: {
        fontFamily: 'NotoSansBold',
        fontSize: 15,
        padding: 10
    },
    label: {
        color: 'white',
        marginBottom: 3,
        fontSize: 16,
        fontFamily: 'NotoSansBold'
    },
    container: {
        flex: 1,
    },
    cardsWrapper: {
        width: '100%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
      },
});

export default Item;