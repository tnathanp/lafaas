import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';
import BottomSheet from 'reanimated-bottom-sheet';

const ItemDesc = ({ route, navigation }) => {
    let infoSheet;
    const { item } = route.params;
    const itemName = "Starbuck Tumbler";
    const itemDes = "Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ";

    useFocusEffect(() => {
        infoSheet.snapTo(1);
    });

    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>

            <StatusBar hidden />

            <View style={{ backgroundColor: 'white', height: 0.5 * Dimensions.get('window').height }}>
                <SharedElement id={'image'} >
                    <Image
                        style={{ height: '100%', width: '100%' }}
                        source={{ uri: item.image }}
                    />
                </SharedElement>

                <View style={{ position: 'absolute', top: 50, left: 20 }}>
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
            </View>

            <BottomSheet
                enabledBottomClamp
                ref={refs => infoSheet = refs}
                initialSnap={1}
                snapPoints={['85%', '50%', '40%']}
                borderRadius={10}
                onCloseEnd={() => navigation.navigate('ItemView', { item: item })}
                renderHeader={() => (
                    <View style={styles.header}>
                        <View style={styles.panelHeader}>
                            <View style={styles.panelHandle} />
                        </View>
                    </View>
                )}
                renderContent={() => (
                    <View style={{ backgroundColor: 'white', height: '100%' }}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.topic}>Description:</Text>
                        <Text style={styles.content}>{item.description}</Text>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', margin: 24 }}>Is this yours?</Text>
                            <Button
                                title='Claim'
                                onPress={() => navigation.navigate('Claiming', { item: route.params.item })}
                                titleStyle={{ padding: 10, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                                buttonStyle={{ borderRadius: 16 }}
                                ViewComponent={LinearGradient}
                                linearGradientProps={{
                                    colors: ['#fc8181', '#f6a085'],
                                    locations: [0.3, 1]
                                }}
                            />
                        </View>

                    </View>
                )}
            />
        </View>
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