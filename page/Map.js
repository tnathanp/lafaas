import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import LottieView from 'lottie-react-native';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import * as Location from 'expo-location';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const ASPECT_RATIO = deviceWidth / deviceHeight;

const Map = ({ navigation }) => {

    const [location, setLocation] = useState();

    useEffect(() => {
        Location.requestPermissionsAsync();
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    title="Back"
                    icon={<Entypo name="chevron-left" size={20} style={{ marginTop: -3, marginRight: -8 }} color='#fc8181' />}
                    titleStyle={{ fontSize: 16, fontFamily: 'NotoSans', padding: 10, marginTop: -5, color: '#fc8181' }}
                    buttonStyle={{ width: 70, height: 30, marginLeft: 5, borderRadius: 20, backgroundColor: 'transparent' }}
                    onPress={() => navigation.goBack()}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>

            <MapView
                style={styles.map}
                provider='google'
                initialRegion={{ latitude: 13.739, longitude: 100.5303, latitudeDelta: 13.523 - 13.5, longitudeDelta: (13.523 - 13.5) * ASPECT_RATIO }}
                onRegionChangeComplete={loc => setLocation(loc)}
                showsUserLocation
                showsMyLocationButton
            />

            <LottieView
                style={styles.marker}
                source={require('../assets/anim/695-bouncy-mapmaker.json')}
                autoPlay
            />

            <Button
                title="Confirm Location"
                style={{ marginTop: '5%' }}
                titleStyle={{ fontFamily: 'NotoSansBold', padding: '25%' }}
                buttonStyle={{ backgroundColor: '#fc8181', borderRadius: 10, height: 0.06 * deviceHeight }}
                onPress={() => console.log(location)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: deviceWidth,
        height: deviceHeight
    },
    map: {
        width: deviceWidth,
        height: 0.825 * deviceHeight,
        marginTop: -1 * 0.0875 * deviceHeight
    },
    marker: {
        position: 'absolute',
        width: 64,
        height: 64,
        marginTop: -44,
        backgroundColor: 'transparent'
    }
})

export default Map;