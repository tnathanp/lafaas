import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';


const Create = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={{ paddingTop: 70, padding: 35, flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ marginLeft: -11 }}>
                            <Button

                                title="Back"
                                icon={<Entypo name="chevron-left" size={16} style={{ marginTop: -4, marginRight: -8 }} color='#fc8181' />}
                                titleStyle={{ padding: 10, marginTop: -5, fontWeight: '500', color: '#fc8181', fontSize: 13 }}
                                buttonStyle={{ width: 70, height: 25, borderRadius: 20, backgroundColor: 'white' }}
                                onPress={() => navigation.goBack()}
                            />
                        </View>

                        <View style={{ paddingTop: 54 }}>
                            <Text
                                style={{ 'fontSize': 36, 'color': 'white', 'fontWeight': 'bold', 'textAlign': 'center', 'marginBottom': 27 }}>Create Account</Text>
                        </View>

                        <Input

                            onChangeText={value => setUsername({ value })}
                            label='Username'
                            style={{ 'backgroundColor': 'white', 'opacity': 0.75, 'borderRadius': 10 }}
                            labelStyle={{ 'color': 'white', 'marginBottom': 5, 'fontSize': 16, 'fontWeight': 'bold' }}
                            inputContainerStyle={{ 'borderBottomColor': 'transparent' }}
                            inputStyle={{ 'fontSize': 16 }}

                        />

                        <Input

                            onChangeText={value => setEmail({ value })}
                            label='Email'
                            style={{ 'backgroundColor': 'white', 'opacity': 0.75, 'borderRadius': 10 }}
                            labelStyle={{ 'color': 'white', 'marginBottom': 5, 'fontSize': 16 }}
                            inputContainerStyle={{ 'borderBottomColor': 'transparent' }}
                            inputStyle={{ 'fontSize': 16 }}

                        />
                        <Input

                            onChangeText={value => setEmailConfirm({ value })}
                            label='Confirm Email'
                            style={{ 'backgroundColor': 'white', 'opacity': 0.75, 'borderRadius': 10 }}
                            labelStyle={{ 'color': 'white', 'marginBottom': 5, 'fontSize': 16 }}
                            inputContainerStyle={{ 'borderBottomColor': 'transparent' }}
                            inputStyle={{ 'fontSize': 16 }}
                            containerStyle={{ 'borderBottomColor': 'transparent', 'marginTop': -16 }}

                        />

                        <Input

                            onChangeText={value => setPassword({ value })}
                            label='Password'
                            style={{ 'backgroundColor': 'white', 'opacity': 0.75, 'borderRadius': 10 }}
                            labelStyle={{ 'color': 'white', 'marginBottom': 5, 'fontSize': 16 }}
                            inputContainerStyle={{ 'borderBottomColor': 'transparent' }}
                            inputStyle={{ 'fontSize': 16 }}

                        />
                        <Input

                            onChangeText={value => setPasswordConfirm({ value })}
                            label='Confirm Password'
                            style={{ 'backgroundColor': 'white', 'opacity': 0.75, 'borderRadius': 10 }}
                            labelStyle={{ 'color': 'white', 'marginBottom': 5, 'fontSize': 16 }}
                            inputContainerStyle={{ 'borderBottomColor': 'transparent' }}
                            inputStyle={{ 'fontSize': 16 }}
                            containerStyle={{ 'borderBottomColor': 'transparent', 'marginTop': -16 }}

                        />

                        <View style={{ alignItems: 'center', marginTop: -5 }}>
                            <Button
                                title="create"
                                titleStyle={{ padding: 10, marginTop: -3, fontWeight: 'bold', color: '#fc8181', fontSize: 14 }}
                                buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                onPress={() => null}

                            />
                        </View>

                        <View style={{ flex: 1 }} />

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}


export default Create;