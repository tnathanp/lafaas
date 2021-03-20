import React from 'react';
import { View, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import BackButton from '../component/BackButton';

const ItemView = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>

            <View style={{ position: 'absolute', top: 50, left: 20, zIndex: 1 }}>
                <SharedElement id={'backBtn'}>
                    <BackButton navigation={navigation} />
                </SharedElement>
            </View>

            <SharedElement id={'image'}>
                <Image
                    resizeMode='contain'
                    style={{ alignSelf: 'center', width: '100%', height: '100%' }}
                    source={{ uri: item.image }} 
                    />
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