import React, { useState } from 'react';
import { Image, Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Keyboard } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet'
import { showMessage } from 'react-native-flash-message';
import * as ImagePicker from 'expo-image-picker';
import BackButton from '../component/BackButton';
import LoadingButton from '../component/LoadingButton';

const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

const Reporting = ({ route, navigation }) => {

    const { item } = route.params;
    const { showActionSheetWithOptions } = useActionSheet();
    const [detail, setDetail] = useState("");
    const [img, setImg] = useState("");
    const [isLoading, setLoad] = useState(false);

    const openActionSheet = () => {
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
            mediaTypes: ImagePicker.MediaTypeOptions.Images
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

    function report() {
        if (detail == '') {
            showMessage({
                message: 'Error',
                description: 'Please provide us some detail',
                type: 'danger',
                titleStyle: { fontFamily: 'NotoSansBold' },
                textStyle: { fontFamily: 'NotoSans' },
                duration: 2500
            });
            return;
        }

        setLoad(true);

        wait(200).then(() => {
            navigation.navigate('Reported');
            setLoad(false);
        })
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
                                <View style={{ padding: 20, paddingLeft: 40 }} >
                                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50 }}>Report Item</Text>
                                    <Text style={{ fontSize: 16 }}>If you are sure that this belongs to you,{'\n'}</Text>
                                    <Text style={{ fontSize: 16 }}>
                                        Give details about
                                        <Text style={{ fontWeight: 'bold' }}> {item.item_name} </Text>
                                        and we will contact you as soon as possible.
                                     </Text>
                                </View>

                                <Image
                                    source={{ uri: item.image }}
                                    resizeMode="cover"
                                    style={styles.stretch}
                                />

                                <View style={{ padding: 20, paddingBottom: 0 }}>
                                    <Input
                                        onChangeText={value => setDetail(value)}
                                        label='Detail'
                                        style={styles.inputBox}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                    />
                                </View>

                                <View style={{ height: 200, padding: 30, marginTop: -40 }}>
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

                                <View style={{ alignItems: 'center', marginBottom: 30, marginTop: 15 }}>
                                    <Button
                                        title={isLoading ? <LoadingButton /> : "report"}
                                        titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                        buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                                        disabled={isLoading}
                                        disabledStyle={{ backgroundColor: 'white' }}
                                        onPress={() => report()}
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

export default Reporting;