import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-elements';
import { Animated, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text } from './Text';

const Item = (props, { navigation }) => {
    const [animContr, setAnim] = useState({
        '0': new Animated.Value(0),
        '1': new Animated.Value(0),
        '2': new Animated.Value(0),
        '3': new Animated.Value(0),
        '4': new Animated.Value(0)
    });

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Card onPress={() => null} containerStyle={styles.container}>
                    {
                        props.data.map((item, index) => {
                            const maxChar = 95;
                            let descriptionText = '';
                            if (item['description'].length > maxChar) {
                                descriptionText = item['description'].substring(0, maxChar) + " ...";
                            } else {
                                descriptionText = item['description'] + ' ';
                            }

                            return (
                                <Animated.View key={index} style={{ opacity: animContr[index] }}>
                                    <View style={styles.card}>
                                        <View style={styles.cardImgWrapper}>
                                            <Image
                                                onLoadEnd={() => {
                                                    Animated.timing(animContr[index], {
                                                        toValue: 1,
                                                        duration: 500,
                                                        useNativeDriver: true
                                                    }).start()
                                                }}
                                                source={{ uri: item.image + '?' + new Date() }}
                                                resizeMode='cover'
                                                style={styles.cardImg}
                                            />
                                        </View>
                                        <View style={styles.cardInfo}>
                                            <Text style={{ fontSize: 18, color: 'black' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 13, color: 'black' }}>{descriptionText}</Text>
                                        </View>
                                    </View>
                                </Animated.View>
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