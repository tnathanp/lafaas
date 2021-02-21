import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({ navigation }) => {
    //const [message, setMessage] = useState("");
    return (
        <LinearGradient
            colors={['#fc8181', '#f6a085']}
            locations={[0.7, 1]}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Button
                title="Lost"
                titleStyle={{ color: '#fc8181', fontSize: 30, fontWeight: 'bold' }}
                buttonStyle={{ borderRadius: 100, width: 150, height: 150, backgroundColor: 'white' }}
                onPress={() => navigation.navigate('Details')}
            />
        </LinearGradient>
    );
}

export default Home;