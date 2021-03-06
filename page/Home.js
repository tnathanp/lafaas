import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function RoundButton(props) {
    return (
        <Button
            title={props.title}
            titleStyle={{ fontFamily: 'NotoSansBold', color: '#fc8181', fontSize: 0.08 * deviceWidth }}
            buttonStyle={{ borderRadius: 1000, width: 0.4 * deviceWidth, height: 0.4 * deviceWidth, backgroundColor: 'white' }}
            containerStyle={{ padding: 10 }}
            onPress={props.navigator}
        />
    );
}

const Home = ({ navigation }) => {
    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 0.16 * deviceWidth, fontWeight: 'bold' }}>LaFaaS</Text>
            <Text style={{ fontSize: 0.045 * deviceWidth, fontWeight: 'normal', marginTop: -5 }}>Lost and Found as a Service</Text>
            <View style={{ flexDirection: 'row', marginTop: 0.15 * deviceHeight }}>
                <RoundButton title="Found" navigator={() => navigation.navigate('Register', { type: 'found' })} />
                <RoundButton title="Lost" navigator={() => navigation.navigate('Login')} />
            </View>
        </LinearGradient>
    );
}

export default Home;
