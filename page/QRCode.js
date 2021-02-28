import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Dimensions } from 'react-native';
import {default as QRGenerator} from 'react-native-qrcode-svg';

const QRCode = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />

            {/*https://www.devglan.com/online-tools/aes-encryption-decryption*/}
            <QRGenerator size={0.6 * Dimensions.get('window').width} value='aeJshhikeV0l6BCOZH3qj1BJzElD3OQngAIMUqlrLOM=' />

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