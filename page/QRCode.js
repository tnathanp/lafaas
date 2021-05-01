import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { Text } from '../component/Text';
import { default as QRGenerator } from 'react-native-qrcode-svg';
import * as Animatable from 'react-native-animatable';

const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

const QRCode = ({ route, navigation }) => {

    const { params } = route;
    const [error, showError] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        switch (params.operation) {
            case 'success':
                showError(false);
                navigation.navigate('End', { type: params.type });
                break;
            case 'inform':
                if (Object.keys(params).length === 3) {
                    showError(false);
                    setMessage([params.msg, params.msg2]);
                } else {
                    showError(false);
                    setMessage([params.msg, '']);
                }
                break;
            case 'cancelNavigate':
                showError(false);
                navigation.navigate('Confirm', { qrid: params.qrid })
                break;
            case 'cancelComplete':
                showError(false);
                navigation.navigate('List');
                break;
        }
    }, [route.params]);

    useDidUpdateEffect(() => {
        showError(true);
    }, [message]);

    function useDidUpdateEffect(method, dependency) {
        const didMountRef = useRef(false);

        useEffect(() => {
            if (didMountRef.current) {
                let mounted = true;
                if (mounted) method()
                return function cleanup() {
                    mounted = false;
                }
            } else didMountRef.current = true;
        }, dependency);
    }

    return (
        <View style={styles.container}>

            {error && <Animatable.View animation='fadeIn' duration={200} useNativeDriver={true} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1 }} />}

            <Modal
                visible={error}
                transparent={true}
                animationType='slide'
            >
                <View style={{ backgroundColor: 'transparent', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <View style={{ backgroundColor: 'white', width: '90%', height: '30%', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>


                        <Text style={{ textAlign: 'center', color: '#fc8181', fontWeight: 'bold', fontSize: 28, marginBottom: 10 }}>Alert</Text>
                        <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'normal', fontSize: 16, marginBottom: 30, paddingHorizontal: 10 }}>
                            {message[0] + '\n' + message[1]}
                        </Text>

                        <Button
                            title="Close"
                            titleStyle={{ fontFamily: 'NotoSansBold', padding: '35%' }}
                            buttonStyle={{ backgroundColor: '#fc8181', borderRadius: 10 }}
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