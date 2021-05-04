import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Text } from '../component/Text';
import { Circle } from 'react-native-shape';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';

const Profile = ({ navigation }) => {

    const [name, setName] = useState('Loading');
    const [fullname, setFullname] = useState('Loading');
    const [itemsFound, setItemsFound] = useState([]);
    const [itemsLost, setItemsLost] = useState([]);

    SecureStore.getItemAsync('username').then(result => setName(result));

    useEffect(() => {
        Notifications.getExpoPushTokenAsync({ experienceId: '@tanathanp/LaFaaS' }).then(token => {
            fetch('https://lafaas-n4hzx.ondigitalocean.app/profile' + '?token=' + token.data.split(']')[0].substring(18)).then(res => res.json())
                .then(data => {
                    let arrFound = [];
                    let arrLost = [];

                    data.data.map(e => {
                        if (e.type == 'Found') arrFound.push(e);
                        else arrLost.push(e);
                    })

                    setFullname(data.name);
                    setItemsFound(arrFound);
                    setItemsLost(arrLost);
                });
        });
    }, [navigation]);

    function admin() {
        //if(admin)
        //navigate qr with {qrid: id}
    }

    return (
        <View style={{ flex: 1, paddingTop: 60, backgroundColor: 'white', }}>
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <View style={{ flex: 1, textAlign: 'center' }}>
                    <TouchableOpacity style={{ flex: 1, marginLeft: -65 }} onPress={() => navigation.openDrawer()}>
                        <Icon name="menu" color="black" size={20} />
                    </TouchableOpacity>
                </View>

                <View style={{ textAlign: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>PROFILE SETTING</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <></>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', paddingTop: 30, left: 50 }}>
                <View style={{ top: 25, marginRight: 50, alignItem: 'center', textAlign: 'center' }}>
                    <Circle color="#f6a085" scale={2} style={{ alignItems: 'center', justifyContent: 'center' }} />
                    <Text style={{ justifyContent: "center", alignSelf: 'center', fontSize: 40, color: '#ffffff', fontWeight: 'bold', position: 'absolute', top: -3 }}>
                        {name ? name[0].toUpperCase() : ''}
                    </Text>
                </View>

                <View>
                    <Text style={{ fontSize: 25, color: '#000000', fontWeight: 'bold' }}>{name}</Text>
                    <Text style={{ fontSize: 16, color: '#000000', }}>{fullname}</Text>
                </View>
            </View>

            <View style={{ flex: 1, padding: 30, bottom: '32%' }}>
                <Text style={styles.title}>Password Setting</Text>
                <Button
                    title='Change Password'
                    onPress={() => navigation.navigate('ChangePassword')}
                    titleStyle={{ padding: 50, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                    buttonStyle={{ borderRadius: 10, marginRight: 10, marginTop: 10, backgroundColor: '#f6a085', width: '100%' }}
                />
                <Button
                    title='Generate QR Code'
                    onPress={() => admin()}
                    titleStyle={{ padding: 50, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                    buttonStyle={{ borderRadius: 10, marginRight: 10, marginTop: 10, backgroundColor: '#f6a085', width: '100%' }}
                />
                <Text style={styles.title}>My Found Items</Text>

                <View style={{ borderWidth: 1, borderColor: '#f6a085', borderRadius: 10, marginTop: 10 }}>
                    {itemsFound.length !== 0 ?
                        itemsFound.map((l, i) => (
                            <View key={i} style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, textAlign: 'flex-start', marginLeft: 30 }}>
                                    <Text style={{ fontSize: 16, color: '#494949', marginTop: 15, marginBottom: 10, fontWeight: 'medium' }}>{l.item_name}</Text>
                                </View>

                                <View style={{ textAlign: 'flex-end', marginRight: 30 }}>
                                    <Text style={{ fontSize: 16, color: '#494949', marginTop: 15, marginBottom: 10 }}>{l.location_desc}</Text>
                                </View>
                            </View>
                        ))
                        :
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#f6a085', marginTop: 10, marginBottom: 10 }}>None</Text>
                        </View>
                    }
                </View>

                <Text style={styles.title}>My Lost Items</Text>

                <View style={{ borderWidth: 1, borderColor: '#f6a085', borderRadius: 10, marginTop: 10 }}>
                    {itemsLost.length !== 0 ?
                        itemsLost.map((l, i) => (
                            <View key={i} style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, textAlign: 'flex-start', marginLeft: 30 }}>
                                    <Text style={{ fontSize: 16, color: '#494949', marginTop: 15, marginBottom: 10, fontWeight: 'medium' }}>{l.item_name}</Text>
                                </View>

                                <View style={{ textAlign: 'flex-end', marginRight: 30 }}>
                                    <Text style={{ fontSize: 16, color: '#494949', marginTop: 15, marginBottom: 10 }}>{l.location_desc}</Text>
                                </View>
                            </View>
                        ))
                        :
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#f6a085', marginTop: 10, marginBottom: 10 }}>None</Text>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: '#494949',
        fontWeight: 'bold',
        marginTop: 30
    }
});


export default Profile;