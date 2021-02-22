import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

const Create = ({ navigation }) => {
    let lnameInput, usernameInput, emailInput, cemailInput, passInput, cpassInput;

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginTop: 0, marginBottom: 30 }}>Create Account</Text>

                            <View style={{ flexDirection: 'row', marginBottom: -15 }}>
                                <View style={{ width: '50%' }}>
                                    <Input
                                        onChangeText={value => setFname({ value })}
                                        label='First Name'
                                        style={styles.inputBox}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        onSubmitEditing={() => lnameInput.focus()}
                                    />
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Input
                                        onChangeText={value => setLname({ value })}
                                        label='Last Name'
                                        style={styles.inputBox}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        onSubmitEditing={() => usernameInput.focus()}
                                        ref={box => { lnameInput = box; }}
                                    />
                                </View>
                            </View>

                            <Input
                                onChangeText={value => setUsername({ value })}
                                label='Username'
                                style={styles.inputBox}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                onSubmitEditing={() => emailInput.focus()}
                                ref={box => { usernameInput = box; }}
                            />

                            <Input
                                onChangeText={value => setEmail({ value })}
                                label='Email'
                                style={styles.inputBox}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                onSubmitEditing={() => cemailInput.focus()}
                                ref={box => { emailInput = box; }}
                            />

                            <Input
                                onChangeText={value => setEmailConfirm({ value })}
                                label='Confirm Email'
                                style={styles.inputBox}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                containerStyle={{ marginTop: -15 }}
                                onSubmitEditing={() => passInput.focus()}
                                ref={box => { cemailInput = box; }}
                            />

                            <Input
                                onChangeText={value => setPassword({ value })}
                                label='Password'
                                style={styles.inputBox}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                secureTextEntry={true}
                                onSubmitEditing={() => cpassInput.focus()}
                                ref={box => { passInput = box; }}
                            />

                            <Input
                                onChangeText={value => setPasswordConfirm({ value })}
                                label='Confirm Password'
                                style={styles.inputBox}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                containerStyle={{ marginTop: -15 }}
                                secureTextEntry={true}
                                onSubmitEditing={() => null}
                                ref={box => { cpassInput = box; }}
                            />

                            <View style={{ alignItems: 'center', marginTop: -5 }}>
                                <Button
                                    title="create"
                                    titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                    buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                    onPress={() => null}
                                />
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
        opacity: 0.75,
        borderRadius: 10,
        borderBottomColor: 'transparent'
    },
    input: {
        fontFamily: 'NotoSansBold',
        fontSize: 16,
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