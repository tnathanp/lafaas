import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from '../component/Text';
import { default as QRGenerator } from 'react-native-qrcode-svg';

const QRCode = ({ navigation }) => {

    return (
        <View style={styles.container}>

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