import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrCode = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />

            {/*https://www.devglan.com/online-tools/aes-encryption-decryption*/}
            <QRCode size={0.6 * Dimensions.get('window').width} value='aeJshhikeV0l6BCOZH3qj1BJzElD3OQngAIMUqlrLOM=' />

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



export default QrCode;