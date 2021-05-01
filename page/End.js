import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';

const End = ({ route, navigation }) => {

    const [type, setType] = useState("");

    useEffect(() => {
        if (route.params?.type) setType(route.params.type);
    }, [route.params])

    return (
        <View style={styles.container}>

            {type === 'found' ?
                <>
                    <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 48, marginTop: 20 }}>Thank You!</Text>
                    <Text style={{ color: '#777777', fontSize: 16 }}>Let's hope the owner finds their item soon</Text>

                    <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 20, marginTop: Dimensions.get('window').height * 0.35 }}>
                        You are the reason why the{'\n'}world is getting better!
                    </Text>
                </>
                :
                <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 48, marginTop: 20 }}>Thank You For Using LaFaaS!</Text>
            }

            <Button
                title='Back to main page'
                onPress={() => {
                    if (type === 'found') {
                        navigation.navigate('Home');
                    } else {
                        navigation.navigate('List');
                    }
                }}
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

export default End;