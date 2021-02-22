import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Dimensions } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const deviceWidth = Dimensions.get('window').width;

const Recover = ({ navigation }) => {
    let animation;
    useEffect(() => animation.play(), []);

    const [email, setEmail] = useState("");

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
                        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>Recover your account</Text>
                        <View style={{ marginTop: 5 }}>
                            <Input
                                onChangeText={value => setEmail({ value })}
                                label='Enter your email address'
                                style={styles.inputBox}
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                onSubmitEditing={() => null}

                            />

                            <View style={{ alignItems: 'center', marginTop: -5 }}>
                                <Button
                                    title="send email"
                                    titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                    buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                    onPress={() => null}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <LottieView
                        ref={anim => { animation = anim; }}
                        style={{
                            width: 0.4 * Dimensions.get('window').width,
                            height: 0.4 * Dimensions.get('window').width,
                            backgroundColor: 'transparent',
                            alignSelf: 'center',
                            marginBottom: '60%'
                        }}
                        source={require('../assets/anim/8282-search-icon.json')}
                    />

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

export default Recover;