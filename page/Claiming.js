import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Keyboard, Image } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import BackButton from '../component/BackButton';
import LoadingButton from '../component/LoadingButton';
import validator from 'validator';

const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

const Claiming = ({ route, navigation }) => {

    let idInput;
    const { item } = route.params;
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setLoad] = useState(false);
    const [formState, setFormState] = useState({
        phone: 0,
        id: 0
    });

    function handleChange(val, field) {
        let isPass;
        switch (field) {
            case 'phone':
                isPass = validator.isMobilePhone(val, 'th-TH');
                if (val === '') isPass = true;
                if (isPass) setPhone(val);
                break;
            case 'id':

                if (val.length === 13) {
                    if (validator.isNumeric(val)) {
                        let nums = 0;
                        for (let i = 13; i >= 2; i--) {
                            nums += Number.parseInt(val[13 - i]) * i;
                        }
                        const last_digit = (11 - nums % 11).toString();
                        if (last_digit.length === 1) {
                            isPass = val[12] == last_digit;
                        } else {
                            isPass = val[12] == last_digit[1];
                        }
                    } else {
                        isPass = false;
                    }
                } else {
                    isPass = true;
                }

                if (val === '') isPass = true;
                if (isPass) setId(val);
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

    function claim() {
        //Check if there are input errors
        if (formState.phone === 1) {
            showMessage({
                message: 'Error',
                description: 'Please enter a valid mobile phone number',
                type: 'danger',
                titleStyle: { fontFamily: 'NotoSansBold' },
                textStyle: { fontFamily: 'NotoSans' },
                duration: 2500
            });
            return;
        }

        if (formState.id === 1 || id.length < 13) {
            showMessage({
                message: 'Error',
                description: 'Please use a valid id card',
                type: 'danger',
                titleStyle: { fontFamily: 'NotoSansBold' },
                textStyle: { fontFamily: 'NotoSans' },
                duration: 2500
            });
            return;
        }

        //Check if it is empty
        if (phone == '' || id == '') return;

        setLoad(true);
        console.log(item)
    }

    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1 }}>
                    <View style={{ top: 50, left: 20, zIndex: 1, marginBottom: 10 }}>
                        <BackButton navigation={navigation} />
                    </View>
                    <KeyboardAvoidingView style={{ flex: 1, paddingTop: 50 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: -50 }} onStartShouldSetResponder={() => true}>
                                <View style={{ padding: 20, left: 20 }} >
                                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50 }}>Claim</Text>
                                    <Text style={{ fontSize: 16 }}>{item.item_name}</Text>
                                </View>

                                <View style={{ marginBottom: 10 }} >
                                    <Image
                                        source={{ uri: item.image_url }}
                                        resizeMode="cover"
                                        style={styles.stretch}
                                    />
                                </View>

                                <View style={{ padding: 20 }}>
                                    <Input
                                        onChangeText={value => handleChange(value, 'phone')}
                                        label='Phone no.'
                                        style={formState.phone == 0 ? styles.inputBox : styles.inputBoxError}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        rightIcon={() => {
                                            if (formState.phone) {
                                                return (
                                                    <View style={{ backgroundColor: 'white', padding: 5 }}>
                                                        <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                                    </View>
                                                )
                                            }
                                        }}
                                        rightIconContainerStyle={{ position: 'absolute', left: '85%' }}
                                        onSubmitEditing={() => idInput.focus()}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        maxLength={10}
                                        keyboardType={'phone-pad'}
                                    />
                                </View>

                                <View style={{ padding: 20, marginTop: -50 }}>
                                    <Input
                                        onChangeText={value => handleChange(value, 'id')}
                                        label='Identification card number'
                                        style={formState.id == 0 ? styles.inputBox : styles.inputBoxError}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        rightIcon={() => {
                                            if (formState.id) {
                                                return (
                                                    <View style={{ backgroundColor: 'white', padding: 5 }}>
                                                        <FontAwesome name="exclamation-triangle" size={18} color="red" />
                                                    </View>
                                                )
                                            }
                                        }}
                                        rightIconContainerStyle={{ position: 'absolute', left: '85%' }}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                        ref={instance => { idInput = instance; }}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        maxLength={13}
                                        keyboardType={'phone-pad'}
                                    />
                                </View>

                                <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                    <Button
                                        title={isLoading ? <LoadingButton /> : "submit"}
                                        titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                        buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                        disabled={isLoading}
                                        disabledStyle={{ backgroundColor: 'white' }}
                                        onPress={() => claim()}
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
    stretch: {
        height: 200,
        resizeMode: 'cover',
    },
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

export default Claiming;