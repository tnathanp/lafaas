import React, { useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Dimensions, Image, StyleSheet, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import BackButton from '../component/BackButton';
import * as Animatable from 'react-native-animatable';

const ItemDesc = ({ route, navigation }) => {

    let bottomSheetRef;
    const snapPoints = useMemo(() => ['50%', '65%', '80%'], []);

    const { item, type } = route.params;

    useFocusEffect(() => {
        bottomSheetRef.snapTo(0);
    });

    return (
        <Animatable.View animation='fadeIn'>
            <ImageBackground source={{ uri: item.image }} imageStyle={{ height: '50%' }} style={{ height: '100%', backgroundColor: 'white' }}>

                <View style={{ backgroundColor: 'transparent', height: 0.5 * Dimensions.get('window').height }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ItemView', { item: item })}>
                        <SharedElement id={'image'} >
                            <Image
                                style={{ height: '100%', width: '100%', opacity: 0 }}
                                source={{ uri: item.image }}
                            />
                        </SharedElement>
                    </TouchableWithoutFeedback>

                    <View style={{ position: 'absolute', top: 50, left: 20 }}>
                        <SharedElement id={'backBtn'}>
                            <BackButton navigation={navigation} />
                        </SharedElement>
                    </View>
                </View>

                <BottomSheet ref={refs => bottomSheetRef = refs} index={0} snapPoints={snapPoints}>

                    <View style={{ backgroundColor: 'white', height: '100%', marginTop: -20 }}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.topic}>Description:</Text>
                        <Text style={styles.content}>{item.description}</Text>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {type === 0 && <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 24 }}>Is this yours?</Text>}
                            <TouchableOpacity onPress={() => navigation.navigate(type === 0 ? 'Claiming' : 'Reporting', { item: route.params.item })}>
                                <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.3, 1]} style={{ borderRadius: 16, marginTop: 24 }}>
                                    <Text style={{ paddingHorizontal: 15, paddingVertical: 10, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}>
                                        {type === 0 ? 'Claim' : 'Report'}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                </BottomSheet>

            </ImageBackground>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        margin: 24
    },
    topic: {
        fontSize: 14,
        color: 'black',
        marginLeft: 24
    },
    content: {
        fontSize: 14,
        color: 'black',
        marginLeft: 24,
        marginTop: 10,
        marginRight: 24
    },
    header: {
        backgroundColor: 'white',
        shadowColor: '#000000',
        paddingTop: 10,
        marginBottom: -20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 6,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 5,
    }
});

export default ItemDesc;