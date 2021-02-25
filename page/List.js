import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Text } from '../component/Text';
import Item from '../component/Item';
import LottieView from 'lottie-react-native';

const List = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [load, setLoad] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => fetchData(), []);

    function fetchData() {
        //fetch from backend then save to variable
        const sample = {
            register:
            {
                1:
                {
                    name: "canvas",
                    item_id: 111,
                    location: "pacific ocean",
                    color: "blue",
                    description: "sda;jfas;dlff",
                    image: 'https://source.unsplash.com/random'

                },
                2:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://source.unsplash.com/random'

                },
                3:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://source.unsplash.com/random'

                },
                4:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://source.unsplash.com/random'

                },
                5:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaosadaFDF;LSDFJLncn,mzcnmzcxzcxn,.zc,.ckl;asljkasfdljkfadl;ads;ladsjkcnm.,cxv,mnldaksJLJKADSLJKDSHLJKCVXBN,MCXJajklsljSDALKJ;FDSLJSDFpf",
                    image: 'https://source.unsplash.com/random'

                }
            },
            claim: {
                1:
                {
                    name: "canvas kha",
                    item_id: 333,
                    location: "pacific ocean",
                    color: "blue",
                    description: ";aldfalskfd",
                    image: 'https://source.unsplash.com/random'

                }
            }
        }

        let arr = [];
        for (let index in sample.register) {
            arr.push(sample.register[index]);
        }
        setData(arr);

    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoad(false)
        }, 3000);
    }, [data]);

    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
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

            {!load && <Item data={data} />}
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
