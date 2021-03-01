import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SharedElement } from 'react-navigation-shared-element';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

const ItemView = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>

            <StatusBar hidden={false} />

            <View style={{ position: 'absolute', top: 50, left: 20, zIndex: 1 }}>
                <SharedElement id={'backBtn'}>
                    <Button
                        title="Back"
                        icon={<Entypo name="chevron-left" size={16} style={{ marginTop: -3, marginRight: -8 }} color='#fc8181' />}
                        titleStyle={{ fontSize: 13, fontFamily: 'NotoSans', padding: 10, marginTop: -5, color: '#fc8181' }}
                        buttonStyle={{ width: 70, height: 26, borderRadius: 20, backgroundColor: 'white' }}
                        onPress={() => navigation.goBack()}
                    />
                </SharedElement>
            </View>

            <SharedElement id={'image'}>
                <Image
                    resizeMode='contain'
                    style={{ alignSelf: 'center', width: '100%', height: '100%' }}
                    source={{ uri: item.image }} />
            </SharedElement>
        </View>
    );
}

ItemView.sharedElements = route => {
    return [
        {
            id: 'image',
            animation: 'move'
        },
        {
            id: 'backBtn',
            animation: 'move'
        }
    ];
};

export default ItemView;