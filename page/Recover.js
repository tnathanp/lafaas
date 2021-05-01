import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, View, Dimensions } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import BackButton from '../component/BackButton';
import LottieView from 'lottie-react-native';
import validator from 'validator';

const Recover = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [formState, setFormState] = useState({ email: 0 });

    function handleChange(val) {
        if (validator.isEmail(val)) {
            setEmail(val);
            setFormState({ email: 0 });
        } else {
            setFormState({ email: 1 });
        }
    }

    function recover() {
        if (formState.email === 1 || email == '') {
            showMessage({
                message: 'Error',
                description: 'Please enter a valid email address',
                type: 'danger',
                titleStyle: { fontFamily: 'NotoSansBold' },
                textStyle: { fontFamily: 'NotoSans' },
                duration: 2500
            });
            return;
        }

        showMessage({
            message: 'Success',
            description: 'If your account exists, the email will be sent to you',
            type: 'success',
            titleStyle: { fontFamily: 'NotoSansBold' },
            textStyle: { fontFamily: 'NotoSans' },
            duration: 3000
        });

        navigation.goBack();

    }

    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ position: 'absolute', top: 50, left: 20 }}>
                        <BackButton navigation={navigation} />
                    </View>

                    <KeyboardAvoidingView style={{ flex: 1, marginTop: 70 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>Recover your account</Text>
                        <View style={{ marginTop: 5 }}>

                            <Input
                                onChangeText={value => handleChange(value)}
                                label='Enter your email address'
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
                                onSubmitEditing={() => null}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                autoCompleteType={'email'}
                            />

                            <View style={{ alignItems: 'center', marginTop: -5 }}>
                                <Button
                                    title="send email"
                                    titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                    buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                    onPress={() => recover()}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <LottieView
                        style={{
                            width: 0.4 * Dimensions.get('window').width,
                            height: 0.4 * Dimensions.get('window').width,
                            backgroundColor: 'transparent',
                            alignSelf: 'center',
                            marginBottom: '60%'
                        }}
                        source={require('../assets/anim/8282-search-icon.json')}
                        autoPlay
                    />

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

export default Recover;