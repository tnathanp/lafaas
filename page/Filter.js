import React, { useState } from 'react'
import { Text } from '../component/Text';
import { View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox, Button } from 'react-native-elements'

function Filter({ route, navigation }) {
    const gadgetsFilter = ['Phone', 'Tablet', 'Apple pencil', 'Mouse', 'Laptop', 'Camera', 'Portable game', 'Airpods', 'Earphones', 'Headphones', 'Phone/Tablet charger', 'Laptop charger', 'Smart Watch', 'Power Bank'];
    const apparelsFilter = ['Jacket', 'Hat', 'Belt', 'Sandals', 'Sneakers', 'Loafers', 'Socks', 'Shirt', 'Skirts', 'Pants'];
    const stationaryFilter = ['Pencil case', 'Pencil', 'Ruler', 'Eraser', 'Pen', 'Apple pencil'];
    const documentsFilter = ['Textbook', 'Lecture sheets', 'Notebook', 'File'];
    const accessoriesFilter = ['Necklace', 'Earrings', 'Rings', 'Bracelet', 'Anklet', 'Hairband/Headband', 'Scrunchie/Hair ties', 'Bag', 'Wallet', 'Purse', 'Glasses', 'Watch'];
    const cardsFilter = ['Debit/Credit card', 'ID card', 'Student ID card', 'Driver’s license', 'Membership card', 'Point card'];
    const [selected, setSelected] = useState([]);

    function select(field) {
        let arr = selected.slice();
        if (arr.includes(field)) {
            arr = arr.filter(e => e !== field);
        } else {
            arr.push(field);
        }
        setSelected(arr);
    }

    function sendFilter() {
        navigation.navigate('List', { filters: { lists: selected, from: route.params.from } })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    title="Cancel"
                    type="clear"
                    titleStyle={{ fontFamily: 'NotoSansBold', color: '#FF8686', fontSize: 13 }}
                    containerStyle={{ marginLeft: 15 }}
                    buttonStyle={{ height: 40, backgroundColor: 'transparent' }}
                    onPress={() => navigation.goBack()}
                />
            ),
            headerRight: () => (
                <Button
                    title="Apply"
                    type="clear"
                    titleStyle={{ fontFamily: 'NotoSansBold', color: '#FF8686', fontSize: 13 }}
                    containerStyle={{ marginRight: 15 }}
                    buttonStyle={{ height: 40, backgroundColor: 'transparent' }}
                    onPress={() => sendFilter()}
                />
            )
        });
    }, [navigation, selected]);

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 35, marginBottom: 35 }}>

                    <Text style={{ fontFamily: 'NotoSansBold', color: '#868686', fontSize: 13, marginTop: 17 }}>
                        Gadgets
                    </Text>
                    <View style={{ borderColor: '#cccccc', borderWidth: 0.5, marginTop: 7 }} />
                    <View style={{ marginTop: 5 }}>
                        {gadgetsFilter.map((each, index) => {
                            return (
                                <CheckBox
                                    key={index}
                                    title={each}
                                    fontFamily='NotoSans'
                                    textStyle={{ fontSize: 14 }}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginVertical: -5 }}
                                    checkedIcon={<MaterialIcons name='check-box' size={20} color='#ff8686' />}
                                    uncheckedIcon={<MaterialIcons name='check-box-outline-blank' size={20} color='#aaaaaa' />}
                                    checked={selected.includes(each)}
                                    onPress={() => select(each)}
                                />
                            )
                        })}
                    </View>

                    <Text style={{ fontFamily: 'NotoSansBold', color: '#868686', fontSize: 13, marginTop: 17 }}>
                        Apparels
                    </Text>
                    <View style={{ borderColor: '#cccccc', borderWidth: 0.5, marginTop: 7 }} />
                    <View style={{ marginTop: 5 }}>
                        {apparelsFilter.map((each, index) => {
                            return (
                                <CheckBox
                                    key={index}
                                    title={each}
                                    fontFamily='NotoSans'
                                    textStyle={{ fontSize: 14 }}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginVertical: -5 }}
                                    checkedIcon={<MaterialIcons name='check-box' size={20} color='#ff8686' />}
                                    uncheckedIcon={<MaterialIcons name='check-box-outline-blank' size={20} color='#aaaaaa' />}
                                    checked={selected.includes(each)}
                                    onPress={() => select(each)}
                                />
                            )
                        })}
                    </View>

                    <Text style={{ fontFamily: 'NotoSansBold', color: '#868686', fontSize: 13, marginTop: 17 }}>
                        Stationary
                    </Text>
                    <View style={{ borderColor: '#cccccc', borderWidth: 0.5, marginTop: 7 }} />
                    <View style={{ marginTop: 5 }}>
                        {stationaryFilter.map((each, index) => {
                            return (
                                <CheckBox
                                    key={index}
                                    title={each}
                                    fontFamily='NotoSans'
                                    textStyle={{ fontSize: 14 }}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginVertical: -5 }}
                                    checkedIcon={<MaterialIcons name='check-box' size={20} color='#ff8686' />}
                                    uncheckedIcon={<MaterialIcons name='check-box-outline-blank' size={20} color='#aaaaaa' />}
                                    checked={selected.includes(each)}
                                    onPress={() => select(each)}
                                />
                            )
                        })}
                    </View>

                    <Text style={{ fontFamily: 'NotoSansBold', color: '#868686', fontSize: 13, marginTop: 17 }}>
                        Documents
                    </Text>
                    <View style={{ borderColor: '#cccccc', borderWidth: 0.5, marginTop: 7 }} />
                    <View style={{ marginTop: 5 }}>
                        {documentsFilter.map((each, index) => {
                            return (
                                <CheckBox
                                    key={index}
                                    title={each}
                                    fontFamily='NotoSans'
                                    textStyle={{ fontSize: 14 }}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginVertical: -5 }}
                                    checkedIcon={<MaterialIcons name='check-box' size={20} color='#ff8686' />}
                                    uncheckedIcon={<MaterialIcons name='check-box-outline-blank' size={20} color='#aaaaaa' />}
                                    checked={selected.includes(each)}
                                    onPress={() => select(each)}
                                />
                            )
                        })}
                    </View>

                    <Text style={{ fontFamily: 'NotoSansBold', color: '#868686', fontSize: 13, marginTop: 17 }}>
                        Accessories
                    </Text>
                    <View style={{ borderColor: '#cccccc', borderWidth: 0.5, marginTop: 7 }} />
                    <View style={{ marginTop: 5 }}>
                        {accessoriesFilter.map((each, index) => {
                            return (
                                <CheckBox
                                    key={index}
                                    title={each}
                                    fontFamily='NotoSans'
                                    textStyle={{ fontSize: 14 }}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginVertical: -5 }}
                                    checkedIcon={<MaterialIcons name='check-box' size={20} color='#ff8686' />}
                                    uncheckedIcon={<MaterialIcons name='check-box-outline-blank' size={20} color='#aaaaaa' />}
                                    checked={selected.includes(each)}
                                    onPress={() => select(each)}
                                />
                            )
                        })}
                    </View>

                    <Text style={{ fontFamily: 'NotoSansBold', color: '#868686', fontSize: 13, marginTop: 17 }}>
                        Cards
                    </Text>
                    <View style={{ borderColor: '#cccccc', borderWidth: 0.5, marginTop: 7 }} />
                    <View style={{ marginTop: 5 }}>
                        {cardsFilter.map((each, index) => {
                            return (
                                <CheckBox
                                    key={index}
                                    title={each}
                                    fontFamily='NotoSans'
                                    textStyle={{ fontSize: 14 }}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginVertical: -5 }}
                                    checkedIcon={<MaterialIcons name='check-box' size={20} color='#ff8686' />}
                                    uncheckedIcon={<MaterialIcons name='check-box-outline-blank' size={20} color='#aaaaaa' />}
                                    checked={selected.includes(each)}
                                    onPress={() => select(each)}
                                />
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Filter;