import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, ScrollView, KeyboardAvoidingView, View, Keyboard, Image } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Claiming = ({ navigation }) => {
    let idInput

    const [id, setId] = useState("");




    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            
            
            <View style={{ flex: 1}}>
            
            <View style={{ position: 'absolute', top: 50, left: 20 }}>
                    <Button
                        title="Back"
                        icon={<Entypo name="chevron-left" size={16} style={{ marginTop: -3, marginRight: -8 }} color='#fc8181' />}
                        titleStyle={{ fontSize: 13, fontFamily: 'NotoSans', padding: 10, marginTop: -5, color: '#fc8181' }}
                        buttonStyle={{ width: 70, height: 26, borderRadius: 20, backgroundColor: 'white' }}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <KeyboardAvoidingView style={{ flex: 1, marginTop: 50 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                   
                        <View style={{ padding: 20, left: 20 }} >
                            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50 }}>Claim</Text>
                            <Text style={{ fontSize: 16 }}>Item name from item description</Text>
                        </View>

                        <View style={{ marginBottom: 10 }} >
                            <Image
                                source={{ uri: 'https://picsum.photos/200/300' }}
                                resizeMode="cover"
                                style={styles.stretch}

                            />

                        </View>
                        <View style={{ padding: 20}}>
                        <Input
                            onChangeText={value =>setId(value, 'id')}
                            label='Identification card number'
                            style={styles.inputBox}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            onSubmitEditing={() => Keyboard.dismiss}
                            ref={box => { idInput = box; }}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                        />
                        </View>
                       
                        <View style={{ alignItems: 'center', marginBottom: 15 }}>
                            <Button
                                title="submit"
                                titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                onPress={() => null}
                            />
                        </View>
                   
                </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    stretch: {
        height: 200,
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
    }
});

export default Claiming;