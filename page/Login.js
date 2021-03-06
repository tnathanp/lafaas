import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, View } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '../component/AuthContext';
import { showMessage } from 'react-native-flash-message';
import { FontAwesome } from '@expo/vector-icons';
import BackButton from '../component/BackButton';
import LoadingButton from '../component/LoadingButton';
import validator from 'validator';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';

const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

const Login = ({ navigation }) => {

    let passwordInput;
    const { dispatch } = useAuthContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoad] = useState(false);
    const [formState, setFormState] = useState({
        username: 0,
        password: 0
    });

    function handleChange(val, field) {
        let isPass;
        switch (field) {
            case 'username':
                isPass = validator.isAlphanumeric(val, 'en-US');
                if (val === '') isPass = true;
                if (isPass) setUsername(val);
                break;
            case 'password':
                isPass = validator.isAlphanumeric(val, 'en-US');

                if (val === '') isPass = true;
                if (isPass) setPassword(val);
                break;
        }

        if (isPass) {
            setFormState(prev => {
                let state = ({ ...prev });
                state[field] = 0;
                return state
            });
        } else {
            setFormState(prev => {
                let state = ({ ...prev });
                state[field] = 1;
                return state
            });
        }
    }

    async function login() {
        //Check if there are input errors
        for (let state in formState) {
            if (formState[state] === 1) {
                showMessage({
                    message: 'Error',
                    description: 'Username or password contains invalid character',
                    type: 'danger',
                    titleStyle: { fontFamily: 'NotoSansBold' },
                    textStyle: { fontFamily: 'NotoSans' },
                    duration: 2500
                });
                return;
            }
        }
        //Check if it is empty
        if (username == '' || password == '') return;

        setLoad(true);

        Notifications.getExpoPushTokenAsync({ experienceId: '@tanathanp/LaFaaS' }).then(token => {
            fetch('https://lafaas-n4hzx.ondigitalocean.app/login', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    user: username,
                    pass: password,
                    noti_token: token.data.split(']')[0].substring(18)
                })
            }).then(res => res.json()).then(data => {
                console.log(data);
                wait(100).then(() => {
                    if (data.code === 1) {

                        SecureStore.setItemAsync('userToken', data.token).then(() => {
                            SecureStore.setItemAsync('username', data.name).then(() => dispatch({ type: 'SIGN_IN' }));
                        });

                    } else {

                        showMessage({
                            message: 'Error',
                            description: 'Wrong username or password',
                            type: 'danger',
                            titleStyle: { fontFamily: 'NotoSansBold' },
                            textStyle: { fontFamily: 'NotoSans' },
                            duration: 2500
                        });

                        setLoad(false);
                    }
                })
            });
        });

    }

    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ position: 'absolute', top: 50, left: 20 }}>
                        <BackButton navigation={navigation} />
                    </View>

                    <KeyboardAvoidingView style={{ flex: 1, marginTop: 70 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                        <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>Login</Text>

                        <Input
                            onChangeText={value => handleChange(value, 'username')}
                            label='Username'
                            style={formState.username == 0 ? styles.inputBox : styles.inputBoxError}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            rightIcon={() => {
                                if (formState.username) {
                                    return (
                                        <View style={{ backgroundColor: 'white', padding: 5 }}>
                                            <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                        </View>
                                    )
                                }
                            }}
                            rightIconContainerStyle={{ position: 'absolute', left: '85%' }}
                            onSubmitEditing={() => passwordInput.focus()}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                        />

                        <Input
                            onChangeText={value => handleChange(value, 'password')}
                            label='Password'
                            style={formState.password == 0 ? styles.inputBox : styles.inputBoxError}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            rightIcon={() => {
                                if (formState.password) {
                                    return (
                                        <View style={{ backgroundColor: 'white', padding: 5 }}>
                                            <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                        </View>
                                    )
                                }
                            }}
                            rightIconContainerStyle={{ position: 'absolute', left: '85%' }}
                            onSubmitEditing={() => login()}
                            ref={instance => { passwordInput = instance; }}
                            autoCorrect={false}
                            secureTextEntry={true}
                            autoCapitalize={'none'}
                        />

                        <View style={{ alignItems: 'center', marginTop: -5 }}>
                            <Button
                                title={isLoading ? <LoadingButton /> : "login"}
                                titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                disabled={isLoading}
                                disabledStyle={{ backgroundColor: 'white' }}
                                onPress={() => login()}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 3, justifyContent: 'center' }}>
                            <Button
                                title="create account"
                                type="clear"
                                titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#ffffff', fontSize: 14 }}
                                buttonStyle={{ width: 160, height: 32, borderRadius: 10, backgroundColor: 'transparent' }}
                                onPress={() => navigation.navigate('Create')}
                            />
                            <Button
                                title="forgot password"
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
        borderColor: 'white'
    },
    inputBoxError: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        borderWidth: 1.5,
        borderColor: 'red'
    },
    input: {
        fontFamily: 'NotoSans',
        fontSize: 15,
        padding: 10
    },
    label: {
        color: 'white',
        marginBottom: 3,
        fontSize: 16,
        fontFamily: 'NotoSansBold'
    }
});

export default Login;
