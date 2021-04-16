import React, { useState, useEffect, useRef } from 'react';
import { Image, Button, Input } from 'react-native-elements';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Keyboard, View, Modal } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet'
import * as ImagePicker from 'expo-image-picker';
import LottieView from 'lottie-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../component/BackButton';
import ImageColors from 'react-native-image-colors';
//import { TriangleColorPicker } from 'react-native-color-picker';
//import { BlurView } from 'expo-blur';

const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

const Register = ({ route, navigation }) => {
    let categoryController, colorController, locationInput, descInput;
    const { showActionSheetWithOptions } = useActionSheet();
    const [itemName, setItemName] = useState("");
    const [locationDesc, setLocationDesc] = useState("");
    const [coordinate, setCoordinate] = useState("");
    const [category, setCategory] = useState({});
    const [color, setColor] = useState([]);
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");
    const [imageBox, setPositionOfImageBox] = useState(0);
    const [pickupModal, showPickup] = useState(false);
    const [isLoading, setLoad] = useState(false);
    const scrollRef = useRef();

    //Set coordination after coming back from Map component
    useEffect(() => {
        if (route.params.coordinate != undefined) setCoordinate(route.params.coordinate);
    }, [route.params.coordinate]);

    const openActionSheet = () => {
        categoryController.close();
        if (route.params.type === 'lost') colorController.close();

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
            allowsEditing: false
        });


        await getColor(result.uri);
        setImg(result.uri);
    }

    const cameraLauncher = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        await ImagePicker.requestCameraPermissionsAsync();

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false
        });

        if (result.cancelled) {
            return;
        }

        let localUri = result.uri;
        await getColor(localUri);
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

    const getColor = async (uri) => {
        const colors = await ImageColors.getColors(uri, { quality: 'high' });
        let result = [];

        for (let key in colors) {
            if (key !== 'platform') {
                if (colors[key] !== '#FFFFFF')
                    if (!result.includes(colors[key]))
                        result.push(colors[key]);
            }
        }

        setColor(result);
    }

    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ position: 'absolute', top: 50, left: 20 }}>
                        <BackButton navigation={navigation} />
                    </View>

                    <Modal
                        visible={pickupModal}
                        transparent={true}
                        animationType='slide'
                    >
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ backgroundColor: 'white', width: '90%', height: '50%', borderRadius: 20, alignItems: 'center' }}>
                                {isLoading &&
                                    < LottieView
                                        style={{ backgroundColor: 'transparent' }}
                                        source={require('../assets/anim/46779-locker.json')}
                                        autoPlay
                                    />
                                }
                                {!isLoading &&
                                    <>
                                        <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 28, marginVertical: 20 }}>Choose Pickup Station</Text>

                                        <ScrollView style={{ width: '100%' }}>
                                            {['test1', 'test2', 'test3', 'test4'].map(e => (
                                                <TouchableOpacity key={e} style={{ paddingVertical: 10 }} onPress={() => setLoad(true)}>
                                                    <View style={{ flexDirection: 'row', paddingHorizontal: 50 }}>
                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                            <Entypo name="location-pin" size={24} color="#fc8181" style={{ marginTop: 2, marginRight: 5 }} />
                                                            <Text style={{ color: 'black', fontWeight: 'medium', fontSize: 20 }}>{e}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <Text style={{ color: '#f6a085', fontWeight: 'medium', fontSize: 20 }}>Vacant</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>

                                        <Button
                                            title="Cancel"
                                            titleStyle={{ fontFamily: 'NotoSansBold', padding: '35%' }}
                                            buttonStyle={{ marginBottom: '5%', backgroundColor: '#fc8181', borderRadius: 10 }}
                                            onPress={() => showPickup(false)}
                                        />
                                    </>
                                }
                            </View>

                        </View>
                    </Modal>

                    <KeyboardAvoidingView style={{ flex: 1, marginTop: 70 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                        <ScrollView ref={scrollRef} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
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
                                    onFocus={() => {
                                        categoryController.close();
                                        if (route.params.type === 'lost') colorController.close();
                                    }}
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
                                    onSubmitEditing={() => descInput.focus()}
                                    onFocus={() => {
                                        categoryController.close();
                                        if (route.params.type === 'lost') colorController.close();
                                    }}
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
                                            categoryController.close();
                                            if (route.params.type === 'lost') colorController.close();
                                            navigation.navigate('Map', { type: route.params.type });
                                        }}
                                    />
                                </View>

                                <View style={Platform.OS === 'ios' ?
                                    { alignSelf: 'stretch', padding: 10, zIndex: 2 } :
                                    { alignSelf: 'stretch', padding: 10 }}
                                >
                                    <Text style={styles.label}>Category</Text>
                                    <DropDownPicker
                                        controller={instance => categoryController = instance}
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
                                            height: 42
                                        }}
                                        dropDownStyle={{ backgroundColor: '#f1f1f1' }}
                                        labelStyle={{ fontFamily: 'NotoSansMedium' }}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}
                                        onChangeItem={item => setCategory(item)}
                                        onOpen={() => {
                                            if (route.params.type === 'lost') colorController.close();
                                        }}
                                    />
                                </View>

                                {route.params.type === 'lost' &&
                                    <View style={Platform.OS === 'ios' ?
                                        { alignSelf: 'stretch', padding: 10, zIndex: 1 } :
                                        { alignSelf: 'stretch', padding: 10 }}
                                    >
                                        <Text style={styles.label}>Color</Text>
                                        <DropDownPicker
                                            controller={instance => colorController = instance}
                                            multiple={true} max={2}
                                            defaultValue={0}
                                            items={[
                                                { label: 'Alaska', value: 'alaska' },
                                                { label: 'Canada', value: 'canada' },
                                                { label: 'Mexico', value: 'mexico' },
                                                { label: 'UK', value: 'uk' },
                                                { label: 'Germany', value: 'germany' },
                                                { label: 'Russia', value: 'russia' }
                                            ]}
                                            scrollViewProps={{ showsVerticalScrollIndicator: false }}
                                            placeholder='Select color'
                                            style={{
                                                borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                                borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                                                height: 42
                                            }}
                                            dropDownStyle={{ backgroundColor: '#f1f1f1' }}
                                            labelStyle={{ fontFamily: 'NotoSansMedium' }}
                                            itemStyle={{
                                                justifyContent: 'flex-start'
                                            }}
                                            onChangeItem={color => setColor(color)}
                                            onOpen={() => {
                                                categoryController.close();
                                            }}
                                        />
                                    </View>
                                }

                                <View onLayout={e => setPositionOfImageBox(e.nativeEvent.layout.height + 20)} style={{ marginTop: 15, zIndex: -1 }}>
                                    <Input
                                        onChangeText={value => setDesc(value)}
                                        label='Description'
                                        placeholder='Describe anything about the item...'
                                        style={[styles.inputBox, { height: 120 }]}
                                        labelStyle={styles.label}
                                        inputStyle={styles.input}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        onSubmitEditing={() => null}
                                        onFocus={() => {
                                            categoryController.close();
                                            if (route.params.type === 'lost') colorController.close();
                                            scrollRef.current.scrollTo({ x: 0, y: imageBox, animated: true });
                                        }}
                                        ref={instance => { descInput = instance; }}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        multiline={true}
                                    />
                                </View>

                                {/* <Modal animationType='fade' transparent={true} visible={true} >
                                    <BlurView intensity={100} style={[StyleSheet.absoluteFill, { zIndex: 1 }]}>
                                        <TriangleColorPicker
                                            onColorChange={color => console.log(color)}
                                            style={{ height: '100%' }}
                                            hideControls={true}
                                        />
                                    </BlurView>
                                </Modal> */}

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

                                        <View style={{ marginTop: 10 }}>
                                            <Text style={styles.label}>Color Palette</Text>
                                            <View style={{ borderRadius: 10, backgroundColor: 'white', width: '100%', height: 70, alignItems: 'center', justifyContent: 'center' }}>
                                                <ScrollView style={{ padding: 15 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                                    {
                                                        color.map((e, index) => {
                                                            return (
                                                                <Button
                                                                    key={index}
                                                                    containerStyle={{ paddingRight: 15 }}
                                                                    buttonStyle={[styles.colorButton, { backgroundColor: e }]}
                                                                    onPress={() => null}
                                                                />
                                                            )
                                                        })
                                                    }
                                                    {
                                                        color.length === 0 &&
                                                        <Text style={{ color: '#86939e', alignSelf: 'center' }}>
                                                            Upload an image of the item first
                                                        </Text>
                                                    }
                                                </ScrollView>
                                            </View>
                                        </View>
                                    </View>
                                }

                                <View style={{ alignSelf: 'stretch', marginTop: route.params.type === 'found' ? 130 : -20, padding: 10 }}>
                                    <Button
                                        title='register'
                                        titleStyle={{ fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                                        buttonStyle={styles.stretchButton}
                                        onPress={() => {
                                            categoryController.close();
                                            if (route.params.type === 'lost') colorController.close();
                                            showPickup(true);
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
    },
    colorButton: {
        height: 40,
        width: 40,
        borderWidth: 5,
        borderColor: '#dddddd'
    }
});

export default Register;