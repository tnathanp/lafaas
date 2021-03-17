import React, { useState, useEffect, useRef } from 'react';
import { SearchBar, Button } from 'react-native-elements';
import { StyleSheet, Dimensions, View, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from '../component/Text';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import Item from '../component/Item';
import LottieView from 'lottie-react-native';
import * as Comparator from 'string-similarity';

const Tab = createMaterialTopTabNavigator();

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ListItem = ({ route, navigation }) => {

    const type = route.name === 'Registered Items' ? 0 : 1;
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [load, setLoad] = useState(true);
    const [data, setData] = useState([null]);
    const [originalData, setOriginalData] = useState();

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
                        name: type === 0 ? 'eiei' : 'a a',
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
                setOriginalData(sample.Registered);
                setRefreshing(false);
            }
        })

        return function cleanup() {
            mounted = false;
        }
    }

    function filterData(value) {
        setSearch(value);
        let newData;
        const text = value.toLowerCase();
        if (text !== '') {
            newData = originalData.filter(e => {
                if (e.name.toLowerCase().includes(text)) {
                    return true;
                } else if (Comparator.compareTwoStrings(e.name, text) >= 0.6) {
                    return true;
                }
                return false;
            })
        } else {
            newData = originalData;
        }
        if (!(newData.length === 0 && data.length === 0)) setData(newData);
    }

    useDidUpdateEffect(() => setLoad(false), [data]);
    useDidUpdateEffect(() => filterData(search), [originalData]);

    /* Custom function equivalent to componentDidUpdate*/
    function useDidUpdateEffect(method, dependency) {
        const didMountRef = useRef(false);

        useEffect(() => {
            if (didMountRef.current) {
                let mounted = true;
                if (mounted) method()
                return function cleanup() {
                    mounted = false;
                }
            }
            else
                didMountRef.current = true;
        }, dependency);
    }
    /* End of Custom function */

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <SearchBar
                placeholder="search"
                onChangeText={text => filterData(text)}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={search}
                disabled={refreshing || load}
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

const List = ({ navigation }) => {
    return (
        <View style={{ flex: 1, paddingTop: 50, backgroundColor: 'white' }}>

            <StatusBar style='dark' />

            <Tab.Navigator
                lazy={true}
                tabBarOptions={{
                    activeTintColor: '#f6a085',
                    inactiveTintColor: 'black',
                    indicatorStyle: { backgroundColor: '#fc8181' }
                }}
            >
                <Tab.Screen name='Registered Items' component={ListItem} />
                <Tab.Screen name='Claimed Items' component={ListItem} />
            </Tab.Navigator>

            <View style={styles.footer} >
                <Button
                    title='Found'
                    onPress={() => navigation.navigate('Register', { type: 'found' })}
                    titleStyle={{ padding: 50, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                    buttonStyle={{ borderRadius: 10, marginRight: 10 }}
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['#fc8181', '#f6a085'],
                        locations: [0.3, 1]
                    }}
                />

                <Button
                    title='Lost'
                    onPress={() => navigation.navigate('Register', { type: 'lost' })}
                    titleStyle={{ padding: 50, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                    buttonStyle={{ borderRadius: 10, marginLeft: 10 }}
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['#fc8181', '#f6a085'],
                        locations: [0.3, 1]
                    }}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        padding: 12
    },
    inputContainer: {
        fontFamily: 'NotoSans',
        backgroundColor: '#e7e7e7',
        fontSize: 16,
        borderRadius: 15,
        maxHeight: 40
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
    },
    footer: {
        flexDirection: 'row',
        borderTopColor: '#eee',
        backgroundColor: '#f9f9f9',
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 25
    }
});

export default List;
