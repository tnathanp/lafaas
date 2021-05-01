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
        fetch('https://lafaas-n4hzx.ondigitalocean.app/cancelclaim' + qrid).then(res => res.text()).then(data => {
            //Done
        })
    };

    return (
        <View style={styles.container}>

            <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 48, marginTop: 20 }}>หน้าcancel</Text>
            <Text style={{ color: '#777777', fontSize: 16 }}>Let's hope the owner finds their item soon</Text>

            <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 20, marginTop: Dimensions.get('window').height * 0.35 }}>
                You are the reason why the{'\n'}world is getting better!
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