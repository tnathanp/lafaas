import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, View } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

const Login = ({ navigation }) => {
    let usernameInput, passwordInput;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ position: 'absolute', top: 50, left: 20 }}>
                        <Button
                            title="Back"
                            icon={<Entypo name="chevron-left" size={16} style={{ marginTop: -3, marginRight: -8 }} color='#fc8181' />}
                            titleStyle={{ fontSize: 13, fontFamily: 'NotoSans', padding: 10, marginTop: -5, color: '#fc8181' }}
                            buttonStyle={{ width: 70, height: 26, borderRadius: 20, backgroundColor: 'white' }}
                            onPress={() => navigation.goBack()}
                        />
                    </View>

                    <KeyboardAvoidingView style={{ flex: 1, marginTop: 70 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>

                        <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>Login</Text>

                        <Input
                            onChangeText={value => setUsername(value)}
                            label='Username'
                            style={styles.inputBox}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            onSubmitEditing={() => passwordInput.focus()}
                            ref={box => { usernameInput = box; }}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                        />

                        <Input
                            onChangeText={value => setPassword(value)}
                            label='Password'
                            style={styles.inputBox}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            onSubmitEditing={() => null}
                            ref={box => { passwordInput = box; }}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                        />

                        <View style={{ alignItems: 'center', marginTop: -5 }}>
                            <Button
                                title="create"
                                titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                onPress={() => null}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <Button
                                title="create account"
                                type="clear"
                                titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#ffffff', fontSize: 14 }}
                                buttonStyle={{ width: 160, height: 32, borderRadius: 10, backgroundColor: 'transparent' }}
                                onPress={() => navigation.navigate('Create')}
                            />
                            <Button
                                title="forget password"
                                type="clear"
                                titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#ffffff', fontSize: 14 }}
                                buttonStyle={{ width: 160, height: 32, borderRadius: 10, backgroundColor: 'transparent' }}
                                onPress={() => navigation.navigate('Recover')}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </LinearGradient>
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
    inputBoxError: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        borderWidth: 1.5,
        borderColor: '#FC4E29',
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

export default Login;
