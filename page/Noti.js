import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Keyboard, Image } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

const Noti = ({ route, navigation }) => {



    return (
        <View style={{ height: '100%', backgroundColor: 'white',justifyContent: 'center' }}>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View >
        
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: -50 }} onStartShouldSetResponder={() => true}>
                                <View style={{ marginBottom: 30, alignItems: 'center' }} >
                                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50, color: 'black' }}>Found Possible Item!</Text>
                                    <Text style={{ fontSize: 16, color: 'black' }}>Did you lose a <Text style={{ fontWeight: "bold", color: 'black' }}> ITEM NAME</Text> ?</Text>
                                </View>

                                <View style={{ marginBottom: 10, alignItems: 'center' }} >
                                    <Image
                                        source={{ uri: 'https://ninjaya.com/media/product/7a0/canvas-tote-bag-large-horizontal-703.jpg' }}
                                        resizeMode="cover"
                                        style={styles.stretch}
                                    />
                                </View>



                                <View style={{ height: '100%' }}>


                                    <View style={{  alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', margin: 24 }}>Is this yours?</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{ marginRight: 10 }}> 
                                                <Button
                                                    title='YES'
                                                    onPress={() => null}
                                                    titleStyle={{ padding: 10, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                                                    buttonStyle={{ borderRadius: 16 }}
                                                    ViewComponent={LinearGradient}
                                                    linearGradientProps={{
                                                        colors: ['#fc8181', '#f6a085'],
                                                        locations: [0.3, 1]
                                                    }}
                                                />
                                            </View>
                                            <View> 
                                                <Button
                                                    title='NO'
                                                    onPress={() => null }
                                                    titleStyle={{ padding: 10, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                                                    buttonStyle={{ borderRadius: 16, }}
                                                    ViewComponent={LinearGradient}
                                                    linearGradientProps={{
                                                        colors: ['#fc8181', '#f6a085'],
                                                        locations: [0.3, 1]
                                                    }}

                                                   
                                                />
                                            </View>
                                        </View>

                                    </View>

                           
                                </View>
                            </View>
                        </ScrollView>
                   
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    stretch: {
        height: 320,
        width: 320,
        borderRadius: 10,
        resizeMode: 'cover',
    },
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
        elevation: 5,
    },
    input: {
        fontFamily: 'NotoSans',
        fontSize: 15,
        padding: 10
    },
    inputError: {
        fontFamily: 'NotoSansBold',
        fontSize: 15,
        padding: 10,
        color: '#FC4E29'
    },
    label: {
        color: 'white',
        marginBottom: 3,
        fontSize: 16,
        fontFamily: 'NotoSansBold'
    },
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
    }
});

export default Noti;