import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import * as SecureStore from 'expo-secure-store';
import * as Animatable from 'react-native-animatable';

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

                    <Button
                        title='Back to main page'
                        onPress={() => {
                            if (type === 'found') {
                                SecureStore.getItemAsync('userToken').then(userToken => {
                                    if (userToken) navigation.navigate('List');
                                    else navigation.navigate('Home');
                                });
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
                </>
                :
                <>
                    <LottieView
                        style={{ backgroundColor: 'transparent', width: '50%', flex: 2, bottom: '5%' }}
                        source={require('../assets/anim/35593-complete.json')}
                        autoPlay
                        loop={false}
                    />

                    <Animatable.View animation='pulse' style={{ position: 'absolute', paddingTop: '450%' }}>
                        <Text style={{ color: '#fc8181', fontWeight: 'bold', fontSize: 28, marginTop: 20, textAlign: 'center' }}>Claiming Success</Text>
                        <Text style={{ color: '#777777', fontSize: 16, textAlign: 'center' }}>Thank you for using LaFaaS</Text>

                        <Button
                            title='Back to main page'
                            onPress={() => {
                                if (type === 'found') {
                                    SecureStore.getItemAsync('userToken').then(userToken => {
                                        if (userToken) navigation.navigate('List');
                                        else navigation.navigate('Home');
                                    });
                                } else {
                                    navigation.navigate('List');
                                }
                            }}
                            titleStyle={{ padding: 50, fontSize: 14, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                            buttonStyle={{ borderRadius: 10, marginTop: '60%' }}
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: ['#fc8181', '#f6a085'],
                                locations: [0.4, 1]
                            }}
                        />
                    </Animatable.View>
                </>
            }
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