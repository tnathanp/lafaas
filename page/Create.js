import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, View, Keyboard } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../component/BackButton';
import validator from 'validator';

const Create = ({ navigation }) => {
    let lnameInput, usernameInput, emailInput, passInput, cpassInput;

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
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
                isPass = password === val && validator.isStrongPassword(val, { minSymbols: 0 });
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

                                <View style={{ flexDirection: 'row', marginBottom: -15 }}>
                                    <View style={{ width: '50%' }}>
                                        <Input
                                            onChangeText={value => handleChange(value, 'fname')}
                                            label='First Name'
                                            style={formState.fname == 0 ? styles.inputBox : styles.inputBoxError}
                                            labelStyle={styles.label}
                                            inputStyle={formState.fname == 0 ? styles.input : styles.inputError}
                                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
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
                                            inputStyle={formState.lname == 0 ? styles.input : styles.inputError}
                                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                            onSubmitEditing={() => usernameInput.focus()}
                                            ref={box => { lnameInput = box; }}
                                            autoCorrect={false}
                                        />
                                    </View>
                                </View>

                                <Input
                                    onChangeText={value => handleChange(value, 'username')}
                                    label='Username'
                                    style={formState.username == 0 ? styles.inputBox : styles.inputBoxError}
                                    labelStyle={styles.label}
                                    inputStyle={formState.username == 0 ? styles.input : styles.inputError}
                                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                    onSubmitEditing={() => emailInput.focus()}
                                    ref={box => { usernameInput = box; }}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                />

                                <Input
                                    onChangeText={value => handleChange(value, 'email')}
                                    label='Email'
                                    style={formState.email == 0 ? styles.inputBox : styles.inputBoxError}
                                    labelStyle={styles.label}
                                    inputStyle={formState.email == 0 ? styles.input : styles.inputError}
                                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                    onSubmitEditing={() => passInput.focus()}
                                    ref={box => { emailInput = box; }}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                />

                                <Input
                                    onChangeText={value => handleChange(value, 'password')}
                                    label='Password'
                                    style={formState.password == 0 ? styles.inputBox : styles.inputBoxError}
                                    labelStyle={styles.label}
                                    inputStyle={formState.password == 0 ? styles.input : styles.inputError}
                                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                    onSubmitEditing={() => cpassInput.focus()}
                                    ref={box => { passInput = box; }}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    autoCapitalize={'none'}
                                />

                                <Input
                                    onChangeText={value => handleChange(value, 'cpassword')}
                                    label='Confirm Password'
                                    style={formState.cpassword == 0 ? styles.inputBox : styles.inputBoxError}
                                    labelStyle={styles.label}
                                    inputStyle={formState.cpassword == 0 ? styles.input : styles.inputError}
                                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                    containerStyle={{ marginTop: -20, marginBottom: 10 }}
                                    onSubmitEditing={() => Keyboard.dismiss}
                                    ref={box => { cpassInput = box; }}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    autoCapitalize={'none'}
                                />

                                <View style={{ alignItems: 'center', marginTop: -5, marginBottom: 15 }}>
                                    <Button
                                        title="create"
                                        titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                        buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                        onPress={() => console.log(fname + lname + username + password + email)}
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
        fontFamily: 'NotoSans',
        fontSize: 15,
        padding: 10
    },
    inputError: {
        fontFamily: 'NotoSans',
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

export default Create;