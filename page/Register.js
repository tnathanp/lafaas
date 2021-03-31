import React, { useState, useEffect, useRef } from 'react';
import { Image, Button, Input } from 'react-native-elements';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, View } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet'
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../component/BackButton';

const Register = ({ route, navigation }) => {
    let controller, locationInput, colorInput, descInput;
    const { showActionSheetWithOptions } = useActionSheet();
    const [itemName, setItemName] = useState("");
    const [locationDesc, setLocationDesc] = useState("");
    const [coordinate, setCoordinate] = useState("");
    const [category, setCategory] = useState({});
    const [color, setColor] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");
    const [imageBox, setPositionOfImageBox] = useState(0);
    const scrollRef = useRef();

    //Set coordination after coming back from Map component
    useEffect(() => {
        if (route.params.coordinate != undefined) setCoordinate(route.params.coordinate);
    }, [route.params.coordinate]);

    const openActionSheet = () => {
        controller.close();

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

        // let formData = new FormData();
        // formData.append('item_name', itemName);
        // formData.append('color', 'green');
        // formData.append('image', { uri: localUri, name: localUri.split('/').pop(), type: 'image/jpeg' });

        // await fetch('http://192.168.1.33:7000/registeritem', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //     },
        // });

    }

    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ position: 'absolute', top: 50, left: 20 }}>
                        <BackButton navigation={navigation} />
                    </View>

                    <KeyboardAvoidingView style={{ flex: 1, marginTop: 70 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                            <View onStartShouldSetResponder={() => true}>
                                <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>{route.params.type === 'found' ? 'Found' : 'Lost'}</Text>

                                <Input
                                    onChangeText={value => setItemName(value)}
                                    label='Item'
                                    placeholder='What is it?'
                                    style={styles.inputBox}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                    onSubmitEditing={() => locationInput.focus()}
                                    onFocus={() => controller.close()}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                />

                                <Input
                                    onChangeText={value => setLocationDesc(value)}
                                    label='Location'
                                    placeholder={'Where did you ' + route.params.type + ' it?'}
                                    style={styles.inputBox}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                    onSubmitEditing={() => colorInput.focus()}
                                    onFocus={() => controller.close()}
                                    ref={instance => { locationInput = instance; }}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                />

                                <View style={{ alignSelf: 'stretch', padding: 10, marginTop: -30 }}>
                                    <Button
                                        title={coordinate === '' ? 'Choose Location' : coordinate.latitude.toFixed(5) + ', ' + coordinate.longitude.toFixed(5)}
                                        icon={<Entypo name="location-pin" size={24} color="#fc8181" />}
                                        titleStyle={{ fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                        buttonStyle={styles.stretchButton}
                                        onPress={() => {
                                            controller.close();
                                            navigation.navigate('Map', { type: route.params.type });
                                        }}
                                    />
                                </View>

                                <View style={{ alignSelf: 'stretch', padding: 10 }}>
                                    <Text style={styles.label}>Category</Text>
                                    <DropDownPicker
                                        controller={instance => controller = instance}
                                        items={[
                                            { label: 'North America', value: 'na', untouchable: true, textStyle: { fontFamily: 'NotoSansBold' } },
                                            { label: 'United States', value: 'us', parent: 'na', untouchable: true, textStyle: { fontFamily: 'NotoSansBold' } },
                                            { label: 'Alaska', value: 'alaska', parent: 'us' },
                                            { label: 'Canada', value: 'canada', parent: 'na' },
                                            { label: 'Mexico', value: 'mexico', parent: 'na' },

                                            { label: 'Europe', value: 'eu', untouchable: true, textStyle: { fontFamily: 'NotoSansBold' } },
                                            { label: 'UK', value: 'uk', parent: 'eu' },
                                            { label: 'Germany', value: 'germany', parent: 'eu' },
                                            { label: 'Russia', value: 'russia', parent: 'eu' }
                                        ]}
                                        scrollViewProps={{ showsVerticalScrollIndicator: false }}
                                        placeholder='Select category'
                                        style={{
                                            borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                            borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                                            shadowColor: 'black',
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.2,
                                            shadowRadius: 1.4,
                                            elevation: 5
                                        }}
                                        dropDownStyle={{ backgroundColor: '#f1f1f1' }}
                                        labelStyle={{ fontFamily: 'NotoSansMedium' }}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}
                                        containerStyle={{ height: 41, marginTop: 1 }}
                                        onChangeItem={item => setCategory(item)}
                                    />
                                </View>

                                <View style={{ marginTop: -5, marginBottom: -20, zIndex: -1 }}>
                                    <Input
                                        onChangeText={value => setColor(value)}
                                        label='Color'
                                        placeholder='Describe its color'
                                        style={styles.inputBox}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        onSubmitEditing={() => descInput.focus()}
                                        onFocus={() => controller.close()}
                                        ref={instance => colorInput = instance}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                    />
                                </View>

                                <View onLayout={e => setPositionOfImageBox(e.nativeEvent.layout.height + 20)} style={{ zIndex: -1 }}>
                                    <Input
                                        onChangeText={value => setDesc(value)}
                                        label='Description'
                                        placeholder='Describe anything about the item...'
                                        style={[styles.inputBox, { height: 120 }]}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        onSubmitEditing={() => null}
                                        onFocus={() => scrollRef.current.scrollTo({ x: 0, y: imageBox, animated: true })}
                                        ref={instance => { descInput = instance; }}
                                        onFocus={() => controller.close()}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        multiline={true}
                                    />
                                </View>

                                {route.params.type === 'found' &&
                                    <View style={{ alignSelf: 'stretch', marginTop: -10, height: 300, padding: 10 }}>
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
                                }

                                <View style={{ alignSelf: 'stretch', marginTop: route.params.type === 'found' ? 20 : -20, padding: 10 }}>
                                    <Button
                                        title='register'
                                        titleStyle={{ fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                        buttonStyle={styles.stretchButton}
                                        onPress={() => {
                                            controller.close();
                                            console.log(itemName + locationDesc + coordinate + category.value + color + desc + img);
                                        }}
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
    },
    stretchButton: {
        backgroundColor: 'white',
        borderRadius: 10
    }
});

export default Register;