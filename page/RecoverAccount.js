import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

const RecoverAccount = ({ navigation }) => {
    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ position: 'absolute', top: 50, left: 30 }}>
                <Button
                    title="Back"
                    icon={<Entypo name="chevron-left" size={16} style={{ marginTop: -3, marginRight: -8 }} color='#fc8181' />}
                    titleStyle={{  fontSize: 13, fontFamily: 'NotoSans', padding: 10, marginTop: -5, color: '#fc8181' }}
                    buttonStyle={{ width: 70, height: 26, borderRadius: 20, backgroundColor: 'white' }}
                    onPress={() => navigation.goBack()}
                />
            </View>
        </LinearGradient>
    );
}

export default RecoverAccount;