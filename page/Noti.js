import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';

const Noti = ({ route, navigation }) => {
    const { item } = route.params;
    item.item_name = item.name;
    delete item.name;

    return (
        <View style={{ height: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ marginBottom: 30, alignItems: 'center' }} >
                <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Found Possible Item!</Text>
                <Text style={{ fontSize: 16, color: 'black' }}>Did you lose a <Text style={{ fontWeight: "bold", color: 'black' }}>{item.item_name}</Text> ?</Text>
            </View>

            <View style={{ marginBottom: 10, alignItems: 'center' }} >
                <Image
                    source={{ uri: item.image_url }}
                    resizeMode="cover"
                    style={styles.stretch}
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', margin: 24 }}>Is this yours?</Text>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ marginRight: 10 }}>
                        <Button
                            title='YES'
                            onPress={() => navigation.navigate('Claiming', { item: item })}
                            titleStyle={{ padding: 10, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                            buttonStyle={{ borderRadius: 16 }}
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: ['#fc8181', '#f6a085'],
                                locations: [0.3, 1]
                            }}
                        />
                    </View>
                    <View>
                        <Button
                            title='NO'
                            onPress={() => navigation.navigate('List')}
                            titleStyle={{ padding: 10, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                            buttonStyle={{ borderRadius: 16, }}
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: ['#fc8181', '#f6a085'],
                                locations: [0.3, 1]
                            }}
                        />
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    stretch: {
        height: 320,
        width: 320,
        borderRadius: 10,
        resizeMode: 'cover',
    }
});

export default Noti;