import React, { useState } from 'react';
import { Image, Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Keyboard } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet'

import BackButton from '../component/BackButton'; 

const Reporting = ({ navigation }) => {
    let controller, detailInput;
    const { showActionSheetWithOptions } = useActionSheet();
    const [detail, setDetail] = useState("");
    const [img, setImg] = useState("");

    const openActionSheet = () => {
        // controller.close();
        let options = ['Take Photo', 'Photo Library', 'Remove', 'Cancel'];
        if (img === '') options = options.filter(e => e !== 'Remove');
        const cancelButtonIndex = img === '' ? 2 : 3;
        const destructiveButtonIndex = img === '' ? null : 2;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    cameraLauncher();
                } else if (buttonIndex === 1) {
                    imageSelector();
                } else if (buttonIndex === 2 && img !== '') {
                    setImg('');
                }
            }
        );
    };
    const imageSelector = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        setImg(result.uri);
    }
    const cameraLauncher = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        await ImagePicker.requestCameraPermissionsAsync();

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true
        });

        if (result.cancelled) {
            return;
        }

        let localUri = result.uri;
        setImg(localUri);
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
                                <View style={{ padding: 10, left: 10 }} >
                                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50 }}>Report Item</Text>
                                </View>

                                <View style={{ padding: 10}}>
                                    <Input
                                        onChangeText={value => setDetail(value)}
                                        label='Evidence Detail'
                                        style={styles.inputBox}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        onSubmitEditing={() => detailInput.focus()}
                                        ref={instance => { detailInput = instance; }}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        multiline={true}
                                    />
                                </View>
                                <View style={{  height: 300, padding: 20, marginTop:-30}}>
                                    <Text style={styles.label}>Picture</Text>
                                    <Image
                                        style={{ height: '100%', borderRadius: 10, backgroundColor: img === '' ? '#fafafa' : 'transparent' }}
                                        source={img === '' ? null : { uri: img }}
                                        onPress={openActionSheet}
                                    >
                                        {
                                            img === '' &&
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <MaterialIcons name="add-photo-alternate" size={48} color="black" />
                                            </View>
                                        }
                                    </Image>
                                </View>                                
                                <View style={{ alignItems: 'center', marginBottom: 15, marginTop: 50 }}>
                                    <Button
                                        title="report"
                                        titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                        buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                        onPress={() => navigation.navigate('Reported')}
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
        height: 120,
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

export default Reporting;