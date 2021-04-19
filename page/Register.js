import React, { useState, useEffect, useRef } from 'react';
import { Image, Button, Input } from 'react-native-elements';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Keyboard, View, Modal } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { showMessage } from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../component/BackButton';
import ImageColors from 'react-native-image-colors';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
//import { TriangleColorPicker } from 'react-native-color-picker';

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
    const [loading, setLoad] = useState(false);
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
            allowsEditing: false,
            quality: 0
        });


        await getColor(result.uri);
        setImg(result.uri);
    }

    const cameraLauncher = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        await ImagePicker.requestCameraPermissionsAsync();

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            quality: 0
        });

        if (result.cancelled) {
            return;
        }

        let localUri = result.uri;
        await getColor(localUri);
        setImg(localUri);

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

    function getListOfCategory() {
        let arr = [];

        arr.push({ label: 'Gadgets', value: 'Gadgets', untouchable: true, textStyle: { fontFamily: 'NotoSansBold' } });

        ['Phone', 'Tablet', 'Apple pencil', 'Mouse', 'Laptop', 'Camera', 'Portable game', 'Airpods', 'Earphones', 'Headphones', 'Phone/Tablet charger', 'Laptop charger', 'Smart Watch', 'Power Bank'].map(e => arr.push({ label: e, value: e, parent: 'Gadgets' }));

        arr.push({ label: 'Apparels', value: 'Apparels', untouchable: true, textStyle: { fontFamily: 'NotoSansBold' } });

        ['Jacket', 'Hat'].map(e => arr.push({ label: e, value: e, parent: 'Apparels' }));

        arr.push({ label: 'Shoes', value: 'Shoes', parent: 'Apparels', untouchable: true, textStyle: { fontFamily: 'NotoSansBold' } });

        ['Sandals', 'Sneakers', 'Loafers'].map(e => arr.push({ label: e, value: e, parent: 'Shoes' }));

        ['Socks', 'Shirt', 'Skirts', 'Pants'].map(e => arr.push({ label: e, value: e, parent: 'Apparels' }));

        arr.push({ label: 'Stationary', value: 'Stationary', untouchable: true, textStyle: { fontFamily: 'NotoSansBold' } });

        ['Pencil case', 'Pencil', 'Ruler', 'Eraser', 'Pen', 'Apple pencil'].map(e => arr.push({ label: e, value: e, parent: 'Stationary' }));

        arr.push({ label: 'Documents', value: 'Documents', untouchable: true, textStyle: { fontFamily: 'NotoSansBold' } });

        ['Textbook', 'Lecture sheets', 'Notebook', 'File'].map(e => arr.push({ label: e, value: e, parent: 'Documents' }));

        arr.push({ label: 'Accessories', value: 'Accessories', untouchable: true, textStyle: { fontFamily: 'NotoSansBold' } });

        ['Necklace', 'Earrings', 'Rings', 'Bracelet', 'Anklet', 'Hairband/ Headband', 'Scrunchie/ Hair ties', 'Bag', 'Wallet', 'Purse', 'Glasses', 'Watch'].map(e => arr.push({ label: e, value: e, parent: 'Accessories' }));

        arr.push({ label: 'Cards', value: 'Cards', untouchable: true, textStyle: { fontFamily: 'NotoSansBold' } });

        ['Debit/ Credit card', 'ID card', 'Student ID card', 'Driver’s license', 'Membership card', 'Point card'].map(e => arr.push({ label: e, value: e, parent: 'Cards' }));

        arr.push({ label: 'Other', value: 'Other' });

        return arr;
    }

    function register() {
        //check if empty

        if (route.params.type === 'found') {
            if (itemName == '' || locationDesc == '' || coordinate == ''
                || category == {}) {

                showMessage({
                    message: 'Error',
                    description: 'Please fill all the required fields',
                    type: 'danger',
                    titleStyle: { fontFamily: 'NotoSansBold' },
                    textStyle: { fontFamily: 'NotoSans' },
                    duration: 2500
                });

                return;
            }

            if (img == '') {
                showMessage({
                    message: 'Error',
                    description: 'Please upload an image',
                    type: 'danger',
                    titleStyle: { fontFamily: 'NotoSansBold' },
                    textStyle: { fontFamily: 'NotoSans' },
                    duration: 2500
                });
                return;
            }
        } else {
            if (itemName == '' || locationDesc == '' || coordinate == ''
                || category == {} || color.length === 0) {

                showMessage({
                    message: 'Error',
                    description: 'Please fill all the required fields',
                    type: 'danger',
                    titleStyle: { fontFamily: 'NotoSansBold' },
                    textStyle: { fontFamily: 'NotoSans' },
                    duration: 2500
                });

                return;
            }
        }

        //prepare data to send

        let formData = new FormData();
        formData.append('item_name', itemName);
        formData.append('location_desc', locationDesc);
        formData.append('location_lat', coordinate.latitude);
        formData.append('location_long', coordinate.longitude);
        formData.append('category', category.value);
        formData.append('description', desc);
        formData.append('type', route.params.type);
        formData.append('device_token', 'test');
        formData.append('color', color.map(e => e.substring(1)).toString());

        if (route.params.type === 'found') {
            formData.append('image', { uri: img, name: img.split('/').pop(), type: 'image/jpeg' });

            setLoad(true);

            fetch('https://lafaas-n4hzx.ondigitalocean.app/registeritem', {
                method: 'POST',
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                }
            }).then(res => res.text()).then(id => {
                wait(2000).then(() => {
                    //Handle qrid for case found
                    setLoad(false);

                    navigation.navigate('QRCode', { qrid: id });
                })
            });

        } else {
            setLoad(true);

            fetch('https://lafaas-n4hzx.ondigitalocean.app/registeritem', {
                method: 'POST',
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                }
            }).then(res => res.json()).then(data => {
                wait(2000).then(() => {
                    //Handle result for case lost
                    setLoad(false);

                    if (data.code === 1) {
                        navigation.navigate('Noti', { item: data.item[0] });
                    } else if (data.code === 2) {
                        navigation.navigate('List');
                    }

                })
            });
        }

    }

    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            {loading && <Animatable.View animation='fadeIn' duration={200} useNativeDriver={true} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1 }} />}

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ position: 'absolute', top: 50, left: 20 }}>
                        <BackButton navigation={navigation} />
                    </View>

                    <Modal
                        visible={loading}
                        transparent={true}
                        animationType='slide'
                    >
                        <View style={{ backgroundColor: 'transparent', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                            <View style={{ backgroundColor: 'white', width: '90%', height: '50%', borderRadius: 20, alignItems: 'center' }}>
                                < LottieView
                                    style={{ backgroundColor: 'transparent' }}
                                    source={require('../assets/anim/46779-locker.json')}
                                    autoPlay
                                />
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
                                        items={getListOfCategory()}
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
                                                { label: 'Red', value: '#ff0000', textStyle: { color: '#ff0000' } },
                                                { label: 'Green', value: '#00ff00', textStyle: { color: '#00ff00' } },
                                                { label: 'Blue', value: '#0000ff', textStyle: { color: '#0000ff' } }
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
                                            register();
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