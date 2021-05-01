import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, View, Dimensions } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import BackButton from '../component/BackButton';
import validator from 'validator';
import * as SecureStore from 'expo-secure-store';

const ChangePassword = ({ navigation }) => {

    let newInput, cnewInput;
    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [cnewpassword, setCnewpassword] = useState("");
    const [formState, setFormState] = useState({
        oldpassword: 0,
        newpassword: 0,
        cnewpassword: 0
    });

    function handleChange(val, field) {
        let isPass;
        switch (field) {
            case 'oldpassword':
                isPass = validator.isAlphanumeric(val, 'en-US');
                if (isPass) setOldpassword(val);
                break;
            case 'newpassword':
                isPass = validator.isAlphanumeric(val, 'en-US');
                if (isPass) setNewpassword(val);
                break;
            case 'cnewpassword':
                isPass = newpassword === val && validator.isAlphanumeric(val, 'en-US');
                if (isPass) setCnewpassword(val);
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

    function change() {
        for (let state in formState) {
            if (state === 'cnewpassword' && formState[state] === 1) {
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

        if (oldpassword === '' || newpassword === '' || cnewpassword === '') return;

        SecureStore.getItemAsync('userToken').then(userToken => {
            fetch('https://lafaas-n4hzx.ondigitalocean.app/useredit', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    curr_pwd: oldpassword,
                    new_pwd: newpassword,
                    token: userToken
                })
            }).then(res => res.json()).then(data => {
                console.log(data)

                if (data.message.includes('Current password is correct.')) {

                    showMessage({
                        message: 'Success',
                        description: 'Password changed successfully',
                        type: 'success',
                        titleStyle: { fontFamily: 'NotoSansBold' },
                        textStyle: { fontFamily: 'NotoSans' },
                        duration: 2500
                    });

                    navigation.goBack();

                } else {
                    showMessage({
                        message: 'Error',
                        description: 'Incorrect password',
                        type: 'danger',
                        titleStyle: { fontFamily: 'NotoSansBold' },
                        textStyle: { fontFamily: 'NotoSans' },
                        duration: 2500
                    });
                }

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
                        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>Change password</Text>
                        <View style={{ marginTop: 5 }}>

                            <Input
                                onChangeText={value => handleChange(value, 'oldpassword')}
                                label='Old Password'
                                style={formState.oldpassword == 0 ? styles.inputBox : styles.inputBoxError}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                rightIcon={() => {
                                    if (formState.oldpassword) {
                                        return (
                                            <View style={{ backgroundColor: 'white', padding: 5 }}>
                                                <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                            </View>
                                        )
                                    }
                                }}
                                rightIconContainerStyle={{ position: 'absolute', left: '85%' }}
                                onSubmitEditing={() => newInput.focus()}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                secureTextEntry={true}
                            />

                            <Input
                                onChangeText={value => handleChange(value, 'newpassword')}
                                label='New Password'
                                style={formState.newpassword == 0 ? styles.inputBox : styles.inputBoxError}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                rightIcon={() => {
                                    if (formState.newpassword) {
                                        return (
                                            <View style={{ backgroundColor: 'white', padding: 5 }}>
                                                <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                            </View>
                                        )
                                    }
                                }}
                                rightIconContainerStyle={{ position: 'absolute', left: '85%' }}
                                onSubmitEditing={() => cnewInput.focus()}
                                ref={instance => { newInput = instance; }}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                secureTextEntry={true}
                            />

                            <Input
                                onChangeText={value => handleChange(value, 'cnewpassword')}
                                label='Confirm New Password'
                                style={formState.cnewpassword == 0 ? styles.inputBox : styles.inputBoxError}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                rightIcon={() => {
                                    if (formState.cnewpassword) {
                                        return (
                                            <View style={{ backgroundColor: 'white', padding: 5 }}>
                                                <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                            </View>
                                        )
                                    }
                                }}
                                rightIconContainerStyle={{ position: 'absolute', left: '85%' }}
                                onSubmitEditing={() => change()}
                                ref={instance => { cnewInput = instance; }}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                secureTextEntry={true}
                            />

                            <View style={{ alignItems: 'center', marginTop: -5 }}>
                                <Button
                                    title="submit"
                                    titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                    buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                    onPress={() => change()}
                                />
                            </View>
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

export default ChangePassword;