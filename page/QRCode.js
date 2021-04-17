import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { Text } from '../component/Text';
import { default as QRGenerator } from 'react-native-qrcode-svg';

const QRCode = ({ route, navigation }) => {
    const [error, showError] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (route.params?.msg) setMsg(route.params.msg);
    }, [route.params])

    useEffect(() => {
        if (msg !== '') showError(true);
    }, [msg])

    return (
        <View style={styles.container}>

            <Modal
                visible={error}
                transparent={true}
                animationType='fade'
            >
                <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', width: '90%', height: '50%', borderRadius: 20, alignItems: 'center' }}>

                        <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 28, marginVertical: 20 }}>{msg}</Text>

                        <Button
                            title="Close"
                            titleStyle={{ fontFamily: 'NotoSansBold', padding: '35%' }}
                            buttonStyle={{ marginBottom: '5%', backgroundColor: '#fc8181', borderRadius: 10 }}
                            onPress={() => showError(false)}
                        />

                    </View>
                </View>
            </Modal>

            {/*https://www.devglan.com/online-tools/aes-encryption-decryption*/}
            <QRGenerator size={0.6 * Dimensions.get('window').width} value='aeJshhikeV0l6BCOZH3qj1BJzElD3OQngAIMUqlrLOM=' />
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