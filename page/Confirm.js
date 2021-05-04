import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';

const Confirm = ({ route, navigation }) => {

    const [qrid, setQRid] = useState("");

    useEffect(() => {
        if (route.params?.qrid) setQRid(route.params.qrid);
    }, [route.params])

    function cancel() {
        fetch('https://lafaas-n4hzx.ondigitalocean.app/cancelclaim?qr_id=' + qrid).then(res => res.text()).then(data => {
            navigation.navigate('List', { stamp: new Date().getTime() + 1000 });
        })
    };

    return (
        <View style={styles.container}>

            <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 48, marginTop: 20 }}>Not Yours?</Text>
            <Text style={{ color: '#777777', fontSize: 16, textAlign: 'center' }}>If you recognize the item is indeed {'\n'} not belong to you</Text>

            <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 20, marginTop: Dimensions.get('window').height * 0.35 }}>
                Please cancel the process {'\n'} before closing the module
            </Text>

            <Button
                title='Cancel'
                onPress={() => cancel()}
                titleStyle={{ padding: 50, fontSize: 14, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                buttonStyle={{ borderRadius: 10, marginRight: 10 }}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                    colors: ['#fc8181', '#f6a085'],
                    locations: [0.4, 1]
                }}
            />

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

export default Confirm;