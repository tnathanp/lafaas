import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, View, Keyboard } from 'react-native';
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

const Create = ({ navigation }) => {
    let lnameInput, usernameInput, emailInput, passInput, cpassInput;

    const { dispatch } = useAuthContext();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setLoad] = useState(false);
    const [formState, setFormState] = useState({
        fname: 0,
        lname: 0,
        username: 0,
        email: 0,
        password: 0,
        cpassword: 0
    });

    function handleChange(val, field) {
        let isPass;
        switch (field) {
            case 'fname':
                isPass = validator.isAlpha(val, 'en-US');
                if (isPass) setFname(val);
                break;
            case 'lname':
                isPass = validator.isAlpha(val, 'en-US');
                if (isPass) setLname(val);
                break;
            case 'username':
                isPass = validator.isAlphanumeric(val, 'en-US');
                if (isPass) setUsername(val);
                break;
            case 'email':
                isPass = validator.isEmail(val);
                if (isPass) setEmail(val);
                break;
            case 'password':
                isPass = validator.isAlphanumeric(val, 'en-US');
                if (isPass) setPassword(val);
                break;
            case 'cpassword':
                isPass = password === val && validator.isAlphanumeric(val, 'en-US');
                if (isPass) setPasswordConfirm(val);
                break;
        }

        if (val === '') isPass = true;

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

    async function createAccount() {
        //Check if there are input errors
        for (let state in formState) {
            if (state === 'cpassword' && formState[state] === 1) {
                showMessage({
                    message: 'Error',
                    description: 'Password fields do not match',
                    type: 'danger',
                    titleStyle: { fontFamily: 'NotoSansBold' },
                    textStyle: { fontFamily: 'NotoSans' },
                    duration: 2500
                });
                return;
            } else {
                if (formState[state] === 1) {
                    showMessage({
                        message: 'Error',
                        description: 'Some input field contains invalid character',
                        type: 'danger',
                        titleStyle: { fontFamily: 'NotoSansBold' },
                        textStyle: { fontFamily: 'NotoSans' },
                        duration: 2500
                    });
                    return;
                }
            }
        }
        //Check if it is empty
        if (username === '' || password === '' || fname === '' || lname === '' || email === '' || passwordConfirm === '') return;

        setLoad(true);

        Notifications.getExpoPushTokenAsync({ experienceId: '@tanathanp/LaFaaS' }).then(token => {
            fetch('https://lafaas-n4hzx.ondigitalocean.app/createuser', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    user: username,
                    pass: passwordConfirm,
                    email: email,
                    fname: fname,
                    lname: lname,
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
                            description: 'Username already exists',
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
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View onStartShouldSetResponder={() => true}>
                                <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>Create Account</Text>

                                <View style={{ flexDirection: 'row', marginBottom: 0 }}>
                                    <View style={{ width: '50%' }}>
                                        <Input
                                            onChangeText={value => handleChange(value, 'fname')}
                                            label='First Name'
                                            style={formState.fname == 0 ? styles.inputBox : styles.inputBoxError}
                                            labelStyle={styles.label}
                                            inputStyle={styles.input}
                                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                            rightIcon={() => {
                                                if (formState.fname) {
                                                    return (
                                                        <View style={{ backgroundColor: 'white', padding: 5 }}>
                                                            <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                                        </View>
                                                    )
                                                }
                                            }}
                                            rightIconContainerStyle={{ position: 'absolute', left: '75%' }}
                                            onSubmitEditing={() => lnameInput.focus()}
                                            autoCorrect={false}
                                        />
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Input
                                            onChangeText={value => handleChange(value, 'lname')}
                                            label='Last Name'
                                            style={formState.lname == 0 ? styles.inputBox : styles.inputBoxError}
                                            labelStyle={styles.label}
                                            inputStyle={styles.input}
                                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                            rightIcon={() => {
                                                if (formState.lname) {
                                                    return (
                                                        <View style={{ backgroundColor: 'white', padding: 5 }}>
                                                            <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                                        </View>
                                                    )
                                                }
                                            }}
                                            rightIconContainerStyle={{ position: 'absolute', left: '75%' }}
                                            onSubmitEditing={() => usernameInput.focus()}
                                            ref={instance => { lnameInput = instance; }}
                                            autoCorrect={false}
                                        />
                                    </View>
                                </View>

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
                                    onSubmitEditing={() => emailInput.focus()}
                                    ref={instance => { usernameInput = instance; }}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                />

                                <Input
                                    onChangeText={value => handleChange(value, 'email')}
                                    label='Email'
                                    style={formState.email == 0 ? styles.inputBox : styles.inputBoxError}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                    rightIcon={() => {
                                        if (formState.email) {
                                            return (
                                                <View style={{ backgroundColor: 'white', padding: 5 }}>
                                                    <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                                </View>
                                            )
                                        }
                                    }}
                                    rightIconContainerStyle={{ position: 'absolute', left: '85%' }}
                                    onSubmitEditing={() => passInput.focus()}
                                    ref={instance => { emailInput = instance; }}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                    keyboardType={'email-address'}
                                    autoCompleteType={'email'}
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
                                    onSubmitEditing={() => cpassInput.focus()}
                                    ref={instance => { passInput = instance; }}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    autoCapitalize={'none'}
                                />

                                <Input
                                    onChangeText={value => handleChange(value, 'cpassword')}
                                    label='Confirm Password'
                                    style={formState.cpassword == 0 ? styles.inputBox : styles.inputBoxError}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                    rightIcon={() => {
                                        if (formState.cpassword) {
                                            return (
                                                <View style={{ backgroundColor: 'white', padding: 5 }}>
                                                    <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                                </View>
                                            )
                                        }
                                    }}
                                    rightIconContainerStyle={{ position: 'absolute', left: '85%' }}
                                    containerStyle={{ marginTop: -20, marginBottom: 10 }}
                                    onSubmitEditing={() => createAccount()}
                                    ref={instance => { cpassInput = instance; }}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    autoCapitalize={'none'}
                                />

                                <View style={{ alignItems: 'center', marginTop: -5, marginBottom: 15 }}>
                                    <Button
                                        title={isLoading ? <LoadingButton /> : "create"}
                                        titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                        buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                        disabled={isLoading}
                                        disabledStyle={{ backgroundColor: 'white' }}
                                        onPress={() => createAccount()}
                                    />
                                </View>
                            </View>
                        </ScrollView>
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

export default Create;