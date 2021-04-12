import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Keyboard, Image } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../component/BackButton';

const Profile = ({ navigation }) => {

   


    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
           <View style = {{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
               <Text style={{fontSize:30, fontWeight:'bold'}}>
                   Profile Page Kha
               </Text>
               </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    stretch: {
        height: 200,
        resizeMode: 'cover',
    },
    inputBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        borderWidth: 1.5,
        borderColor: 'white',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.4,
        elevation: 5,
    },
    input: {
        fontFamily: 'NotoSans',
        fontSize: 15,
        padding: 10
    },
    inputError: {
        fontFamily: 'NotoSansBold',
        fontSize: 15,
        padding: 10,
        color: '#FC4E29'
    },
    label: {
        color: 'white',
        marginBottom: 3,
        fontSize: 16,
        fontFamily: 'NotoSansBold'
    }
});

export default Profile;