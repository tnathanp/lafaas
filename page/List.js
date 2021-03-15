import React, { useState, useEffect, useRef } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Dimensions, View, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from '../component/Text';
import Item from '../component/Item';
import LottieView from 'lottie-react-native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const List = ({ navigation }) => {

    const [search, setSearch] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [load, setLoad] = useState(true);
    const [data, setData] = useState();

    useEffect(() => fetchData(), [refreshing]);

    function fetchData() {
        /*fetch('URL HERE').then(res => res.json())
            .then(data => {

                let mounted = true;

                wait(1000).then(() => {
                    if (mounted) {
                        setData(data.Registered);
                        setRefreshing(false);
                    }
                })

                return function cleanup() {
                    mounted = false;
                }
            }).catch(e => console.log(e));*/

        const sample = {
            Registered:
                [
                    {
                        name: "Item 1",
                        item_id: 111,
                        location: "pacific ocean",
                        color: "blue",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        image: 'https://i.ibb.co/d0hzxCX/bag.jpg'

                    },
                    {
                        name: "Item 2",
                        item_id: 222,
                        location: "Saen Saeb Canal",
                        color: "green",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        image: 'https://i.ibb.co/vsjYG9M/tumber.jpg'

                    },
                    {
                        name: "Item 3",
                        item_id: 222,
                        location: "Saen Saeb Canal",
                        color: "green",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        image: 'https://i.ibb.co/d0hzxCX/bag.jpg'

                    },
                    {
                        name: "Item 4",
                        item_id: 222,
                        location: "Saen Saeb Canal",
                        color: "green",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        image: 'https://i.ibb.co/vsjYG9M/tumber.jpg'

                    },
                    {
                        name: "Item 5",
                        item_id: 222,
                        location: "Saen Saeb Canal",
                        color: "green",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        image: 'https://i.ibb.co/d0hzxCX/bag.jpg'

                    }
                ]
        }

        let mounted = true;

        //Wait 1 second for UX ;)
        wait(1000).then(() => {
            if (mounted) {
                setData(sample.Registered);
                setRefreshing(false);
            }
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
                    <Text style={{ color: 'black' }}>Suppose loading is done in one second</Text>
                </View>
            }

            {!load &&
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />}
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
