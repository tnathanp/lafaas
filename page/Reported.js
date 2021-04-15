import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';

const Reported = ({ navigation }) => {
    let performBack = false;

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            if (!performBack) {
                e.preventDefault();
            } else {
                navigation.dispatch(e.data.action);
            }
        });
    }, [navigation]);

    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingTop: 50 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                    <View style={{ padding: 20, paddingLeft: 30 }} >
                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50 }}>Thanks for reporting</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Your inquiry is well received</Text>
                    </View>

                    <View style={{ paddingHorizontal: 40 }} >
                        <Text style={{ fontSize: 16, marginTop: 10 }}>
                            We will reach out to you as soon as possible or you may contact us as well!{'\n'}{'\n'}

                            Here are ways to contact us:{'\n'}{'\n'}

                            <Text style={{ fontWeight: 'bold' }}>Tel.</Text>: xxx-xxx-xxxx{'\n'}{'\n'}
                            <Text style={{ fontWeight: 'bold' }}>Email</Text>: lafaas.admin@gmail.com
                        </Text>
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginBottom: 50 }}>
                    <Button
                        title="Back to item list"
                        titleStyle={{ padding: 10, marginTop: -3, fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 14 }}
                        buttonStyle={{ width: 300, height: 32, borderRadius: 10, backgroundColor: 'white' }}
                        onPress={() => {
                            performBack = true;
                            navigation.navigate('List');
                        }}
                    />
                </View>
            </View>
        </LinearGradient>
    );
}

export default Reported;