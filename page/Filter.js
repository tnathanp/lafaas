import React, { useState } from 'react'
import { Text } from '../component/Text';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox, Button } from 'react-native-elements'

function Filter({ route, navigation }) {
    const filter = ['Bag', 'Bottle', 'Certificate', 'Keyring', 'Tumbler'];
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
            <View style={{ marginHorizontal: 35 }}>

                <Text style={{ fontFamily: 'NotoSansBold', color: '#868686', fontSize: 13, marginTop: 17 }}>
                    Category
                </Text>

                <View style={{ borderColor: '#cccccc', borderWidth: 0.5, marginTop: 7 }} />

                <View style={{ marginTop: 5 }}>
                    {filter.map((each, index) => {
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
        </View>
    )
}

export default Filter;
