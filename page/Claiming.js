import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Keyboard, Image } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../component/BackButton';

const Claiming = ({ route, navigation }) => {
    let phoneInput, idInput;
    const { item } = route.params;
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");

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
                                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                                </View>

                                <View style={{ marginBottom: 10 }} >
                                    <Image
                                        source={{ uri: item.image }}
                                        resizeMode="cover"
                                        style={styles.stretch}
                                    />
                                </View>

                                <View style={{ padding: 20 }}>
                                    <Input
                                        onChangeText={value => setPhone(value)}
                                        label='Phone no.'
                                        style={styles.inputBox}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        onSubmitEditing={() => idInput.focus()}
                                        ref={instance => { phoneInput = instance; }}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                    />
                                </View>

                                <View style={{ padding: 20, marginTop: -50 }}>
                                    <Input
                                        onChangeText={value => setId(value)}
                                        label='Identification card number'
                                        style={styles.inputBox}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                        ref={instance => { idInput = instance; }}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                    />
                                </View>

                                <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                    <Button
                                        title="submit"
                                        titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                        buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                        onPress={() => console.log(item)}
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
        borderColor: 'white',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.4,
        elevation: 5,
    },
    input: {
        fontFamily: 'NotoSans',
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

export default Claiming;