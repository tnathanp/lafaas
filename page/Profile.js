import React from 'react';
import { View } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = ({ navigation }) => {
    return (
        <LinearGradient colors={['#fc8181', '#f6a085']} locations={[0.7, 1]} style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                    Profile Page Kha
               </Text>
            </View>
        </LinearGradient>
    );
}

export default Profile;