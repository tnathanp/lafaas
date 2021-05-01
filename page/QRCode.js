import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { Text } from '../component/Text';
import { default as QRGenerator } from 'react-native-qrcode-svg';
import * as Animatable from 'react-native-animatable';

const QRCode = ({ route, navigation }) => {
    const [error, showError] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            e.preventDefault();
        });
    }, [navigation]);

    useEffect(() => {
        if (route.params?.msg) setMsg(route.params.msg);
    }, [route.params])

    useEffect(() => {
        if (msg !== '') showError(true);
    }, [msg])

    return (
        <View style={styles.container}>

            {error && <Animatable.View animation='fadeIn' duration={200} useNativeDriver={true} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1 }} />}

            <Modal
                visible={error}
                transparent={true}
                animationType='slide'
            >
                <View style={{ backgroundColor: 'transparent', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <View style={{ backgroundColor: 'white', width: '90%', height: '30%', borderRadius: 20, alignItems: 'center' }}>

                        <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 28, marginVertical: 50 }}>{msg}</Text>

                        <Button
                            title="Close"
                            titleStyle={{ fontFamily: 'NotoSansBold', padding: '35%' }}
                            buttonStyle={{ marginBottom: '30%', backgroundColor: '#fc8181', borderRadius: 10 }}
                            onPress={() => showError(false)}
                        />

                    </View>
                </View>
            </Modal>

            <QRGenerator size={0.6 * Dimensions.get('window').width} value={route.params?.qrid ?? 'none'} />
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Scan this QR Code at the pickup module</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '100%'
    }
})

export default QRCode;