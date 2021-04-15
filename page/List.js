import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text } from '../component/Text';
import { SearchBar, Button, Icon } from 'react-native-elements';
import { StyleSheet, Dimensions, TouchableOpacity, View, ScrollView, RefreshControl, Keyboard, TouchableWithoutFeedback, SafeAreaView, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '../component/AuthContext';
import Item from '../component/Item';
import Profile from './Profile';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import * as Comparator from 'string-similarity';
import * as SecureStore from 'expo-secure-store';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

const ItemList = ({ route, navigation }) => {

    const type = route.name === 'Registered' ? 0 : 1;
    const filterArray = useContext(FilterContext);
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [load, setLoad] = useState(true);
    const [data, setData] = useState([null]);
    const [originalData, setOriginalData] = useState();
    const [filterCategory, setFilterCategory] = useState([]);

    useEffect(() => fetchData(), [refreshing, filterCategory]);
    useDidUpdateEffect(() => filterData(search), [originalData]);
    useDidUpdateEffect(() => setLoad(false), [data]);
    useDidUpdateEffect(() => {
        if (filterArray.from === type)
            setFilterCategory(filterArray.lists)
    }, [filterArray]);

    function useDidUpdateEffect(method, dependency) {
        const didMountRef = useRef(false);

        useEffect(() => {
            if (didMountRef.current) {
                let mounted = true;
                if (mounted) method()
                return function cleanup() {
                    mounted = false;
                }
            } else didMountRef.current = true;
        }, dependency);
    }

    function fetchData() {
        if (!refreshing) setLoad(true);
        /*fetch('https://lafaas-n4hzx.ondigitalocean.app/' + type === 0 ? 'item_reg' : 'item_claimed').then(res => res.json())
            .then(data => {
                let mounted = true;
                wait(1000).then(() => {
                    if (mounted) {
                        setOriginalData(type === 0 ? data.Registered : data.Claimed);
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
                        name: type === 0 ? "Item 1 Registered" : "Item 1 Claimed",
                        item_id: 111,
                        location: "pacific ocean",
                        category: 'bag',
                        color: "blue",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        image: 'https://ninjaya.com/media/product/7a0/canvas-tote-bag-large-horizontal-703.jpg'

                    },
                    {
                        name: "Item 2",
                        item_id: 222,
                        location: "Saen Saeb Canal",
                        category: 'tumbler',
                        color: "green",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        image: 'https://www.starbucks.co.th/stb-media/2020/08/6.Stainless-steel-white-with-green-lid-tumbler-12-oz-1080.png'

                    },
                    {
                        name: "Item 3",
                        item_id: 222,
                        location: "Saen Saeb Canal",
                        category: 'bag',
                        color: "green",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        image: 'https://ninjaya.com/media/product/7a0/canvas-tote-bag-large-horizontal-703.jpg'

                    },
                    {
                        name: "Item 4",
                        item_id: 222,
                        location: "Saen Saeb Canal",
                        category: 'tumbler',
                        color: "green",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        image: 'https://www.starbucks.co.th/stb-media/2020/08/6.Stainless-steel-white-with-green-lid-tumbler-12-oz-1080.png'

                    },
                    {
                        name: "Item 5",
                        item_id: 222,
                        location: "Saen Saeb Canal",
                        category: 'bag',
                        color: "green",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        image: 'https://ninjaya.com/media/product/7a0/canvas-tote-bag-large-horizontal-703.jpg'

                    }
                ]
        }

        let mounted = true;

        wait(refreshing ? 1000 : 200).then(() => {
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
        //Filter by search input
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

        //Filter by category
        if (filterCategory.length !== 0) {
            newData = newData.filter(e => {
                const constraint = e.category[0].toUpperCase() + e.category.substring(1);
                if (filterCategory.includes(constraint)) {
                    return true;
                } else {
                    return false;
                }
            })
        }

        setData(newData);
    }

    function Tag() {
        if (Array.isArray(filterCategory)) {
            return filterCategory.map((item, key) => {
                return (
                    <Button
                        title={item}
                        key={key}
                        icon={<Ionicons name='close' size={14} color='white' />}
                        iconRight={true}
                        titleStyle={{ padding: 7, marginTop: -3, fontFamily: 'NotoSansMedium', color: '#ffffff', fontSize: 12 }}
                        buttonStyle={{ height: 32, borderRadius: 10, backgroundColor: '#ff8686', alignSelf: 'flex-start', marginRight: 5, marginBottom: 5 }}
                        onPress={() => {
                            let arr = filterCategory.slice();
                            arr.splice(key, 1);
                            setFilterCategory(arr);
                        }}
                    />
                )
            })
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <SearchBar
                        placeholder="search"
                        onChangeText={text => filterData(text)}
                        containerStyle={styles.searchContainer}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        value={search}
                        autoCorrect={false}
                        disabled={refreshing || load}
                    />
                </View>

                <View style={{ justifyContent: 'flex-end', alignSelf: 'center' }}>
                    <TouchableOpacity style={{ marginRight: 30, transform: [{ rotate: '90deg' }] }} onPress={() => navigation.navigate('Filter', { from: type })}>
                        <Octicons name="settings" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 30 }}>
                {Tag()}
            </View>

            {load &&
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <LottieView
                        style={styles.anim}
                        source={require('../assets/anim/890-loading-animation.json')}
                        autoPlay
                    />
                    <Text style={{ color: 'black', paddingTop: Platform.OS === 'ios' ? 0 : 30 }}>Suppose loading is done in one second</Text>
                </View>
            }

            {data.length === 0 && !load && !refreshing &&
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <Animatable.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} animation="fadeIn">
                        <LottieView
                            style={{
                                position: 'absolute',
                                width: 0.7 * Dimensions.get('window').width,
                                marginTop: -1 * 0.025 * Dimensions.get('window').height
                            }}
                            source={require('../assets/anim/11323-sad-search.json')}
                            autoPlay
                        />
                        <Text style={{ color: 'black', paddingTop: Platform.OS === 'ios' ? 135 : 165, alignContent: 'center' }}>There's nothing here...</Text>
                    </Animatable.View>
                </TouchableWithoutFeedback>
            }

            {data.length !== 0 && !load &&
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />}
                >
                    <Item data={data} navigator={item => navigation.navigate('ItemDesc', { item: item, type: type })} />
                </ScrollView>
            }

        </View>
    );
}

const CustomSidebarMenu = (props) => {
    const { dispatch } = useAuthContext();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingTop: 25, alignItems: 'center' }}>
                <Image
                    source={{ uri: 'https://picsum.photos/200/300' }}
                    style={{ height: 100, width: 100, borderRadius: 50, alignContent: 'center', overflow: 'hidden' }}
                />
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: '#000000',
                        fontWeight: 'bold', marginTop: 10, marginBottom: -25
                    }}>
                    User's name
                </Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Contact Us"
                    onPress={() => null}
                />
                <DrawerItem
                    label="Logout"
                    onPress={() => SecureStore.deleteItemAsync('userToken').then(() => dispatch({ type: 'SIGN_OUT' }))}
                />
                <DrawerItem
                    label="NOTI"
                    onPress={() => props.navigation.navigate('Noti')}
                />
                <DrawerItem
                    label="QR"
                    onPress={() => props.navigation.navigate('QRCode')}
                />
                <DrawerItem
                    label="END"
                    onPress={() => props.navigation.navigate('End')}
                />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

const ListPage = ({ navigation }) => {

    return (
        <View style={{ flex: 1, paddingTop: 60, backgroundColor: 'white', }}>

            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <View style={{ flex: 1, textAlign: 'center' }}>
                    <TouchableOpacity style={{ flex: 1, marginLeft: -85 }} onPress={() => navigation.openDrawer()}>
                        <Icon name="menu" color="black" size={20} />
                    </TouchableOpacity>
                </View>

                <View style={{ textAlign: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>LIST ITEMS</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <></>
                </View>
            </View>

            <Tab.Navigator
                lazy={true}
                tabBarOptions={{
                    activeTintColor: '#f6a085',
                    inactiveTintColor: 'black',
                    indicatorStyle: { backgroundColor: '#fc8181' }
                }}
            >
                <Tab.Screen name='Registered' component={ItemList} />
                <Tab.Screen name='Claimed' component={ItemList} />
            </Tab.Navigator>

            <View style={styles.footer}>

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

        </View >
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        paddingLeft: 28,
        paddingTop: 12
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

export const FilterContext = React.createContext();
export default List = ({ route, navigation }) => {
    let filterArray = route.params?.filters;

    return (
        <FilterContext.Provider value={filterArray}>
            <Drawer.Navigator
                initialRouteName="List Items"
                drawerPosition="left"
                drawerContentOptions={{ activeTintColor: '#f6a085', itemStyle: { marginVertical: 5 }, }}
                drawerContent={(props) => <CustomSidebarMenu {...props} navigation={navigation} />}
            >
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="List Items" component={ListPage} />
            </Drawer.Navigator>
        </FilterContext.Provider>
    )
}