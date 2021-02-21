import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function RoundButton(props) {
    return (
        <Button
            title={props.title}
            titleStyle={{ color: '#fc8181', fontSize: 0.08 * deviceWidth, fontWeight: 'bold' }}
            buttonStyle={{ borderRadius: 1000, width: 0.4 * deviceWidth, height: 0.4 * deviceWidth, backgroundColor: 'white' }}
            containerStyle={{ padding: 10 }}
            onPress={props.navigateFn}
        />
    );
}

const Home = ({ navigation }) => {
    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 0.16 * deviceWidth, fontWeight: '700', color: 'white' }}>LaFaaS</Text>
            <Text style={{ fontSize: 0.045 * deviceWidth, fontWeight: 'normal', color: 'white', marginTop: -5 }}>Lost and Found as a Service</Text>
            <View style={{ flexDirection: 'row', marginTop: 0.15 * deviceHeight }}>
                <RoundButton title="Found" navigateFn={() => navigation.navigate('Details')} />
                <RoundButton title="Lost" navigateFn={() => navigation.navigate('Recover')} />
            </View>
        </LinearGradient>
    );
}

export default Home;