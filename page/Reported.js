import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../component/BackButton';

const Reported = ({ navigation }) => {

    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ top: 50, left: 20, zIndex: 1, marginBottom: 10 }}>
                    <BackButton navigation={navigation} />
                </View>
                <View style={{ flex: 1, paddingTop: 50 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                    <View style={{ padding: 20, left: 10,}} >
                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 50 }}>Thanks for reporting</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>we have recieved your inquiry</Text>
                    </View> 
                    <View style={{ padding: 50, paddingTop:20}} >
                        <Text style={{ fontSize: 14, marginTop: 10}}>
                            we will reach out to you as soon as possible or you may contact us as well!{"\n"}{"\n"}

                            here are ways to contact us:{"\n"}{"\n"}

                            <Text style={{fontWeight: "bold"}}>Tel</Text>: xxx-xxx-xxxx{"\n"}
                                xxx-xxx-xxxx{"\n"}{"\n"}

                            <Text style={{fontWeight: "bold"}}>Email</Text>: lafaas.admin@gmail.com
                        </Text>
                    </View>               
                </View>            
            </View>
        </LinearGradient>
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

export default Reported;