import React, { useState, useEffect } from 'react';
import * as NativeElement from 'react-native-elements';
import { Button, Input, Card } from 'react-native-elements';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text } from './Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';


const Item = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(

        {
            register:
            {
                1:
                {
                    name: "canvas",
                    item_id: 111,
                    location: "pacific ocean",
                    color: "blue",
                    description: "sda;jfas;dlff",
                    image: 'https://picsum.photos/200/400'

                },
                2:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://picsum.photos/200/400'

                },
                3:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://picsum.photos/200/400'

                },
                4:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://picsum.photos/200/400'

                },
                5:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaosadaFDF;LSDFJLncn,mzcnmzcxzcxn,.zc,.ckl;asljkasfdljkfadl;ads;ladsjkcnm.,cxv,mnldaksJLJKADSLJKDSHLJKCVXBN,MCXJajklsljSDALKJ;FDSLJSDFpf",
                    image: 'https://picsum.photos/200/400'

                }
            },



            claim: {
                1:
                {
                    name: "canvas kha",
                    item_id: 333,
                    location: "pacific ocean",
                    color: "blue",
                    description: ";aldfalskfd",
                    image: 'https://picsum.photos/200/400'

                }
            }
        }

    );
    let arr = [];
    let descriptionText = ''
    for (let index in data.register) {
        arr.push(data.register[index])
    }






    return (

        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Card onPress={() => null} containerStyle={styles.container}>
                    {
                        arr.map((item, index) => {
                            const maxChar = 95
                            let descriptionText = ''
                            if (item['description'].length > maxChar) {
                                descriptionText = item['description'].substring(0, maxChar) + " ..."
                            } else {
                                descriptionText = item['description'] + ' '
                            }

                            return (
                                <View key={index}>
                                    <View style={styles.cardsWrapper}>
                                        <View style={styles.card}>
                                            <View style={styles.cardImgWrapper}>
                                                <Image
                                                    source={{ uri: item.image }}
                                                    resizeMode="cover"
                                                    style={styles.cardImg}
                                                />
                                            </View>
                                            <View style={styles.cardInfo}>
                                                <Text style={{ fontSize: 18, color: 'black' }}>{item.name}</Text>
                                                <Text style={{ fontSize: 13, color: 'black' }}>{descriptionText}</Text>
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
        marginTop: -15,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        flex: 1,
    },
    cardsWrapper: {
        elevation: 0,
        width: '100%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 7,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 0,
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
    }
});

export default Item;