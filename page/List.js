import React, { useState, useEffect, useRef } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from '../component/Text';
import Item from '../component/Item';
import LottieView from 'lottie-react-native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const List = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [load, setLoad] = useState(true);
    const [data, setData] = useState();

    useEffect(() => fetchData(), []);

    function fetchData() {
        //fetch from backend then save to variable
        const sample = {
            registered:
            {
                1:
                {
                    name: "canvas",
                    item_id: 111,
                    location: "pacific ocean",
                    color: "blue",
                    description: "sda;jfas;dlff",
                    image: 'https://i.ibb.co/hBZgNT9/Taojeaw.jpg'

                },
                2:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://i.ibb.co/B3nwdh3/Brian.jpg'

                },
                3:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://i.ibb.co/BGv7Qfw/Blue.jpg'

                },
                4:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://i.ibb.co/0cZ8BVR/Spark.jpg'

                },
                5:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaosadaFDF;LSDFJLncn,mzcnmzcxzcxn,.zc,.ckl;asljkasfdljkfadl;ads;ladsjkcnm.,cxv,mnldaksJLJKADSLJKDSHLJKCVXBN,MCXJajklsljSDALKJ;FDSLJSDFpf",
                    image: 'https://i.ibb.co/94C5C9N/Megara.jpg'

                }
            },
            claimed: {
                1:
                {
                    name: "canvas kha",
                    item_id: 333,
                    location: "pacific ocean",
                    color: "blue",
                    description: ";aldfalskfd",
                    image: 'https://i.ibb.co/N9hPGZZ/Katsu.jpg'

                }
            }
        }

        let arr = [];
        for (let index in sample.registered) {
            arr.push(sample.registered[index]);
        }

        let mounted = true;

        wait(3000).then(() => {
            if (mounted) setData(arr)
        })

        return function cleanup() {
            mounted = false;
        }

    }

    function useDidUpdateEffect(fn, inputs) {
        const didMountRef = useRef(false);

        useEffect(() => {
            if (didMountRef.current)
                fn();
            else
                didMountRef.current = true;
        }, inputs);
    }

    useDidUpdateEffect(() => {
        let mounted = true;

        if (mounted) setLoad(false)

        return function cleanup() {
            mounted = false;
        }
    }, [data]);


    return (
        <View style={{ flex: 1, paddingTop: 30 }}>

            <StatusBar style='dark' />

            <SearchBar
                placeholder="search"
                onChangeText={value => setSearch(value)}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={search}
            />

            {load &&
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <LottieView
                        style={styles.anim}
                        source={require('../assets/anim/890-loading-animation.json')}
                        autoPlay
                    />
                    <Text style={{ color: 'black' }}>Suppose loading is done in 3 secs</Text>
                </View>
            }

            {!load &&
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Item data={data} navigator={item => navigation.navigate('ItemDesc', { item: item })} />
                </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        padding: 24
    },
    inputContainer: {
        fontFamily: 'NotoSans',
        backgroundColor: '#e7e7e7',
        fontSize: 16,
        borderRadius: 20,
    },
    input: {
        color: '#868686',
        marginBottom: 3,
        fontSize: 16,
        fontFamily: 'NotoSans'
    },
    anim: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: 0.5 * Dimensions.get('window').width,
        height: 0.5 * Dimensions.get('window').width,
        marginTop: -1 * 0.02 * Dimensions.get('window').height
    }
});

export default List;
